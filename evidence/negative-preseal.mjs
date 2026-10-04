import {createClient,abi} from 'file:///E:/Genlayer-Tools/studio-next-toolchain/node_modules/genlayer-js/dist/index.js';
import {studioDevnet} from 'file:///E:/Genlayer-Tools/studio-next-toolchain/node_modules/genlayer-js/dist/chains/index.js';
import {writeFileSync} from 'node:fs';
const client=createClient({chain:studioDevnet});
const address='0x1eBE1f41ff016b74af41b94F5E07B3B3b29A4DEF';
const owner='0x8170e7b22000527d9bab38dffa76b52103441b57';
const phase=process.argv[2]||'preseal';
if(!['preseal','assessed','drift','pdf'].includes(phase))throw Error('Invalid phase');
const cases=phase==='pdf'?[
 ['X01-malformed-PDF',owner,'assess_deadline',['e'.repeat(64),3,'2026-01-01'],'source must be UTF-8 HTML or text'],
]:phase==='drift'?[
 ['X01-source-drift',owner,'assess_deadline',['c'.repeat(64),2,'2026-01-01'],'sealed source manifest mismatch'],
 ['N05-replay-revision',owner,'assess_deadline',['a'.repeat(64),2,'2026-01-01'],'ASSESSMENT_ID_CONFLICT'],
]:phase==='assessed'?[
 ['N05-replay-day',owner,'assess_deadline',['a'.repeat(64),1,'2026-01-02'],'ASSESSMENT_ID_CONFLICT'],
 ['N03-assessment-id',owner,'assess_deadline',['bad',1,'2026-01-01'],'INVALID_ASSESSMENT_ID'],
 ['N03-query-day',owner,'assess_deadline',['d'.repeat(64),1,'2026-02-30'],'INVALID_QUERY_DAY'],
 ['N03-unknown-revision',owner,'assess_deadline',['d'.repeat(64),99,'2026-01-01'],'UNKNOWN_REVISION'],
]:[
 ['N01-create', '0x0000000000000000000000000000000000000001','create_deadline_lineage',['x','NYC','base','amend','field'],'UNAUTHORIZED'],
 ['N01-seal', '0x0000000000000000000000000000000000000001','seal_revision',[1,'a'.repeat(64),'2026-10-01','https://nyc.legistar.com/x','https://www.nyc.gov/x',''],'UNAUTHORIZED'],
 ['N01-supersede', '0x0000000000000000000000000000000000000001','supersede_lineage',['replacement'],'UNAUTHORIZED'],
 ['N02-duplicate-create',owner,'create_deadline_lineage',['x','NYC','base','amend','field'],'LINEAGE_ALREADY_CREATED'],
 ['N02-assess-before-seal',owner,'assess_deadline',['a'.repeat(64),1,'2026-01-01'],'INVALID_LINEAGE_STATE'],
 ['N03-hash',owner,'seal_revision',[1,'bad','2026-10-01','https://nyc.legistar.com/x','https://www.nyc.gov/x',''],'INVALID_MANIFEST_HASH'],
 ['N03-day',owner,'seal_revision',[1,'a'.repeat(64),'2026-02-30','https://nyc.legistar.com/x','https://www.nyc.gov/x',''],'INVALID_RETRIEVAL_DAY'],
 ['N03-url',owner,'seal_revision',[1,'a'.repeat(64),'2026-10-01','https://evil.example/x','https://www.nyc.gov/x',''],'INVALID_SOURCE_URL'],
 ['N03-duplicate-url',owner,'seal_revision',[1,'a'.repeat(64),'2026-10-01','https://www.nyc.gov/x','https://www.nyc.gov/x',''],'DUPLICATE_SOURCE_URL'],
 ['N03-nonmonotonic',owner,'seal_revision',[2,'a'.repeat(64),'2026-10-01','https://nyc.legistar.com/x','https://www.nyc.gov/x',''],'REVISION_NOT_MONOTONIC'],
];
const reports=[];
for(const [id,sender,method,args,expected] of cases){
 const pre=await client.readContract({account:{address:sender},address,functionName:'get_lineage',args:[],transactionHashVariant:'latest-final'});
 const data=abi.transactions.serialize([abi.calldata.encode(abi.calldata.makeCalldataObject(method,args)),false]);
 let result;
 try{result=await client.request({method:'sim_call',params:[{type:'write',from:sender,to:address,data,transaction_hash_variant:'latest-final'}]});}
 catch(error){result=error.cause?.data?.receipt;if(!result){reports.push({id,error:error.shortMessage,pass:false});break;}}
 const message=result.result?Buffer.from(result.result,'base64').subarray(1).toString('utf8'):'';
 const post=await client.readContract({account:{address:sender},address,functionName:'get_lineage',args:[],transactionHashVariant:'latest-final'});
 const report={id,sender,method,args,expected,network:'studio-dev',chainId:61997,path:'official read-only write simulation; deterministic pre-submit rejection',broadcast:false,executionResult:result.execution_result,message,pre,post,pass:result.execution_result==='ERROR'&&message.includes(expected)&&pre===post};
 reports.push(report);console.log(JSON.stringify({id,pass:report.pass,message}));
 if(!report.pass)break;
}
writeFileSync(new URL('./negative-'+phase+'-report.json',import.meta.url),JSON.stringify(reports,null,2));
