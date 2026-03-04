## item_018_links_hub_bilingual_fr_en_contract_and_ui_copy_alignment - Links hub bilingual FR/EN contract and UI copy alignment
> From version: 1.0.2
> Status: Done
> Understanding: 100%
> Confidence: 96%
> Progress: 100%
> Complexity: Medium
> Theme: UX
> Reminder: Update status/understanding/confidence/progress and linked task references when you edit this doc.

# Problem
- The new links hub introduces additional UI copy and localized labels that must align with existing locale resolution behavior.
- Without an explicit FR/EN contract, hub copy and destination labels can become inconsistent or partially untranslated.

# Scope
- In:
  - define non-configurable hub UI copy in EN/FR translation dictionaries;
  - align hub copy with existing locale resolution rule (`fr*` -> French, else English);
  - render destination labels using localized `label.fr`/`label.en` values from config;
  - define safe fallback behavior when one locale label is missing or empty after sanitization;
  - add tests for locale-dependent hub rendering.
- Out:
  - manual language switcher UI;
  - additional language support beyond EN/FR.

# Acceptance criteria
- AC1: Hub static copy is available in both English and French.
- AC2: Hub copy language follows existing runtime locale resolution.
- AC3: Destination labels display in the resolved locale when both `fr` and `en` are available.
- AC4: Missing/invalid localized label values do not break rendering and follow documented fallback behavior.
- AC5: Locale-focused tests cover EN and FR hub states.
- AC6: Lint/typecheck/test/build pass after delivery.

# AC Traceability
- AC1, AC2 -> `src/lib/i18n.ts`, `src/lib/i18n.test.ts`.
- AC3, AC4 -> `src/App.tsx`, `src/lib/config.ts`, `src/tests/app.ui.test.tsx`.
- AC5 -> `src/tests/app.ui.test.tsx`, `src/lib/i18n.test.ts`.
- AC6 -> CI/local validation commands.

# Priority
- Impact: Medium.
- Urgency: Medium.

# Notes
- Derived from `logics/request/req_008_post_submit_intermediate_links_hub_with_configurable_destinations.md`.
- Delivery task: `logics/tasks/task_005_super_orchestration_delivery_execution_for_item_016_to_item_019_with_validation_gates.md`.
- Implemented artifacts:
  - `src/lib/i18n.ts`
  - `src/lib/i18n.test.ts`
  - `src/App.tsx`
  - `src/tests/app.ui.test.tsx`
