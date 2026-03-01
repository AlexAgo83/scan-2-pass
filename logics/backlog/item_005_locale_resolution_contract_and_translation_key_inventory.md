## item_005_locale_resolution_contract_and_translation_key_inventory - Locale resolution contract and translation key inventory
> From version: 0.1.0
> Status: Done
> Understanding: 100%
> Confidence: 98%
> Progress: 100%
> Complexity: Medium
> Theme: UX
> Reminder: Update status/understanding/confidence/progress and linked task references when you edit this doc.

# Problem
- Non-configurable UI text was hardcoded in English, creating language mismatch for French users.
- Locale behavior needed an explicit contract and testable fallback semantics.

# Scope
- In:
  - define deterministic locale resolver contract (EN fallback, FR detection);
  - define translation key inventory for non-configurable UI text;
  - define fallback semantics for missing/unsupported locale cases.
- Out:
  - manual language switch UI;
  - additional languages beyond EN/FR.

# Acceptance criteria
- AC1: Locale resolution strategy is explicitly documented and deterministic.
- AC2: Translation key inventory covers non-configurable strings in current flow.
- AC3: Missing/unsupported locale behavior falls back to English.
- AC4: Env-configured strings remain outside translation override scope.

# AC Traceability
- AC1, AC3 -> `src/lib/i18n.js` + `src/lib/i18n.test.js` + README language section.
- AC2 -> translation map in `src/lib/i18n.js` (`form` + `validation` keys).
- AC4 -> `App.jsx` keeps `config.siteName` and `config.headerText` unchanged.

# Priority
- Impact: High.
- Urgency: Medium.

# Notes
- Derived from `logics/request/req_005_default_english_with_automatic_french_locale_detection_for_non_configurable_ui_text.md`.
- Delivery task: `logics/tasks/task_002_super_orchestration_delivery_execution_for_item_005_and_item_006_with_validation_gates.md`.
- Implemented artifacts:
  - `src/lib/i18n.js`
  - `src/lib/i18n.test.js`
  - `README.md`
