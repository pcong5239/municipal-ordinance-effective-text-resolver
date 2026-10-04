// Read-only GenVM constructor simulation; never signs or broadcasts.
import {createClient, abi} from 'file:///E:/Genlayer-Tools/studio-next-toolchain/node_modules/genlayer-js/dist/index.js';
import {studioDevnet} from 'file:///E:/Genlayer-Tools/studio-next-toolchain/node_modules/genlayer-js/dist/chains/index.js';
import {writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const source = process.argv[2] || 'council';
if(!['council','dob','council-original'].includes(source)) throw Error('Unknown source');
const url = source==='council' ? 'https://legistar.council.nyc.gov/LegislationDetail.aspx?GUID=62FCF30F-3D9E-4148-B1ED-4469F3985796&ID=6558062&Options=ID%7CText%7C&Search=' : source==='council-original' ? 'https://nyc.legistar.com/LegislationDetail.aspx?GUID=62FCF30F-3D9E-4148-B1ED-4469F3985796&ID=6558062&Options=ID%7CText%7C&Search=' : 'https://www.nyc.gov/assets/buildings/newsletters/DOB_BN_122225.html';
const code = `# { "Depends": "py-genlayer:5jycge4q8k23462jtb0b9fyey1s9qz928sz2nbrd9mg4sxqg2qng" }
import genlayer as gl
import json
class SourceAccessProbe(gl.contract.Contract):
    def __init__(self):
        def fetch():
            r = gl.nondet.web.get(${JSON.stringify(url)}, headers={"User-Agent":"Mozilla/5.0"})
            return json.dumps({"status":r.status,"bytes":len(r.body or b""),"body":(r.body or b"").hex()})
        def validate(result):
            return isinstance(result, gl.vm.Return)
        print(gl.vm.run_nondet(fetch, validate))
`;
const client = createClient({chain:studioDevnet});
console.log(JSON.stringify({probe:'source-access-readonly', chain:studioDevnet.id, actor:'actor4', url}));
const data = abi.transactions.serialize([new TextEncoder().encode(code), abi.calldata.encode(abi.calldata.makeCalldataObject(undefined, [])), false]);
try {
  const result = await client.request({method:'sim_call',params:[{type:'deploy',from:'0x8170e7b22000527d9bab38dffa76b52103441b57',to:'0x0000000000000000000000000000000000000000',data,status:'finalized'}]});
  // Studio receipts may contain node credentials. Never log or persist them.
  if(result.execution_result !== 'SUCCESS') throw Error('Simulation did not succeed');
  const output = JSON.parse(abi.calldata.decode(Buffer.from(result.eq_outputs[0], 'base64').subarray(1)));
  const body = Buffer.from(output.body,'hex');
  if(output.status!==200 || body.length!==output.bytes) throw Error('Invalid source response');
  const summary={network:'studio-dev',chainId:61997,actor:'actor4',url,status:output.status,bytes:body.length,sha256:createHash('sha256').update(body).digest('hex'),method:'sim_call',broadcast:false};
  writeFileSync(new URL('./'+source+'-genvm-source.html',import.meta.url),body);
  writeFileSync(new URL('./'+source+'-genvm-source-access.json',import.meta.url),JSON.stringify(summary,null,2));
  console.log(JSON.stringify(summary));
} catch (error) {
  console.log(JSON.stringify({message:error.shortMessage,details:error.details}));
}
