## req_005_default_english_with_automatic_french_locale_detection_for_non_configurable_ui_text - Default English with automatic French locale detection for non-configurable UI text
> From version: 0.1.0
> Status: Draft
> Understanding: 98%
> Confidence: 97%
> Complexity: Medium
> Theme: UX
> Reminder: Update status/understanding/confidence and references when you edit this doc.

# Needs
- Set English as default UI language.
- Automatically switch to French when the user device/browser locale is French.
- Apply this behavior only to non-configurable UI text (text not already driven by `.env`).
- Keep the experience seamless for users without adding manual language configuration in this wave.

# Context
- Current UI text is mostly hardcoded in English.
- The product target includes both English and French users.
- Some text is already configurable via `.env` (for example site/header branding text) and should remain source-of-truth from config.
- The app is static/client-side only, so locale detection must be browser-based.

# Objectives
- Introduce a lightweight i18n strategy with deterministic language resolution.
- Preserve existing env-driven customization.
- Avoid regressions in form validation messages and labels.

# Scope
- In:
  - language resolution rule:
    - default: English;
    - French when device/browser locale starts with `fr`;
  - translation coverage for non-configurable UI strings:
    - form labels;
    - button text;
    - helper/error messages that are currently hardcoded;
  - fallback safety to English when locale detection is unavailable or unsupported.
- Out:
  - full multilingual framework for arbitrary languages;
  - manual language switcher UI;
  - translation of values explicitly configured from `.env`.

# Locked execution decisions
- Decision 1: English is the global fallback/default language.
- Decision 2: French is auto-selected only when locale indicates French (`fr`, `fr-FR`, etc.).
- Decision 3: Environment-configured text remains untouched by locale auto-detection.
- Decision 4: Locale detection is client-side (browser/device) only.
- Decision 5: Missing translation keys must gracefully fallback to English.

# Acceptance criteria
- AC1: Non-configurable UI text is displayed in English by default.
- AC2: Non-configurable UI text is displayed in French when browser locale is French.
- AC3: Env-configurable strings (e.g. `VITE_HEADER_TEXT`) are not overridden by locale logic.
- AC4: Validation and error messages follow the resolved language.
- AC5: No functional regressions in form submission flow.
- AC6: Lint/build/test pass after implementation.
- AC7: README (or equivalent docs) explains locale resolution and fallback behavior.

# Definition of Ready (DoR)
- [x] Problem statement is explicit and user impact is clear.
- [x] Scope boundaries (in/out) are explicit.
- [x] Acceptance criteria are testable.
- [x] Dependencies and known risks are listed.

# Risks
- Browser locale detection may vary across environments (`navigator.language` vs `navigator.languages`).
- Partial translation coverage can create mixed-language UI if keys are missed.

# Backlog
- To create from this request:
  - `item_005_locale_resolution_contract_and_translation_key_inventory.md`
  - `item_006_bilingual_ui_runtime_integration_and_validation_messages_alignment.md`

- Active items:
  - `logics/backlog/item_005_locale_resolution_contract_and_translation_key_inventory.md`
  - `logics/backlog/item_006_bilingual_ui_runtime_integration_and_validation_messages_alignment.md`

# Tasks
- `logics/tasks/task_002_super_orchestration_delivery_execution_for_item_005_and_item_006_with_validation_gates.md`

# References
- `src/App.jsx`
- `src/lib/validation.js`
- `README.md`
- `logics/request/req_000_static_render_qr_landing_with_formsubmit_and_configurable_redirect.md`
