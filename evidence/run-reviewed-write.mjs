// One reviewed CLI operation, explicit actor/network, no shared toolchain edits.
import {spawn} from 'node:child_process';
import {readFileSync,writeFileSync,existsSync,readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
const root=new URL('../',import.meta.url);
const intent=JSON.parse(readFileSync(new URL(process.argv[2],import.meta.url)));
if(intent.revision!=='MOETR-61997-5A68B42B-76C931E3'||intent.actor!=='actor4'||intent.chainId!==61997)throw Error('Binding mismatch');
const hash=createHash('sha256').update(readFileSync(new URL('contracts/municipal_ordinance_effective_text_resolver.py',root))).digest('hex');
if(hash!=='5a68b42b63044edf9eb4a3960a36de9e134c78ad3c255b84db97b4871668a03d')throw Error('Source approval invalidated');
if(!/^[a-z0-9-]+$/.test(intent.operationId))throw Error('Invalid operation ID');
if(existsSync('E:/Genlayer-Tools/studio-next-toolchain/operations/'+intent.operationId+'.json'))throw Error('Operation reserved: reconcile only');
for(const file of readdirSync('E:/Genlayer-Tools/studio-next-toolchain/operations').filter(name=>name.endsWith('.json'))){
 const record=JSON.parse(readFileSync('E:/Genlayer-Tools/studio-next-toolchain/operations/'+file));
 if(record.actor==='actor4'&&!record.operationId.startsWith('moetr-5a68b42b-76c931e3-61997-actor4-'))throw Error('Foreign actor4 journal: stop before broadcast');
}
const previous=JSON.parse(readFileSync(new URL(intent.previousObservation,import.meta.url)));
if(previous.status!=='EXTERNALLY_RECONCILED')throw Error('Previous operation not reconciled');
const fees=JSON.parse(readFileSync(new URL(intent.feesArtifact,import.meta.url)));
const quote=JSON.stringify({distribution:fees.distribution,feeValue:fees.feeValue});
const args=['write',intent.contract,intent.method,'--fees',quote,'--args',...intent.args.map(String)];
if(args.some(value=>value===''))throw Error('Wrapper cannot encode empty string');
const observation=new URL('./'+intent.scenario.toLowerCase()+'-observation.json',import.meta.url);
const command="& '.\\studio-next.ps1' -Actor actor4 -OperationId '"+intent.operationId+"' -CliArguments @("+args.map(value=>"'"+value.replaceAll("'","''")+"'").join(',')+")";
const child=spawn('pwsh.exe',['-NoProfile','-Command',command],{cwd:'E:/Genlayer-Tools/studio-next-toolchain',windowsHide:true,stdio:['ignore','pipe','pipe']});
let output='',saved=false;
for(const stream of [child.stdout,child.stderr])stream.on('data',chunk=>{
 output+=chunk.toString();
 const found=output.match(/Write Transaction Hash:\s*(0x[a-f0-9]{64})/i);
 if(found&&!saved){saved=true;const record={operationId:intent.operationId,hash:found[1],status:'RECONCILIATION_REQUIRED',broadcastCount:1,chainId:61997,scenario:intent.scenario};writeFileSync(observation,JSON.stringify(record,null,2));console.log(JSON.stringify(record));}
});
await new Promise(resolve=>child.on('close',code=>{console.log(JSON.stringify({exitCode:code,hashSaved:saved,rawOutputNotPersisted:true}));resolve();}));
// Wrapper's own durable journal is retained. No raw receipt/error is printed.
