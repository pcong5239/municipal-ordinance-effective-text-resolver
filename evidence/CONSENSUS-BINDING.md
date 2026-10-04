# Consensus binding specification

The owner registers immutable lineage identifiers and append-only evidence revisions. Anyone can assess a sealed revision for a canonical query day. Two or three exact unique official HTTPS URLs are bound through a canonical manifest: SHA256 of UTF-8 compact sorted-key JSON containing retrieval_day and ordered sources (url, SHA256(canonical text)). HTMLParser removes script/style content, decodes entities and collapses whitespace before hashing and extraction. Each validator independently fetches the sources and verifies this same digest. Changed canonical evidence fails without storage changes.

Technical correction: two successful DOB responses of 52625 bytes had different raw SHA256 values. A line diff isolated the change to injected boomerang telemetry. Canonicalizing non-evidence markup is necessary to avoid false drift failures; no legal text is supplied by an off-chain proxy or invented fixture. Script/style contents are explicitly outside the evidence boundary, and legal text changes remain rejected. This changes the manifest encoding, so old raw-byte hashes cannot be reused. Regression covers telemetry exclusion and meaningful source drift rejection. Runtime/source parity remains required before PASS.

| Field | Source | Stored? | Downstream effect | Validator check | Binding mode | Differential test |
|---|---|---|---|---|---|---|
| identity_match | Independent source extraction | Yes | Resolution eligibility | Exact canonical tuple equality | Exact | Changed boolean rejected |
| amendment_enacted | Independent source extraction | Yes | Resolution eligibility | Exact canonical tuple equality | Exact | Changed boolean rejected |
| amendment_effective_on_day | Hash-bound Council enactment metadata + §29 + query day | Yes | RESOLVED vs NOT_YET_EFFECTIVE | Independent deterministic anchor parsing and tuple equality | Deterministic derivation | Opposite LLM boolean cannot change state; day-before/day-of boundary |
| target_field_match | Independent source extraction | Yes | Resolution eligibility | Exact canonical tuple equality | Exact | Changed boolean rejected |
| controlling_deadline | Independent source extraction | Yes | Consumer deadline value | Exact canonical tuple equality, valid ISO day | Exact | 2026-06-30 vs 2027-12-21 rejected |
| evidence_state | Independent source extraction | Yes | Fail-closed outcome | Exact canonical tuple equality, closed enum | Exact | VERIFIED vs CONTRADICTED rejected |
| resolution_status | Deterministic conjunction | Yes | Consumer oracle | Derived after accepted tuple | Deterministic | Lifecycle + each-field differential |
| revision_id/query_day | Validated deterministic calldata | Yes | Assessment identity and replay | Bound into immutable inputs before closure | Deterministic | Replay conflict; invalid day; revision monotonicity |

No display-only narrative, score or floating-point value is stored. Replay with the identical assessment ID/revision/day returns the immutable prior result; changed replay payload rejects. Supersession blocks further assessment/sealing and preserves history. An old resolved assessment remains a historical receipt; consumers must inspect lineage status before treating it as current.

The RC runtime calls gl.vm.run_nondet with an explicit validator, gl.storage.allow and gl.contract.Contract. These substitutions retain the approved mechanism and match the exact pinned runtime validated locally. The storage decorator alias only accommodates the installed lint name check; the shared toolchain is unchanged.

2026-10-01 technical corrections from actual Studio Dev read-only GenVM simulations: Council HTML is reachable in GenVM (HTTP200, 1,698,829 bytes), despite local curl timeout. DOB HTML is HTTP200, 52,616 bytes. Full canonical documents bind the manifest; only unrelated electrical-code provisions preceding §26 are omitted from the LLM prompt, preserving metadata and complete §26–§29/end. Raw source limit is 2,000,000 bytes, measured rather than guessed. No PDF extraction dependency was added.

Live LLM repeatedly misclassified 2026-01-01 as pre-effective despite correct deadline extraction. The effective-day boolean now derives from exact Council metadata and §29's one-year clause; missing/ambiguous anchors fail closed. Leader and validator independently compute it from their own manifest-verified sources. No date is hardcoded or supplied off-chain. The six-field public state/API remain unchanged. Simulated 2026-01-01 resolves to 2026-06-30; 2025-12-20 remains NOT_YET_EFFECTIVE. Simulations are not deployed E2E evidence.
