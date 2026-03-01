## req_006_quality_hardening_security_privacy_ci_and_test_reliability - Quality hardening for security, privacy, CI, and test reliability
> From version: 1.0.0
> Status: Done
> Understanding: 100%
> Confidence: 99%
> Complexity: Medium
> Theme: Quality
> Reminder: Update status/understanding/confidence and references when you edit this doc.

# Needs
- Raise production quality by addressing key gaps identified in the global review:
  - asset URL sanitization consistency;
  - prefill privacy lifecycle;
  - CI gate completeness;
  - coverage signal quality;
  - E2E execution realism;
  - submit UX robustness.
- Keep current product scope and behavior intact while reducing operational and regression risk.

# Context
- Current baseline is stable:
  - lint/test/build pass locally;
  - current smoke E2E passes;
  - production dependency audit reports no known vulnerabilities.
- Existing implementation already includes config sanitization and deterministic form behavior, but some safeguards are partial or missing.
- The app remains static/client-side with FormSubmit integration (no custom backend).

# Objectives
- Harden runtime and delivery safeguards without introducing unnecessary complexity.
- Improve confidence that CI reflects true production behavior.
- Reduce privacy and UX risk in the form lifecycle.

# Scope
- In:
  - sanitize `VITE_BRAND_LOGO_URL` with the same strict contract as other asset URLs;
  - improve prefill storage strategy (retention/expiration and lifecycle controls);
  - extend CI checks to include `typecheck` and stronger test gates;
  - tighten coverage configuration to measure app code (not test files) and enforce thresholds;
  - run E2E against a production-like server (`vite preview`) in CI;
  - add submit-state UX guardrails (prevent duplicate submits, clear user feedback).
- Out:
  - backend/API introduction;
  - major product redesign;
  - migration to external i18n or form platforms.

# Locked execution decisions
- Decision 1: Asset URL sanitization rules must be consistent across logo/favicon handling.
- Decision 2: Prefill persistence must remain optional-client behavior, with privacy-conscious retention defaults.
- Decision 3: CI must validate lint + type safety + tests + build before merge.
- Decision 4: Coverage gates must target source behavior, not inflate with test file inclusion.
- Decision 5: E2E CI baseline should validate built artifacts, not only dev server behavior.
- Decision 6: Submission UX must prevent accidental duplicate POSTs and communicate state clearly.

# Acceptance criteria
- AC1: `VITE_BRAND_LOGO_URL` is validated with safe asset URL rules (root-relative or `http/https`) with fallback behavior preserved.
- AC2: Prefill persistence includes retention control (for example TTL) and a clear lifecycle rule (for example purge on successful submit).
- AC3: CI workflow includes `npm run typecheck` in required checks.
- AC4: Coverage config excludes test files from measured scope and defines explicit minimum thresholds.
- AC5: E2E workflow validates against production-like output (`vite build` + `vite preview` or equivalent).
- AC6: Form submit button/state prevents duplicate submission attempts during pending submit.
- AC7: Existing functional flow (validation, FormSubmit payload, redirect, locale behavior) remains intact.
- AC8: Lint, unit/UI tests, E2E, and build pass after hardening changes.
- AC9: README/docs reflect any behavior change relevant to privacy, CI, or testing strategy.

# Definition of Ready (DoR)
- [x] Problem statement is explicit and user impact is clear.
- [x] Scope boundaries (in/out) are explicit.
- [x] Acceptance criteria are testable.
- [x] Dependencies and known risks are listed.

# Risks
- Over-restrictive asset URL validation could reject a previously accepted but valid campaign asset.
- Prefill retention changes may alter expected convenience if TTL is too short.
- CI duration may increase after adding typecheck and production-like E2E steps.
- Coverage threshold miscalibration may create noisy failures until baseline is tuned.

# Backlog
- To create from this request:
  - none (items created)

- Active items:
  - `logics/backlog/item_000_static_render_qr_landing_with_formsubmit_and_configurable_redirect.md`
  - `logics/backlog/item_001_render_deployment_blueprint_and_reusable_setup_contract.md`
  - `logics/backlog/item_002_header_text_typography_env_configuration_for_size_and_style.md`
  - `logics/backlog/item_003_adaptive_vertical_centering_behavior_for_landing_card.md`
  - `logics/backlog/item_004_user_data_prefill_strategy_for_email_first_name_and_last_name.md`
  - `logics/backlog/item_005_locale_resolution_contract_and_translation_key_inventory.md`
  - `logics/backlog/item_006_bilingual_ui_runtime_integration_and_validation_messages_alignment.md`
  - `logics/backlog/item_007_asset_url_sanitization_alignment_and_runtime_fallbacks.md`
  - `logics/backlog/item_008_prefill_privacy_retention_and_submit_lifecycle_controls.md`
  - `logics/backlog/item_009_ci_coverage_and_production_like_e2e_quality_gates.md`
  - `logics/backlog/item_010_submit_state_ux_resilience_and_feedback.md`

# Tasks
- `logics/tasks/task_003_super_orchestration_delivery_execution_for_item_007_to_item_010_with_validation_gates.md`

# Implementation snapshot
- `src/lib/config.ts`
- `src/lib/config.test.ts`
- `src/lib/prefill.ts`
- `src/lib/prefill.test.ts`
- `src/hooks/useContactForm.ts`
- `src/App.tsx`
- `src/lib/i18n.ts`
- `src/App.css`
- `src/tests/app.ui.test.tsx`
- `vite.config.ts`
- `playwright.config.ts`
- `.github/workflows/ci.yml`
- `eslint.config.js`
- `package.json`
- `README.md`

# References
- `src/lib/config.ts`
- `src/hooks/useContactForm.ts`
- `src/App.tsx`
- `vite.config.ts`
- `playwright.config.ts`
- `.github/workflows/ci.yml`
- `README.md`
