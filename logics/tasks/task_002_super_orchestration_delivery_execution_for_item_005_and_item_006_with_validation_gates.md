## task_002_super_orchestration_delivery_execution_for_item_005_and_item_006_with_validation_gates - Super orchestration delivery execution for item_005 and item_006 with validation gates
> From version: 0.1.0
> Status: Draft
> Understanding: 98%
> Confidence: 96%
> Progress: 0%
> Complexity: Medium
> Theme: UX
> Reminder: Update status/understanding/confidence/progress and dependencies/references when you edit this doc.

# Context
This task orchestrates delivery of:
- `logics/backlog/item_005_locale_resolution_contract_and_translation_key_inventory.md`
- `logics/backlog/item_006_bilingual_ui_runtime_integration_and_validation_messages_alignment.md`

Execution constraints:
- Keep English fallback as default behavior.
- Auto-activate French only for locale prefix `fr`.
- Do not override env-configured strings (`VITE_*` branding/header content).

# Plan
- [ ] 1. Delivery wave A - item_005 locale contract and translation key inventory
  - add locale resolver helper (EN fallback + FR detection);
  - define translation key map for non-configurable text;
  - document key ownership and fallback semantics.
- [ ] 2. Validation gate A
  - add/adjust unit tests for locale detection and fallback behavior;
  - ensure no env-configured strings are included in translation map.
- [ ] 3. Delivery wave B - item_006 runtime bilingual integration
  - wire translation lookup in `App` for labels/buttons/messages;
  - align validation messages with active locale;
  - update README with language behavior notes.
- [ ] 4. Validation gate B
  - run lint/build/test;
  - perform quick manual check in EN + FR locale scenarios.
- [ ] FINAL: Update related Logics docs

# AC Traceability
- item_005 ACs -> Steps 1-2. Proof: locale helper + dictionary + tests.
- item_006 ACs -> Steps 3-4. Proof: UI integration + validation i18n + README + passing checks.
- Final closure -> FINAL step. Proof: request/backlog/task status/progress updates.

# Validation
- npm run -s lint
- npm run -s build
- npm run -s test
- python3 logics/skills/logics-doc-linter/scripts/logics_lint.py

# Definition of Done (DoD)
- [ ] Scope implemented and acceptance criteria covered.
- [ ] Validation commands executed and results captured.
- [ ] Linked request/backlog/task docs updated.
- [ ] Status is `Done` and progress is `100%`.

# Report
- Orchestration scope:
  - item_005 -> pending
  - item_006 -> pending
- Populate with:
  - implementation summary per wave;
  - validation outputs;
  - AC proof links.
