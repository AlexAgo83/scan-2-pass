## item_020_move_typed_translation_catalogs_to_the_shared_i18n_contract - Move typed translation catalogs to the shared i18n contract
> From version: 1.2.0
> Schema version: 1.0
> Status: Done
> Understanding: 90%
> Confidence: 85%
> Progress: 100%
> Complexity: High
> Theme: Operator workflow and runtime integration
> Reminder: Update status/understanding/confidence/progress and linked request/task references when you edit this doc.

# Problem
Move the existing typed English/French translation values into editable JSON catalogs governed by the shared i18n contract.
Preserve the existing English default and automatic French browser-locale selection.
Keep the runtime adapter local and small rather than adding a general i18n dependency.

# Scope
- In:
  - one coherent delivery slice from the source request
- Out:
  - unrelated sibling slices that should stay in separate backlog items instead of widening this doc

# Acceptance criteria
- AC1: English and French values live in JSON catalogs declared by a valid i18n v1 contract.
- AC2: Catalogs have exact key and named-placeholder parity and pass contract validation.
- AC3: English remains the default/fallback and French remains selected for French browser locales.
- AC4: Form, hub, and validation copy render exactly as before for both locales.
- AC5: Environment-configured strings remain outside the locale catalogs and retain their current precedence.
- AC6: The viewer can edit both declared catalogs and reports English as the source locale.
- AC7: Existing i18n, validation, UI, lint, typecheck, and build checks pass without a new runtime dependency.

# AC Traceability
- request-AC1 -> This backlog slice. Proof: AC1: English and French values live in JSON catalogs declared by a valid i18n v1 contract.
- request-AC2 -> This backlog slice. Proof: AC2: Catalogs have exact key and named-placeholder parity and pass contract validation.
- request-AC3 -> This backlog slice. Proof: AC3: English remains the default/fallback and French remains selected for French browser locales.
- request-AC4 -> This backlog slice. Proof: AC4: Form, hub, and validation copy render exactly as before for both locales.
- request-AC5 -> This backlog slice. Proof: AC5: Environment-configured strings remain outside the locale catalogs and retain their current precedence.
- request-AC6 -> This backlog slice. Proof: AC6: The viewer can edit both declared catalogs and reports English as the source locale.
- request-AC7 -> This backlog slice. Proof: AC7: Existing i18n, validation, UI, lint, typecheck, and build checks pass without a new runtime dependency.

# Decision framing
- Product framing: Not needed
- Product signals: (none detected)
- Product follow-up: No product brief follow-up is expected based on current signals.
- Architecture framing: Not needed
- Architecture signals: (none detected)
- Architecture follow-up: No architecture decision follow-up is expected based on current signals.

# Links
- Product brief(s): (none yet)
- Architecture decision(s): (none yet)
- Request: `req_009_move_typed_translation_catalogs_to_the_shared_i18n_contract`
- Primary task(s): `task_006_move_typed_translation_catalogs_to_the_shared_i18n_contract`

# AI Context
- Summary: Move typed translation catalogs to the shared i18n contract
- Keywords: backlog-groom, request, move typed translation catalogs to the shared i18n contract, bounded slice
- Use when: Use when implementing or reviewing the delivery slice for Move typed translation catalogs to the shared i18n contract.
- Skip when: Skip when the change is unrelated to this delivery slice or its linked request.

# Priority
- Priority: Medium
- Rationale: Default until groomed.

# Notes
- Hybrid rationale: Derived from request `req_009_move_typed_translation_catalogs_to_the_shared_i18n_contract` and kept bounded to one coherent delivery slice.
- Source file: `logics/request/req_009_move_typed_translation_catalogs_to_the_shared_i18n_contract.md`.
- Generated locally by logics-manager.
- Task `task_006_move_typed_translation_catalogs_to_the_shared_i18n_contract` was finished via `logics-manager flow finish task` on 2026-07-13.

# Tasks
- `task_006_move_typed_translation_catalogs_to_the_shared_i18n_contract`
