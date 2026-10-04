import {createClient} from 'file:///E:/Genlayer-Tools/studio-next-toolchain/node_modules/genlayer-js/dist/index.js';
import {studioDevnet} from 'file:///E:/Genlayer-Tools/studio-next-toolchain/node_modules/genlayer-js/dist/chains/index.js';
import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const client=createClient({chain:studioDevnet});
const hash=process.argv[2] || '0xd3d88f87af65f300604410615edea7ae096d53354bdb906b63d1932991f093e4';
if(!/^0x[0-9a-f]{64}$/.test(hash)) throw Error('Invalid transaction hash');
const address='0x1eBE1f41ff016b74af41b94F5E07B3B3b29A4DEF';
const tx=await client.getTransaction({hash});
const receipt=await client.request({method:'eth_getTransactionReceipt',params:[hash]});
const local=readFileSync(new URL('../contracts/municipal_ordinance_effective_text_resolver.py',import.meta.url),'utf8');
const verifiedDeploy=process.argv[2]?JSON.parse(readFileSync(new URL('./deploy-reconciliation.json',import.meta.url))):null;
const code=verifiedDeploy?.sourceParity&&verifiedDeploy.sourceSha256===createHash('sha256').update(local).digest('hex')?local:await client.getContractCode(address);
const lineage=await client.readContract({account:{address:'0x8170e7b22000527d9bab38dffa76b52103441b57'},address,functionName:'get_lineage',args:[],transactionHashVariant:'latest-final'});
// Explicit public allowlist only; never serialize raw node/receipt config.
const report={hash,address,network:'studio-dev',chainId:61997,statusName:tx.statusName,lifecycle:tx.lifecycle,semanticResult:tx.txExecutionResultName,fees:tx.fees,receiptStatus:receipt?.status,consensus:tx.last_round,sourceParity:code===local,sourceSha256:createHash('sha256').update(code).digest('hex'),lineage};
if(process.argv[3]){
 if(!/^[a-f0-9]{64}$/.test(process.argv[3]))throw Error('Invalid assessment id');
 report.assessmentId=process.argv[3];
 report.assessment=await client.readContract({account:{address:'0x8170e7b22000527d9bab38dffa76b52103441b57'},address,functionName:'get_assessment',args:[process.argv[3]],transactionHashVariant:'latest-final'});
 report.oracle=await client.readContract({account:{address:'0x8170e7b22000527d9bab38dffa76b52103441b57'},address,functionName:'is_deadline_resolved',args:[process.argv[3]],transactionHashVariant:'latest-final'});
}
writeFileSync(new URL('./'+(process.argv[2]?'tx-'+hash:'deploy')+'-reconciliation.json',import.meta.url),JSON.stringify(report,(_,v)=>typeof v==='bigint'?v.toString():v,2));
console.log(JSON.stringify(report,(_,v)=>typeof v==='bigint'?v.toString():v));
