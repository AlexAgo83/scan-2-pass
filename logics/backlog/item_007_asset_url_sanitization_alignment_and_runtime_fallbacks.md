## item_007_asset_url_sanitization_alignment_and_runtime_fallbacks - Asset URL sanitization alignment and runtime fallbacks
> From version: 1.0.0
> Status: Done
> Understanding: 100%
> Confidence: 97%
> Progress: 100%
> Complexity: Medium
> Theme: Security
> Reminder: Update status/understanding/confidence/progress and linked task references when you edit this doc.

# Problem
- Asset URL sanitization is inconsistent between branding inputs, creating avoidable risk and non-deterministic fallback behavior.
- `favicon` uses a strict asset sanitizer, while `brandLogoUrl` is currently accepted with weaker validation.

# Scope
- In:
  - align logo URL sanitization with the same safe contract used for other asset URLs (root-relative or `http/https`);
  - preserve deterministic fallback behavior when value is missing or invalid;
  - add tests that prove acceptance/rejection rules and fallback path;
  - document allowed input patterns in env/config guidance.
- Out:
  - remote asset availability checks;
  - image optimization pipeline changes.

# Acceptance criteria
- AC1: `VITE_BRAND_LOGO_URL` is sanitized with safe asset URL rules.
- AC2: Invalid logo URL values fall back to stable default branding asset.
- AC3: Existing valid root-relative and absolute `http/https` URLs remain supported.
- AC4: Config tests cover valid, invalid, and fallback cases for logo URL.
- AC5: Lint/build/test pass after changes.

# AC Traceability
- AC1, AC2, AC3 -> `src/lib/config.ts` URL cleaning contract.
- AC4 -> `src/lib/config.test.ts`.
- AC5 -> CI/local checks (`lint`, `test`, `build`).

# Priority
- Impact: High.
- Urgency: High.

# Notes
- Derived from `logics/request/req_006_quality_hardening_security_privacy_ci_and_test_reliability.md`.
- Delivery task: `logics/tasks/task_003_super_orchestration_delivery_execution_for_item_007_to_item_010_with_validation_gates.md`.
- Implemented artifacts:
  - `src/lib/config.ts`
  - `src/lib/config.test.ts`
  - `README.md`
