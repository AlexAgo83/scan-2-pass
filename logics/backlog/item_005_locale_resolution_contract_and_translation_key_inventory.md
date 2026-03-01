## item_005_locale_resolution_contract_and_translation_key_inventory - Locale resolution contract and translation key inventory
> From version: 0.1.0
> Status: Draft
> Understanding: 98%
> Confidence: 96%
> Progress: 0%
> Complexity: Medium
> Theme: UX
> Reminder: Update status/understanding/confidence/progress and linked task references when you edit this doc.

# Problem
- Non-configurable UI text is currently hardcoded, creating a language mismatch for French users.
- Without a deterministic locale contract, i18n behavior can be inconsistent and difficult to validate.

# Scope
- In:
  - define locale resolution contract:
    - fallback language: English;
    - French selected when browser locale starts with `fr`;
  - inventory non-configurable text keys requiring translation;
  - define translation key structure and fallback rules.
- Out:
  - manual language switch UI;
  - support for additional languages beyond EN/FR.

# Acceptance criteria
- AC1: Locale resolution strategy is explicitly documented and deterministic.
- AC2: Translation key inventory covers all non-configurable strings in current flow.
- AC3: Missing key behavior is defined (fallback to English).
- AC4: Contract preserves env-configured strings as language-agnostic source-of-truth.

# AC Traceability
- AC1, AC3 -> locale contract docs + runtime helper contract.
- AC2 -> translation key map and key usage audit in UI/validation layers.
- AC4 -> explicit separation between env-configured strings and translatable UI strings.

# Priority
- Impact: High.
- Urgency: Medium.

# Notes
- Derived from `logics/request/req_005_default_english_with_automatic_french_locale_detection_for_non_configurable_ui_text.md`.
- Delivery task: `logics/tasks/task_002_super_orchestration_delivery_execution_for_item_005_and_item_006_with_validation_gates.md`.
