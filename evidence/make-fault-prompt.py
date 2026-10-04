import ast
import json
from pathlib import Path
from html.parser import HTMLParser

root = Path(__file__).resolve().parents[1]
tree = ast.parse((root / 'contracts/municipal_ordinance_effective_text_resolver.py').read_text(encoding='utf-8'))
selected = ast.Module(body=[node for node in tree.body if getattr(node, 'name', '') in {'_VisibleText', '_canonical_source', '_deadline_evidence'}], type_ignores=[])
namespace = {'HTMLParser': HTMLParser}
exec(compile(selected, '<exact-contract-source-functions>', 'exec'), namespace)
manifest = json.loads((root / 'evidence/sealed-source-manifest-triple.json').read_text())
documents = [namespace['_deadline_evidence'](namespace['_canonical_source']((root / f'evidence/{name}-genvm-source.html').read_text(encoding='utf-8'))) for name in ('council', 'dob', 'council-original')]
namespace['evidence'] = '\n\n--- OFFICIAL SOURCE BOUNDARY ---\n\n'.join(documents)
namespace['query_metadata'] = json.dumps({'lineage_id': 'nyc-ll55-report-deadline', 'jurisdiction': 'New York City', 'base_law_id': 'Local Law 55 of 2024', 'amending_law_id': 'Local Law 128 of 2024', 'target_field_id': 'electric-vehicle-charging-report-deadline', 'query_day': '2026-01-01', 'retrieval_day': manifest['retrieval_day'], 'manifest_hash': manifest['manifest_hash']}, sort_keys=True).replace('<', '\\u003c').replace('>', '\\u003e')
expression = next(node.value for node in ast.walk(tree) if isinstance(node, ast.Assign) and any(isinstance(target, ast.Name) and target.id == 'prompt' for target in node.targets))
prompt = eval(compile(ast.Expression(expression), '<exact-contract-prompt>', 'eval'), namespace)
(root / 'evidence/fault-injection-prompt.txt').write_text(prompt, encoding='utf-8')
print('Exact prompt reconstructed; characters=' + str(len(prompt)))
