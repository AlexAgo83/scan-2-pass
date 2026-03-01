## item_006_bilingual_ui_runtime_integration_and_validation_messages_alignment - Bilingual UI runtime integration and validation messages alignment
> From version: 0.1.0
> Status: Done
> Understanding: 100%
> Confidence: 98%
> Progress: 100%
> Complexity: Medium
> Theme: UX
> Reminder: Update status/understanding/confidence/progress and linked task references when you edit this doc.

# Problem
- Locale contract alone was not enough without runtime wiring for UI labels/buttons/errors.
- Validation messages had to align with active locale while preserving existing form behavior.

# Scope
- In:
  - integrate locale resolution and translation lookup in runtime UI;
  - localize non-configurable labels/placeholders/button text;
  - localize validation errors based on active locale;
  - document behavior in README.
- Out:
  - backend translation services;
  - third language support.

# Acceptance criteria
- AC1: Default language is English when locale is not French.
- AC2: French UI strings are used when locale indicates French.
- AC3: Validation errors are translated with active locale.
- AC4: Form flow behavior remains unchanged functionally.
- AC5: Lint/build/test pass with bilingual path coverage.
- AC6: README documents locale detection and fallback behavior.

# AC Traceability
- AC1, AC2 -> `src/App.jsx` + `src/lib/i18n.js`.
- AC3 -> `src/lib/validation.js` + localized messages passed from `App.jsx`.
- AC4 -> unchanged submit/prefill wiring in `App.jsx`.
- AC5 -> `npm run -s lint`, `npm run -s build`, `npm run -s test` (17 tests).
- AC6 -> `README.md` language behavior section.

# Priority
- Impact: High.
- Urgency: Medium.

# Notes
- Derived from `logics/request/req_005_default_english_with_automatic_french_locale_detection_for_non_configurable_ui_text.md`.
- Delivery task: `logics/tasks/task_002_super_orchestration_delivery_execution_for_item_005_and_item_006_with_validation_gates.md`.
- Implemented artifacts:
  - `src/App.jsx`
  - `src/lib/validation.js`
  - `src/lib/validation.test.js`
  - `README.md`
