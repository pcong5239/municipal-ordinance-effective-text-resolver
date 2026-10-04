// Runs exact candidate methods in a simulated constructor; not deployed E2E.
import {createClient,abi} from 'file:///E:/Genlayer-Tools/studio-next-toolchain/node_modules/genlayer-js/dist/index.js';
import {studioDevnet} from 'file:///E:/Genlayer-Tools/studio-next-toolchain/node_modules/genlayer-js/dist/chains/index.js';
import {readFileSync,writeFileSync} from 'node:fs';
const manifest=JSON.parse(readFileSync(new URL('./sealed-source-manifest.json',import.meta.url)));
const original=readFileSync(new URL('../contracts/municipal_ordinance_effective_text_resolver.py',import.meta.url),'utf8');
const queryDay=process.argv[2] || '2026-01-01';
if(!/^\d{4}-\d{2}-\d{2}$/.test(queryDay)) throw Error('Invalid diagnostic day');
const initialization=`        self.create_deadline_lineage("nyc-ll55-report-deadline", "New York City", "Local Law 55 of 2024", "Local Law 128 of 2024", "electric-vehicle-charging-report-deadline")
        self.seal_revision(1, "${manifest.manifest_hash}", "${manifest.retrieval_day}", ${JSON.stringify(manifest.sources[0].url)}, ${JSON.stringify(manifest.sources[1].url)}, "")
        print(self.assess_deadline("${'1'.repeat(64)}", 1, "${queryDay}"))
`;
const code=original.replace('    def _owner_only(self):',initialization+'\n    def _owner_only(self):').replace('return _normalize_result(gl.nondet.exec_prompt(prompt, response_format="json"))','print(query_metadata)\n            raw_result = gl.nondet.exec_prompt(prompt + "\\nDIAGNOSTIC: also include a date_reason field stating enactment, computed effective date, and comparison with query_day.", response_format="json")\n            print(json.dumps(raw_result))\n            raw_result.pop("date_reason", None)\n            return _normalize_result(raw_result)');
const client=createClient({chain:studioDevnet});
const data=abi.transactions.serialize([new TextEncoder().encode(code),abi.calldata.encode(abi.calldata.makeCalldataObject(undefined,[])),false]);
let result;
try {
  result=await client.request({method:'sim_call',params:[{type:'deploy',from:'0x8170e7b22000527d9bab38dffa76b52103441b57',to:'0x0000000000000000000000000000000000000000',data,status:'finalized'}]});
} catch(error) {
  result=error.cause?.data?.receipt;
  if(!result) { console.log(JSON.stringify({error:error.shortMessage,details:error.details})); process.exit(1); }
}
// Explicit safe fields only: raw receipt/node_config contains credentials.
const report={network:'studio-dev',chainId:61997,actor:'actor4',queryDay,broadcast:false,constructorModifiedForProbe:true,execution_result:result.execution_result,stdout:result.genvm_result?.stdout,stderr:result.genvm_result?.stderr,error_description:result.genvm_result?.error_description,eq_outputs:result.eq_outputs};
writeFileSync(new URL('./resolution-readonly-'+queryDay+'-report.json',import.meta.url),JSON.stringify(report,null,2));
console.log(JSON.stringify({...report,eq_outputs:undefined}));
