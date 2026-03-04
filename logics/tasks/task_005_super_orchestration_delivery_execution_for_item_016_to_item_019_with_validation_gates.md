## task_005_super_orchestration_delivery_execution_for_item_016_to_item_019_with_validation_gates - Super orchestration delivery execution for item_016 to item_019 with validation gates
> From version: 1.0.2
> Status: In Progress
> Understanding: 97%
> Confidence: 94%
> Progress: 0%
> Complexity: Medium
> Theme: Engineering Quality
> Reminder: Update status/understanding/confidence/progress and dependencies/references when you edit this doc.

# Context
This task orchestrates delivery of the following backlog items:
- `logics/backlog/item_016_post_submit_links_hub_routing_mode_and_fallback_contract.md`
- `logics/backlog/item_017_destination_links_configuration_validation_and_rendering.md`
- `logics/backlog/item_018_links_hub_bilingual_fr_en_contract_and_ui_copy_alignment.md`
- `logics/backlog/item_019_links_hub_ui_accessibility_mobile_ux_and_regression_coverage.md`

Execution constraints:
- Preserve static-only architecture and existing FormSubmit flow.
- Apply product routing decisions exactly: `2+` valid links -> hub, `1` valid link -> direct redirect, `0` valid links -> safe fallback.
- Source destination configuration from `.env` only via `VITE_DESTINATION_LINKS_JSON`.
- Keep metadata contract limited to `label`, `url`, `order`, `enabled`.
- No analytics instrumentation in this delivery wave.
- Preserve FR/EN behavior for hub copy and labels.

# Plan
- [ ] 1. Delivery wave A - item_017 config parsing/validation contract
  - implement parsing and sanitization of `VITE_DESTINATION_LINKS_JSON`;
  - filter invalid entries safely and sort valid enabled entries by `order`;
  - add config/unit tests and docs for env contract.
- [ ] 2. Validation gate A
  - run lint/typecheck/test/build;
  - verify malformed JSON and invalid entries do not break runtime.
- [ ] 3. Delivery wave B - item_016 routing mode and fallback contract
  - implement deterministic post-submit branch logic for `0/1/2+` valid links;
  - keep submit lifecycle and form behavior unchanged;
  - add routing-focused UI tests.
- [ ] 4. Validation gate B
  - run lint/typecheck/test/build;
  - verify each routing branch and fallback path.
- [ ] 5. Delivery wave C - item_018 bilingual FR/EN hub copy and labels
  - add EN/FR hub copy and locale-aligned rendering;
  - ensure localized label behavior and fallback safety;
  - expand i18n/UI tests for hub states.
- [ ] 6. Validation gate C
  - run lint/typecheck/test/build;
  - verify locale-specific rendering for EN and FR.
- [ ] 7. Delivery wave D - item_019 UI accessibility/mobile and regressions
  - implement hub UI states with mobile-first layout consistency;
  - enforce keyboard/focus/accessibility behavior;
  - complete regression tests for hub + existing form stability.
- [ ] 8. Validation gate D
  - run lint/typecheck/test/build/test:e2e;
  - verify no regressions on current form flow and smoke path.
- [ ] FINAL: Update related Logics docs

# AC Traceability
- item_017 ACs -> Steps 1-2. Proof targets: `src/lib/config.ts`, `src/lib/config.test.ts`, `README.md`, `.env.example`.
- item_016 ACs -> Steps 3-4. Proof targets: `src/App.tsx`, `src/tests/app.ui.test.tsx`, routing docs.
- item_018 ACs -> Steps 5-6. Proof targets: `src/lib/i18n.ts`, `src/lib/i18n.test.ts`, `src/App.tsx`.
- item_019 ACs -> Steps 7-8. Proof targets: `src/App.css`, `src/App.tsx`, `src/tests/app.ui.test.tsx` (+ E2E if needed).
- Cross-item closure -> FINAL step. Proof: request/backlog/task status and progress updates.

# Validation
- npm run -s lint
- npm run -s typecheck
- npm run -s test
- npm run -s build
- npm run -s test:e2e
- python3 logics/skills/logics-doc-linter/scripts/logics_lint.py

# Definition of Done (DoD)
- [ ] Scope implemented and acceptance criteria covered.
- [ ] Validation commands executed and results captured.
- [ ] Linked request/backlog/task docs updated.
- [ ] Status is `Done` and progress is `100%`.

# Report
- Not started.
