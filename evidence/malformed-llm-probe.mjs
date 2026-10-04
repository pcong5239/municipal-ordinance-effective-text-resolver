// Isolated read-only failure-injection capability check; never signs/deploys.
import {createClient,abi} from 'file:///E:/Genlayer-Tools/studio-next-toolchain/node_modules/genlayer-js/dist/index.js';
import {studioDevnet} from 'file:///E:/Genlayer-Tools/studio-next-toolchain/node_modules/genlayer-js/dist/chains/index.js';
import {readFileSync,writeFileSync} from 'node:fs';
const client=createClient({chain:studioDevnet});
const prompt=readFileSync(new URL('./fault-injection-prompt.txt',import.meta.url),'utf8');
const request={from:'0x8170e7b22000527d9bab38dffa76b52103441b57',to:'0x1eBE1f41ff016b74af41b94F5E07B3B3b29A4DEF',type:'write',transaction_hash_variant:'latest-final',data:abi.transactions.serialize([abi.calldata.encode(abi.calldata.makeCalldataObject('assess_deadline',['f'.repeat(64),4,'2026-01-01'])),false]),sim_config:{validators:[{stake:8,provider:'openai',model:'gpt-4o',config:{temperature:0.75,max_tokens:500},plugin:'openai-compatible',plugin_config:{api_key_env_var:'OPENAIKEY',api_url:'https://api.openai.com',mock_response:{response:{[prompt]:'not JSON'},eq_principle_prompt_comparative:{},eq_principle_prompt_non_comparative:{}}}}]}};
let receipt;
try{receipt=await client.request({method:'sim_call',params:[request]});}
catch(error){receipt=error.cause?.data?.receipt;if(!receipt){console.log(JSON.stringify({error:error.shortMessage,details:error.details}));process.exit(1);}}
const encoded=receipt.result?Buffer.from(receipt.result,'base64'):Buffer.alloc(0);
const result=encoded.subarray(1).toString('utf8');
const absent=await client.readContract({account:{address:request.from},address:request.to,functionName:'get_assessment',args:['f'.repeat(64)],transactionHashVariant:'latest-final'});
const report={network:'studio-dev',chainId:61997,broadcast:false,method:'sim_call',injection:'installed Testing Suite virtual validator mock_response exact prompt => not JSON',execution_result:receipt.execution_result,result,mode:receipt.mode,assessmentAbsent:absent==='',injectionSupported:receipt.execution_result==='ERROR'&&result.includes('[LLM_ERROR]')};
writeFileSync(new URL('./malformed-llm-capability.json',import.meta.url),JSON.stringify(report,null,2));
console.log(JSON.stringify(report));
