## req_002_header_text_typography_env_configuration_for_size_and_style - Header text typography env configuration for size and style
> From version: 0.1.0
> Status: Done
> Understanding: 100%
> Confidence: 98%
> Complexity: Low
> Theme: UI
> Reminder: Update status/understanding/confidence and references when you edit this doc.

# Needs
- Allow campaign configuration of `VITE_HEADER_TEXT` typography from `.env`, specifically text size and style.
- Keep current header message behavior while adding reusable visual customization without code edits.
- Ensure invalid values do not break readability or layout.

# Context
- The header text content is already configurable through `VITE_HEADER_TEXT`.
- Campaign setup now requires typography tuning from env to match brand identity per deployment.
- This is a static frontend app, so all env values are public and must be treated as non-secret UI config.
- Mobile readability must remain the primary constraint.

# Objectives
- Extend env contract to support configurable header text typography.
- Add validation/fallback behavior for invalid or unsafe values.
- Preserve backward compatibility with existing `.env` setups.

# Scope
- In:
  - add env-driven typography controls for header text:
    - `VITE_HEADER_TEXT_FONT_SIZE`
    - `VITE_HEADER_TEXT_FONT_WEIGHT`
    - `VITE_HEADER_TEXT_FONT_STYLE`
  - wire these values to the header text rendering;
  - apply fallback defaults when values are missing/invalid;
  - update `.env.example` and README docs.
- Out:
  - full typography system redesign across all UI text blocks;
  - per-breakpoint typography tokens in env;
  - runtime user-side typography controls.

# Locked execution decisions
- Decision 1: Typography controls are env-based only (no extra form/config UI).
- Decision 2: Only header text (`VITE_HEADER_TEXT`) is targeted in this request.
- Decision 3: Invalid values must never degrade readability; defaults must be applied automatically.
- Decision 4: Mobile-first readability rules take precedence over visual preference.

# Acceptance criteria
- AC1: `.env` supports header typography variables for size, weight, and style.
- AC2: Header text reflects configured values when valid.
- AC3: If a typography value is missing/invalid/out-of-range, a safe default is used.
- AC4: Existing deployments without new typography vars keep the current visual behavior.
- AC5: `.env.example` and README are updated with variable definitions and usage notes.
- AC6: Lint/build/test checks pass after implementation.

# Definition of Ready (DoR)
- [x] Problem statement is explicit and user impact is clear.
- [x] Scope boundaries (in/out) are explicit.
- [x] Acceptance criteria are testable.
- [x] Dependencies and known risks are listed.

# Risks
- Extreme typography values can cause clipping/overflow if validation bounds are too permissive.
- Inconsistent CSS parsing of style/weight values if accepted formats are too broad.

# Backlog
- To create from this request:
  - `item_003_header_text_typography_env_contract_and_runtime_validation.md`

- `logics/backlog/item_002_header_text_typography_env_configuration_for_size_and_style.md`

# Tasks
- `logics/tasks/task_001_super_orchestration_delivery_execution_for_item_001_to_item_004_with_validation_gates.md`

# Implementation snapshot
- `src/lib/config.js`
- `src/lib/config.test.js`
- `src/App.jsx`
- `src/App.css`
- `.env.example`
- `README.md`

# References
- `.env.example`
- `src/lib/config.js`
- `src/App.jsx`
- `src/App.css`
- `README.md`
- `logics/request/req_000_static_render_qr_landing_with_formsubmit_and_configurable_redirect.md`
