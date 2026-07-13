## task_006_move_typed_translation_catalogs_to_the_shared_i18n_contract - Move typed translation catalogs to the shared i18n contract
> From version: 1.2.0
> Schema version: 1.0
> Status: Done
> Understanding: 90%
> Confidence: 85%
> Progress: 100%
> Complexity: Medium
> Theme: Implementation delivery
> Reminder: Update status/understanding/confidence/progress and linked request/backlog references when you edit this doc.
> Owner: codex

# Definition of Done (DoD)
- [x] The backlog scope is implemented.
- [x] Acceptance criteria are covered.
- [x] Validation passes.
- [x] Meaningful waves followed ADR 009: affected docs updated and the repo left commit-ready without automatic commits.

# Backlog
- `item_020_move_typed_translation_catalogs_to_the_shared_i18n_contract`

# Acceptance criteria
- AC1: English and French values live in JSON catalogs declared by a valid i18n v1 contract.
- AC2: Catalogs have exact key and named-placeholder parity and pass contract validation.
- AC3: English remains the default/fallback and French remains selected for French browser locales.
- AC4: Form, hub, and validation copy render exactly as before for both locales.
- AC5: Environment-configured strings remain outside the locale catalogs and retain their current precedence.
- AC6: The viewer can edit both declared catalogs and reports English as the source locale.
- AC7: Existing i18n, validation, UI, lint, typecheck, and build checks pass without a new runtime dependency.

# Validation
- Run `python3 -m logics_manager lint --require-status`.
- Use `python3 -m logics_manager flow progress task task_006_move_typed_translation_catalogs_to_the_shared_i18n_contract.md --progress <n>%` during multi-wave work.
- Run `python3 -m logics_manager flow finish task task_006_move_typed_translation_catalogs_to_the_shared_i18n_contract.md` after implementation.
- Contract valid with aligned JSON catalogs; 48 tests, lint, and production build passed
- Finish workflow executed on 2026-07-13.
- Linked backlog/request close verification passed.

# Report
- Implementation complete.
- Finished on 2026-07-13.
- Linked backlog item(s): `item_020_move_typed_translation_catalogs_to_the_shared_i18n_contract`
- Related request(s): `req_009_move_typed_translation_catalogs_to_the_shared_i18n_contract`

# AI Context
- Summary: Implement move typed translation catalogs to the shared i18n contract.
- Keywords: task, implementation, backlog, runtime, python
- Use when: You need a bounded implementation task for a backlog item.
- Skip when: The work is still at the request or backlog shaping stage.

# Links
- Request: `req_009_move_typed_translation_catalogs_to_the_shared_i18n_contract`
- Product brief(s): (none yet)
- Architecture decision(s): (none yet)

# AC Traceability
- request-AC1 -> This task. Proof: Contract valid with aligned JSON catalogs; 48 tests, lint, and production build passed Source: `logics/i18n/contract.json`
- request-AC2 -> This task. Proof: Contract valid with aligned JSON catalogs; 48 tests, lint, and production build passed Source: `logics/i18n/contract.json`
- request-AC3 -> This task. Proof: Contract valid with aligned JSON catalogs; 48 tests, lint, and production build passed Source: `logics/i18n/contract.json`
- request-AC4 -> This task. Proof: Contract valid with aligned JSON catalogs; 48 tests, lint, and production build passed Source: `logics/i18n/contract.json`
- request-AC5 -> This task. Proof: Contract valid with aligned JSON catalogs; 48 tests, lint, and production build passed Source: `logics/i18n/contract.json`
- request-AC6 -> This task. Proof: Contract valid with aligned JSON catalogs; 48 tests, lint, and production build passed Source: `logics/i18n/contract.json`
- request-AC7 -> This task. Proof: Contract valid with aligned JSON catalogs; 48 tests, lint, and production build passed Source: `logics/i18n/contract.json`
