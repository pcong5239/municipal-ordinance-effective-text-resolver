# Municipal Ordinance Effective Text Resolver

This contract resolves the controlling NYC reporting deadline on a requested day from sealed public law sources and validator agreement.

## Live Deployment

- Network: GenLayer Studio Dev, chain 61997
- Contract: [Studio Dev Explorer](https://explorer-studio-dev.genlayer.com/address/0x1eBE1f41ff016b74af41b94F5E07B3B3b29A4DEF)
- Deployer: `0x8170e7b22000527d9bab38dffa76b52103441b57`
- [Deployment transaction](https://explorer-studio-dev.genlayer.com/tx/0xd3d88f87af65f300604410615edea7ae096d53354bdb906b63d1932991f093e4)
- [Resolved assessment transaction](https://explorer-studio-dev.genlayer.com/tx/0xda0866be8441281c440da67461ee253903d98362ff9134e1306e7a4fdf2bedf6): revision 1, query `2026-01-01`, deadline `2026-06-30`; [receipt and readback](evidence/tx-0xda0866be8441281c440da67461ee253903d98362ff9134e1306e7a4fdf2bedf6-reconciliation.json).
- Counterexample: the superseded relative formula yields `2027-12-21` and is not the stored controlling deadline. See [sample](samples/superseded-formula-counterexample.json) and [history readback](evidence/history-revision4.json). [Invalid input and authorization simulations](evidence/negative-preseal-report.json) record unchanged state.

## Problem and approach

Local Law 55 of 2024 used a relative reporting deadline. Local Law 128 of 2024 amended that field to June 30, 2026 and became effective one year after enactment. A plain database is enough once these facts are verified and structured. Here, GenLayer validators independently check the public text before the result is stored.

The contract stores append-only sealed revisions and assessment results. Corrected evidence creates a new revision. Assessments are idempotent by assessment ID, reject replay with changed inputs, fail closed on malformed or contradictory validator output, and preserve historical results when a later revision is superseded. Public API: `create_deadline_lineage`, `seal_revision`, `assess_deadline`, `supersede_lineage`, `get_lineage`, `get_assessment`, and `is_deadline_resolved`. The last view is a boolean oracle for compliance calendars and public-law registries.

## Consensus and verification

- Network: GenLayer Studio Dev, chain 61997
- Contract: `0x1eBE1f41ff016b74af41b94F5E07B3B3b29A4DEF`
- Deployed revision: `MOETR-61997-5A68B42B-76C931E3`
- Full scenario matrix and reconciled receipts: [`evidence/E2E-MATRIX.md`](evidence/E2E-MATRIX.md)
- Consequential field binding: [`evidence/CONSENSUS-BINDING.md`](evidence/CONSENSUS-BINDING.md)
- Deployment and finality evidence: [`evidence/deploy-reconciliation.json`](evidence/deploy-reconciliation.json)
- Contract source: [`contracts/municipal_ordinance_effective_text_resolver.py`](contracts/municipal_ordinance_effective_text_resolver.py)
- Direct tests: [`tests/test_municipal_ordinance_effective_text_resolver.py`](tests/test_municipal_ordinance_effective_text_resolver.py)

The owner creates the lineage and seals revisions with two or three allowlisted official sources and a canonical text manifest. The assessor supplies revision, query day, and assessment ID. Leader and validators refetch the sources and compare law identity, enacted status, effective-day status, target field, controlling deadline, and evidence state before a result is recorded. External text is untrusted: changed manifests, redirects, unsupported bodies, and malformed extraction fail closed. Negative cases use read-only simulation with `broadcast: false`; they are not presented as transactions.

## Consensus engineering lessons

- Finalized receipts need semantic-result and authoritative state readback.
- Every consequential field must enter validator comparison before state changes.
- Effective-day arithmetic must be deterministic and tied to source evidence.
- A full-document manifest catches changes outside the excerpt used for extraction.
- Replay checks should happen before nondeterministic work.

This contract handles one named NYC lineage, not arbitrary ordinances or legal advice. It has no payment, cross-contract, or frontend component. `contracts/` contains the deployable source, `tests/` the Direct Mode tests, `samples/` the scenario inputs, and `evidence/` the source and transaction records.
