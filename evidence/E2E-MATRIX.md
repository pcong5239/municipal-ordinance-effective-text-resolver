

# Required final-revision E2E matrix

Revision: `MOETR-61997-5A68B42B-76C931E3`  
Source SHA256: `5A68B42B63044EDF9EB4A3960A36DE9E134C78AD3C255B84DB97B4871668A03D`  
Network: Studio Dev, chain 61997  
Contract: `0x1eBE1f41ff016b74af41b94F5E07B3B3b29A4DEF`  
Actor: actor4 / `0x8170e7b22000527d9bab38dffa76b52103441b57`

| ID | Result | Evidence |
|---|---|---|
| D01 | PASS | `deploy-reconciliation.json`; finalized deploy, accepted consensus, source parity, EMPTY readback; [Explorer](https://explorer-studio-dev.genlayer.com/tx/0xd3d88f87af65f300604410615edea7ae096d53354bdb906b63d1932991f093e4) |
| W01 | PASS | `w01-observation.json` and tx reconciliation; finalized owner create, DRAFT readback; [Explorer](https://explorer-studio-dev.genlayer.com/tx/0x1f671bde3431cebc98f66ba9d96f1e006f5d52c6f4ae3afdc2aac3380b377ba6) |
| N01 | PASS | `negative-preseal-report.json`; unauthorized create/seal/supersede, broadcast false, unchanged state |
| N02 | PASS | `negative-preseal-report.json`; duplicate create and assess-before-seal rejected, unchanged state |
| W02 | PASS | `w02-observation.json`; finalized seal, SEALED revision 1; measured fee artifact; [Explorer](https://explorer-studio-dev.genlayer.com/tx/0x026474cced83c87e2858e351b8d24e76b560f828bcf8da374f995beb0e2f7d77) |
| N03 | PASS | `negative-preseal-report.json`; invalid hash/day/URL/duplicate/nonmonotonic inputs rejected |
| W03 | PASS | `w03-observation.json` and tx reconciliation; RESOLVED, controlling deadline 2026-06-30; [Explorer](https://explorer-studio-dev.genlayer.com/tx/0xda0866be8441281c440da67461ee253903d98362ff9134e1306e7a4fdf2bedf6) |
| W04 | PASS | `w04-observation.json`; NOT_YET_EFFECTIVE and oracle false; [Explorer](https://explorer-studio-dev.genlayer.com/tx/0x094230874cbc8ef078c8c20cb8ce9a68ea6209cb2f546f33d334e4ca7db6cf2f) |
| N04 | PASS | `negative-drift-report.json`; superseded relative formula cannot control effective result |
| W05 | PASS | `w05-observation.json`; identical replay returns identical stored assessment; [Explorer](https://explorer-studio-dev.genlayer.com/tx/0x0c3802a6e30bed8797722cdf74e5ab80615bbf9a41706388f82120a338d98137) |
| N05 | PASS | `negative-assessed-report.json`; changed query/revision and malformed IDs/dates rejected |
| W06 | PASS | `w06-observation.json`; append revision, resolved readback, prior history retained; [Explorer](https://explorer-studio-dev.genlayer.com/tx/0x155d0e0b9aa5a63116d8cdc0a29bb46c448dfa8fc0dda73f37f68f1efa90f6ce) |
| W07 | PASS | `w07-observation.json` and `tx-0x3c38ecf929fe735008ef7643f2c1d3fa2712a502879c0f961ebc6b62d6379609-reconciliation.json`; finalized `supersede_lineage`, SUPERSEDED readback; [Explorer](https://explorer-studio-dev.genlayer.com/tx/0x3c38ecf929fe735008ef7643f2c1d3fa2712a502879c0f961ebc6b62d6379609) |
| R01 | PASS | `resolution-readonly-report.json` and finalized readbacks; known/unknown assessment views |
| X01 | PASS | `x01seal-observation.json`, `x01pdf-observation.json`, `negative-drift-report.json`; malformed/PDF/drift inputs fail closed |
| X02 | PASS | `malformed-llm-capability.json`; malformed LLM execution rejected fail-closed, no write and no broadcast |

Every broadcast transaction has one stable operation ID, `broadcastCount: 1`, FINALIZED receipt, accepted consensus, semantic result `FINISHED_WITH_RETURN`, source parity and independent readback. Deterministic failures are explicitly simulations with `broadcast: false`; they are not represented as finalized transactions. Payments and cross-contract writes are not applicable to the approved contract surface.

E2E COMPLETION GATE: PASS for this exact deployed revision. No required scenario remains NOT RUN, PENDING, ASSUMED, PARTIAL or BLOCKED.




