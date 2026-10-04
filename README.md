# Municipal Ordinance Effective Text Resolver

Municipal ordinances often amend an earlier law while the effective date is defined by the enacted source text. This contract resolves a requested field for a query day only when GenLayer validators independently verify law identity, enactment status, effective-date rule, target field, and controlling deadline from immutable source snapshots.

The contract stores append-only sealed revisions and assessment results. Corrected evidence creates a new revision. Assessments are idempotent by assessment ID, reject replay with changed inputs, fail closed on malformed or contradictory validator output, and preserve historical results when a later revision is superseded. Public API: `create_lineage`, `seal_revision`, `append_revision`, `supersede_lineage`, `assess_deadline`, `get_lineage`, `get_assessment`, and `is_deadline_resolved`.

## Verification

- Network: GenLayer Studio Dev, chain 61997
- Contract: `0x1eBE1f41ff016b74af41b94F5E07B3B3b29A4DEF`
- Deployed revision: `MOETR-61997-5A68B42B-76C931E3`
- Full scenario matrix and reconciled receipts: [`evidence/E2E-MATRIX.md`](evidence/E2E-MATRIX.md)
- Deployment and finality evidence: [`evidence/deploy-reconciliation.json`](evidence/deploy-reconciliation.json)
- Contract source: [`contracts/municipal_ordinance_effective_text_resolver.py`](contracts/municipal_ordinance_effective_text_resolver.py)
- Direct tests: [`tests/test_municipal_ordinance_effective_text_resolver.py`](tests/test_municipal_ordinance_effective_text_resolver.py)

Negative cases use read-only simulation and explicitly record `broadcast: false`; they are not presented as transactions. This is a contract-only repository with no frontend, payment flow, cross-contract call, private key, or secret configuration.
