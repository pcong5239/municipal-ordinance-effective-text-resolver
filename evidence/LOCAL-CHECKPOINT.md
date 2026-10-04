# Local checkpoint — 2026-10-01

Stage: contract implementation/local validation. No project deployment or write has occurred. PRE-DEPLOY SELF-REVIEW remains FAIL pending all findings below; E2E is NOT RUN and Git publication is locked.

## Verified

- Exact CLI: E:\Genlayer-Tools\studio-next-toolchain\node_modules\.bin\genlayer.cmd, version 0.40.0-rc.3, studio-dev preset discovered from toolchain working directory.
- Exact wrapper: E:\Genlayer-Tools\studio-next-toolchain\studio-next.ps1; actor11 network/account reads returned canonical https://studio-dev.genlayer.com/api, chain 61997, public address 0x3d981aa2c0e00eb2f078cc61c4c67e9686a69c4c, balance 119.999921360249999177 GEN (snapshot, recheck before transaction).
- GenVM v0.6.0-rc5 lint and schema validation PASS (7 public methods).
- WSL Direct Mode genlayer-test 0.30.0rc2: 22 passed, 5 unused-source-mock warnings on intentional early failures; exit 0. No localnet transaction occurred; only in-process Direct Mode fixtures ran.
- Exact six-field differential checks pass: identity, enactment, effective-day, target-field, deadline, evidence state.
- Source manifest digest now checks full response bytes; redirects, oversized source, PDF bytes, empty source and changed manifest fail without assessment state.

## Corrections and remaining findings

The earlier PRE-DEPLOY PASS was withdrawn before broadcast: it lacked exact revision hashes and complete plan coverage. The earlier full preflight PASS was narrowed to verified discovery/network reads; actor reservations, actual schema operation, fee profile and transaction readiness still need proof.

The Testing Suite clears artifacts on each run. Its prior internal review files were therefore removed by test execution, not deliberately discarded to pass a gate. This checkpoint preserves the findings in evidence, outside that disposable output directory. No transaction journal was removed or modified.

OPEN: supported official HTML source set and live source parity; full remaining boundary/transition/hostile-input tests; exact source/test/spec/deploy binding; fee profile; independent actor reservation/reconciliation audit; Stage transition checklist; PRE-DEPLOY self-review; deploy and complete E2E matrix; public packaging and release gates.

Review mode: build owner self-review, task-local override; no anonymous reviewer.

## Latest regression increment

Direct Mode command: WSL .wsl-venv/bin/python -m pytest -q --tb=short --disable-warnings, executed from this project. Exit 0: 24 passed, 5 expected unused-source-mock warnings. Added append-only revision/history preservation, empty/draft invalid transitions and unauthorized creation coverage.

Exact contract SHA256: D85CDE15763F921084D0FB49AAC4CF937C698AF76EB8383A1CD144C4BDA0D29E.
Exact test SHA256: 8C0CE1BAB708D4EC49C18762A42D2336FD0EDE372F5E4E3DE3FC98063F897F6C.

Read-only HTTPS probe to the official Legistar source timed out. This does not establish a Studio Dev runtime failure; source-access/parity remains OPEN and needs further independent verification before deployment readiness can pass.

## Follow-up verification

- Exact wrapper deploy/estimate-fees help confirms supported fee-profile, fees distribution and fee-value interfaces; help output is not a measured fee or transaction readiness verdict.
- Installed Testing Suite documents --fee-profile for observed deploy/write receipts. Direct Mode alone does not produce authoritative on-chain fee observations.
- Code Library HTTP HEAD returned 403 with Cf-Mitigated: challenge. Legistar FullText HTTPS HEAD timed out after 12 seconds (curl exit 28). These are local source-access evidence only.
- Official ViewReport is served as application/pdf, not HTML. It cannot substitute for text under the current contract extraction boundary without a supported extraction correction.
- Added explicit LLM output bound and escaped metadata delimiters; GenVM v0.6.0-rc5 lint and validation PASS afterward.
- Latest Direct Mode regression: 29 passed, 5 expected unused-source-mock warnings; exit 0. Includes invalid decision tuple/enum/boolean/date and append-only history tests. Earlier recorded hashes are superseded by these material edits and must be recomputed for the next review.
- Required final-revision scenarios are now enumerated in E2E-MATRIX.md; every on-chain scenario remains NOT RUN.

PRE-DEPLOY SELF-REVIEW remains FAIL. No broadcast, Git commit or push is authorized by these local results.

## Current increment

- Actor-bound wrapper estimate-fees --json completed successfully against Studio Dev. Exact output is preserved in FEE-READONLY-ESTIMATE.json. It reports enabled fee policy and feeValue 100000000000010352; this default estimate is not represented as branch-specific measurement.
- CONSENSUS-BINDING.md now records source-manifest canonicalization, every consequential field, exact validator comparison and consumer history semantics.
- Added invalid seal-input tests (hash, retrieval day, unknown origin, duplicate URL and deceptive hostname). Latest Direct Mode run completed exit 0: 34 passed, 5 intentional early-failure mock warnings.
- DNS resolves nyc.legistar.com through app2.legistar.com to 69.5.90.40. Bounded IPv4 HTTPS connect timed out after 5 seconds. The current Council hostname also timed out after 12 seconds. No endpoint override or on-chain request was used to bypass this issue.

Next safe work: establish a supported official text retrieval path/source manifest, measure contract fees using documented facilities, finish actor reservation proof and exact-revision PRE-DEPLOY review. No source-access or E2E PASS has been assumed.

## Official HTML candidate identified

The exact Council URL with Options=ID%7CText%7C&Search= exposes the amendment as HTML, including enactment 12/21/2024, law 2024/128 and Section 26. DOB_BN_122225.html independently states the effective day. The source candidates are preserved in samples/official-source-candidates.json. This resolves the prior assumption that only PDF text exists, but does not prove raw-byte/runtime access, source stability or a valid sealed manifest.

The Council API documentation confirms official public legislative read access but describes requesting an API token by email. No token was requested and no communication was sent. The token-dependent path is not adopted as deployment input.

## Actor and origin readiness increment

Explicit task actor changed to actor4 after an authoritative wrapper account read: 0x8170e7b22000527d9bab38dffa76b52103441b57, 100 GEN, studio-dev, chain 61997, encrypted/locked and active. Read-only scan of all operation JSON records found zero matches for actor4 or its sender/address, with no parse failures. No existing reservation was removed or changed. Unlock/signing readiness is still to be verified by the legitimate wrapper before any broadcast.

Current Council official HTTPS origin added to the exact allowlist; deceptive suffix hostname rejects. This minimally corrects the public-source hostname and preserves the lineage and contract API. Latest regression exit 0: 35 passed, 5 unused-source-mock warnings. Lint and pinned-runtime validation PASS afterward. Any prior approval/hashes remain superseded.

Exact candidate source probes: Council HTTPS connect timeout at 5 seconds; DOB newsletter returns HTTP 403 AkamaiGHost. These do not prove a GenVM failure. Source manifest remains unsealed. PRE-DEPLOY is FAIL, E2E NOT RUN, Git locked.

## Source-access root cause correction

DOB returns HTTP 200 with the fixed User-Agent Mozilla/5.0; GET body is 52625 bytes and contains both law 128/2024 and December 21, 2025. Two consecutive bodies differ only on injected boomerang telemetry (line diff inspected). Raw hashes: 8618DC57F5A62E61CF7C29998853099EF3A0C4AE4EA7F922A6A797492B3185F7 and B39D819B9FF3984F6724A1FA2AE0284C79845D6FC92DC53573EA36B878A44452.

Contract now sends that fixed header and canonicalizes HTML evidence using stdlib HTMLParser: excludes script/style, decodes entities, collapses whitespace. Manifest hashes canonical text, and the exact same canonical text enters the extraction prompt. This narrowly corrects non-evidence dynamic markup, with its impact recorded in CONSENSUS-BINDING.md; raw-byte manifests are invalid for this revision.

Latest full local regression: 36 passed, 5 expected unused-source-mock warnings, exit 0. Pinned-runtime lint/validation PASS. Meaningful source drift remains rejected, telemetry variation is covered. Council connection still times out even with the fixed header. Actual GenVM source-access, complete source manifest and branch fee measurement remain unverified; PRE-DEPLOY has not passed.

## Fee profiling and cross-platform check

WSL curl to the exact Council candidate also timed out after a bounded 5-second connection timeout; no endpoint override was used.

Documented gltest tests -q --tb=short --disable-warnings --fee-profile evidence/direct-mode-fee-profile.json completed exit 0, 36 tests passed. The Testing Suite explicitly warned that the profile is empty because this backend does not expose consumed fee data. Its generated file contains methods={} and default localnet/61127 metadata; it is an empty Direct Mode diagnostic artifact, NOT a measurement and NOT network/E2E evidence. No localnet service or transaction was used. It cannot satisfy the Studio Dev branch fee gate.

Installed CLI supports simulation-derived fees only for an existing contract address/method. Installed SDK type surface exposes simulateWriteContract, but no deploy simulation method was found in its public interface. Default policy estimate remains available. The required pre-deploy measured-profile bootstrap still needs a documented compatible mechanism; arbitrary fabricated allocations or historical project measurements are forbidden.

## Exact current local revision

Contract SHA256: 784C2C03A0A2EFDF4F8DFB7245A3FBD5570C51FABC08E63DD1BC03662FF8A463.
Test SHA256: 6C45AB6A0462E101E06842C80F2A315120C95458FBA76CF26B3CE014CECA264C.

Direct Mode now enables documented check_pickling=True for nondeterministic closures. Latest full suite exit 0: 37 passed, 5 unused-source-mock warnings. Validator non-return/error result and independently refetched source drift are explicitly rejected. Pinned-runtime lint/schema previously PASS for this exact contract source (tests subsequently expanded only).

The fee-profile attempt yielded no deploy/method observations; no generated default-network metadata is accepted as Studio Dev evidence. No transaction has occurred. Remaining gate findings are supported source access/parity/manifest, branch fee measurement and legitimate unlock/transaction readiness. No review gate, E2E completion or publication claim is made from this checkpoint.

## Prompt-boundary regression

Latest full Direct Mode run: 38 passed, 5 expected unused-source-mock warnings, exit 0. Added actual-call prompt matching for an owner identifier containing closing query_metadata and forged system tags. The LLM mock matches only the escaped delimiter representation following the explicit untrusted-metadata instruction. Leader and independent validator both execute this prompt path and agree on a nonfavorable tuple. This proves prompt packaging and deterministic consequence handling, not live-model resistance or Studio Dev consensus. Contract source is unchanged; test revision has changed and its hash must be rebound at review.
