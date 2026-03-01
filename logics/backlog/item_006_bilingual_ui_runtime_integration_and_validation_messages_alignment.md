## item_006_bilingual_ui_runtime_integration_and_validation_messages_alignment - Bilingual UI runtime integration and validation messages alignment
> From version: 0.1.0
> Status: Draft
> Understanding: 97%
> Confidence: 95%
> Progress: 0%
> Complexity: Medium
> Theme: UX
> Reminder: Update status/understanding/confidence/progress and linked task references when you edit this doc.

# Problem
- Locale strategy alone is insufficient unless runtime UI wiring and validation messages are aligned.
- Users must see coherent language across labels, buttons, and errors based on detected locale.

# Scope
- In:
  - integrate locale resolver in UI runtime;
  - add EN/FR translations for non-configurable labels/buttons/messages;
  - align validation message generation with resolved locale;
  - document behavior in README.
- Out:
  - backend-driven translation services;
  - third language onboarding.

# Acceptance criteria
- AC1: Default language is English when locale is not French.
- AC2: French UI strings are used when locale indicates French.
- AC3: Validation errors are translated consistently with the active locale.
- AC4: Form behavior (submit/redirect/validation logic) remains unchanged functionally.
- AC5: Lint/build/test pass and include bilingual path coverage.
- AC6: README documents locale detection and fallback behavior.

# AC Traceability
- AC1, AC2 -> locale resolver + translation dictionary integration in UI components.
- AC3 -> validation message layer i18n mapping.
- AC4 -> existing form tests and smoke flow unaffected.
- AC5 -> validation command outputs and added tests.
- AC6 -> README locale section.

# Priority
- Impact: High.
- Urgency: Medium.

# Notes
- Derived from `logics/request/req_005_default_english_with_automatic_french_locale_detection_for_non_configurable_ui_text.md`.
- Delivery task: `logics/tasks/task_002_super_orchestration_delivery_execution_for_item_005_and_item_006_with_validation_gates.md`.
