# Release blocker audit

CURRENT CANDIDATE UPDATE — 2026-10-01: source 5A68B42B63044EDF9EB4A3960A36DE9E134C78AD3C255B84DB97B4871668A03D; tests 62E168D30B25B04F4D7EA9BEDF6F5B781532F2909DC681125F411B41C3C22663. Current local run: 40 passed, 5 warnings, exit0; pinned lint/schema PASS, seven methods, no constructor args. SDK live schema for exact source matches. Both full GenVM sources and canonical manifest established; source-access/size/date-classification findings corrected. Read-only semantic probes PASS for day-before/day-of and post-effective query, but do not replace deployed E2E. Actor4 journal audit finds zero records and zero JSON parse failures. Earlier hashes/findings below are historical, not current approval. PRE-DEPLOY review and transaction readiness are the next required actions.

Exact source SHA256: 784C2C03A0A2EFDF4F8DFB7245A3FBD5570C51FABC08E63DD1BC03662FF8A463.
Exact test SHA256: 6C45AB6A0462E101E06842C80F2A315120C95458FBA76CF26B3CE014CECA264C.

Local verification: pinned GenVM lint/schema PASS; 37 Direct Mode tests PASS, including closure pickling and independent validator disagreement/source drift. No project transaction or deployment exists. PRE-DEPLOY SELF-REVIEW: FAIL. E2E: NOT RUN. Git and submission remain locked.

## B01 — measured fee bootstrap

AUTHORIZATION UPDATE — 2026-10-01: The user explicitly approved the requested bootstrap exception ("cho phép, làm mọi thứ cần thiết, bạn có quyền tự quyết") immediately after the request for first profiling deployment authorization. B01 authority blocker is resolved: after exact-revision PRE-DEPLOY self-review PASS and all other readiness checks, the first Studio Dev profiling deploy may use the official live-quoted developer preset. Its FINALIZED receipt must generate measured profile evidence before subsequent profile-driven operations. This does not waive source readiness, transaction safety, self-review, E2E coverage or release ordering; no canonical rule or shared toolchain is changed.

BUILD_RULES.md Stage 6 CLI execution step 2 requires a measured branch-appropriate profile before sending a fee-charging transaction. Studio Dev policy is enabled, and the exact actor-bound wrapper returns a default fee quote. That quote is not a measurement.

The documented gltest --fee-profile command was executed against Direct Mode: exit 0, but explicitly reported empty profile, no deploy or method fee observations. Its default localnet metadata is not Studio Dev evidence. Localnet profiling is excluded by task constraints. CLI/SDK installed interfaces expose write simulation for an existing deployed address, not a documented deploy simulation. No contract from another project can be used as current state.

Official fee profiling documentation, checked live, states the first profiling transaction itself uses a trusted developer preset sized from active policy, and the measurement is then obtained from FINALIZED receipts. This is a different bootstrap condition from the canonical measured-profile-before-first-transaction lock:
https://docs.genlayer.com/developers/decentralized-applications/fee-profiling-and-estimation#submit-the-profiling-transaction

Safe resolution requires an explicit rule/task authorization for that first reviewed Studio Dev profiling deployment with an official live-quoted developer preset, or a documented compatible pre-deploy measurement facility. The build task does not silently waive the existing lock, fabricate measurements, edit the shared toolchain or modify canonical rules.

## B02 — official source retrieval

CORRECTION — same-turn read-only simulation now establishes actual GenVM Council retrieval: sim_call returned execution_result SUCCESS; its equivalence output was decoded with the installed SDK, HTTP 200 and 1,698,829 full response bytes were recovered to council-genvm-source.html. Sanitized binding is council-genvm-source-access.json (chain61997, actor4, exact URL, response SHA256; broadcast=false). Prior local timeout remains true but is not evidence of GenVM inaccessibility. Remaining finding B02 is now the contract's 120,000-byte raw-source bound versus this measured 1,698,829-byte legitimate Council response, plus canonical source parity/manifest and independent validation still required. No PRE-DEPLOY PASS or deployment has occurred. Raw simulation receipt must never be logged/persisted: Studio includes node_config credential fields; the probe now persists only allowlisted public source/body metadata.

2026-10-01 resumed read-only verification: exact local genlayer.cmd reports 0.40.0-rc.3 and built-in studio-dev. Actor4 wrapper network info reports canonical https://studio-dev.genlayer.com/api / 61997; account show reports public address 0x8170e7b22000527d9bab38dffa76b52103441b57, 100 GEN, locked encrypted account. Live estimate-fees succeeds with developer preset feeValue 100000000000010352 (quote, not measurement). No write/unlock/broadcast was attempted. This verifies compatible read-only CLI/wrapper operation, not complete transaction readiness. Existing valid preflight evidence remains; no global CLI error is a blocker.

Bounded Council source probe using curl with Mozilla/5.0, no redirects and 5-second connection timeout still returns curl exit 28, HTTP 000, 0 bytes. The source-access blocker remains independently of the resolved fee-bootstrap authorization. No manifest or runtime source-access PASS can be inferred from web search extraction. The installed SDK gen_call interface is being inspected for an officially supported source-access read-only probe; no undocumented RPC override is authorized by discovery alone.

Read-only GenVM probe follow-up: official gen_call documentation explicitly supports simulated type=deploy without a blockchain transaction. Installed SDK native calldata/RLP serialization was used by source-access-probe.mjs, with actor4 public sender and Studio Dev preset. First call returned only legacy "00", discarding constructor stdout; this does not prove source body access or parity. Second distinct diagnostic constructor intentionally exposed its result via UserError, but RPC returned generic "Internal error" without source body/status. That output is insufficient to distinguish source failure from simulation/error-reporting behavior and is NOT labeled a CLI compatibility failure. Both were non-signing simulations, not broadcasts, and no E2E or source-access PASS was assigned. A usable authoritative response body remains required.

Current rehashed test SHA256 is D40A56785E2B3E7619C905FF88C30F73BD7EE8CF1EE8264BC8F1A4388CE20774; the earlier 37-test/header hash above is preserved historical evidence, not the current candidate. Latest local checkpoint records 38 tests. Contract hash remains unchanged.

Exact Council HTML source is publicly identifiable and contains the approved amendment. Bounded Windows and WSL HTTPS probes both timeout before response. DOB HTML succeeds with a fixed User-Agent; injected telemetry varies raw bytes, so canonical text manifest correction and regression have been implemented. Council canonical response and final manifest cannot yet be established. Cached search text is not raw response/GenVM evidence. The official API requires a token request according to Council documentation; no email/request was sent.

Safe resolution requires official source connectivity or verified supported GenVM source retrieval. No custom RPC/proxy, unrelated source fixture, unreviewed probe deployment or favorable mocked outcome may substitute.

## Gate impact and safe-work audit

Completed safe work: exact local CLI/wrapper inspection, read-only network/account/default quote, actor4 zero journal-match audit, current runtime lint/schema, local lifecycle/auth/input/history/manifest/validator regressions, manifest normalization correction, official source identification, E2E matrix and field binding specification. Journals retained unchanged.

Locked: PRE-DEPLOY PASS, broadcast/signing, Studio Dev E2E, Git packaging/commit/push and submission PASS/package. Repeating unchanged tests or source timeouts cannot resolve the external/authority conditions above. This is not a global CLI Unknown-network failure and not a Codex usage limit.
