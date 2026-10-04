"""Build a manifest from actual GenVM response bodies with contract's parser."""
import ast
import hashlib
import json
from pathlib import Path
from html.parser import HTMLParser
import sys

root = Path(__file__).resolve().parents[1]
tree = ast.parse((root / 'contracts/municipal_ordinance_effective_text_resolver.py').read_text(encoding='utf-8'))
names = {'_VisibleText', '_canonical_source', '_manifest_digest'}
selected = ast.Module(body=[node for node in tree.body if getattr(node, 'name', '') in names], type_ignores=[])
namespace = {'HTMLParser': HTMLParser, 'hashlib': hashlib, 'json': json}
exec(compile(selected, '<exact-contract-source-functions>', 'exec'), namespace)
urls, bodies, metadata = [], [], []
triple = '--triple' in sys.argv
for name in (('council', 'dob', 'council-original') if triple else ('council', 'dob')):
    source = json.loads((root / f'evidence/{name}-genvm-source-access.json').read_text())
    raw = (root / f'evidence/{name}-genvm-source.html').read_bytes()
    assert hashlib.sha256(raw).hexdigest() == source['sha256']
    canonical = namespace['_canonical_source'](raw.decode('utf-8')).encode()
    urls.append(source['url'])
    bodies.append(canonical)
    metadata.append({'url': source['url'], 'raw_bytes': len(raw), 'canonical_bytes': len(canonical), 'sha256': hashlib.sha256(canonical).hexdigest()})
    (root / f'evidence/{name}-canonical-source.txt').write_bytes(canonical)
manifest = {'retrieval_day': '2026-10-01', 'sources': metadata, 'manifest_hash': namespace['_manifest_digest']('2026-10-01', urls, bodies)}
(root / ('evidence/sealed-source-manifest-triple.json' if triple else 'evidence/sealed-source-manifest.json')).write_text(json.dumps(manifest, indent=2))
print(json.dumps(manifest))
