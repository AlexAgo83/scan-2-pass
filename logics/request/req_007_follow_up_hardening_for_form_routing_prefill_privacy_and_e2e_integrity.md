## req_007_follow_up_hardening_for_form_routing_prefill_privacy_and_e2e_integrity - Follow-up hardening for form routing, prefill privacy, and E2E integrity
> From version: 1.0.1
> Status: Done
> Understanding: 100%
> Confidence: 97%
> Complexity: Medium
> Theme: Quality
> Reminder: Update status/understanding/confidence and references when you edit this doc.

# Needs
- Address high-impact follow-up risks identified during the global project review.
- Protect user-data routing and local prefill handling from silent misconfiguration or stale behavior.
- Increase confidence that E2E checks reflect production-like behavior and that submit UX remains resilient under edge cases.

# Context
- Current implementation is globally stable and passes lint, typecheck, unit/UI tests, build, and current E2E smoke tests.
- The review identified gaps that are mostly latent and not fully covered by the current test suite:
  - FormSubmit receiver fallback can route data to an unintended default address on bad/missing env input.
  - Expired prefill entries are ignored but not physically purged from storage.
  - Prefill merge priority can diverge from the documented contract if base defaults become non-empty.
  - Playwright can reuse an existing server and reduce CI realism.
  - Submit state can remain locked if navigation/submission does not complete as expected.

# Objectives
- Prevent silent misrouting of submitted user data.
- Enforce effective prefill retention behavior aligned with documented privacy expectations.
- Align runtime prefill precedence with explicit product contract.
- Strengthen E2E environment determinism to reduce false positives.
- Ensure submit-state UX can recover from interrupted submit/navigation flows.

# Scope
- In:
  - fail-fast or explicit guardrails for invalid/missing FormSubmit receiver configuration in non-dev contexts;
  - storage purge behavior when persisted prefill payloads are expired;
  - deterministic merge behavior honoring documented prefill precedence (`query > storage > base`);
  - Playwright runtime policy preventing accidental reuse of unrelated local servers in CI;
  - submit-state recovery mechanism when pending submission does not resolve.
- Out:
  - backend migration or replacing FormSubmit provider;
  - redesign of form fields or visual UI direction;
  - broad i18n or architecture refactor unrelated to these hardening points.

# Locked execution decisions
- Decision 1: Data-routing safety has priority over permissive fallback behavior for receiver configuration.
- Decision 2: Privacy retention promises must be reflected in effective storage lifecycle, not only in selection logic.
- Decision 3: Prefill precedence rules are contract-level behavior and must be implementation-consistent.
- Decision 4: CI E2E checks must verify the intended target server lifecycle for production-like confidence.
- Decision 5: Submit UX must degrade safely when network/navigation completion is uncertain.

# Acceptance criteria
- AC1: Receiver configuration handling no longer allows silent routing to an unintended default destination in non-dev execution.
- AC2: Expired prefill payloads are actively purged from storage when detected.
- AC3: Prefill merge behavior is deterministic and consistent with documented priority (`query > storage > base`).
- AC4: E2E configuration in CI prevents accidental reuse of pre-existing local servers.
- AC5: Submit state includes a documented and tested recovery path when submission does not complete.
- AC6: Regression coverage is added/updated for each hardening point.
- AC7: Lint, typecheck, unit/UI tests, E2E tests, and build pass after changes.
- AC8: README and/or deployment docs are updated if runtime behavior or operational expectations change.

# Definition of Ready (DoR)
- [x] Problem statement is explicit and user impact is clear.
- [x] Scope boundaries (in/out) are explicit.
- [x] Acceptance criteria are testable.
- [x] Dependencies and known risks are listed.

# Risks
- Over-strict receiver guards may break existing demo/local flows if not environment-aware.
- Purging expired prefill values may reduce convenience for some returning users.
- E2E server policy changes may increase local developer friction if not configurable.
- Submit recovery logic may introduce edge-state complexity without clear observability.

# Backlog
- To create from this request:
  - none (items created)

- Active items:
  - `logics/backlog/item_011_formsubmit_receiver_guardrails_and_fail_fast_behavior.md`
  - `logics/backlog/item_012_prefill_expiration_purge_and_retention_enforcement.md`
  - `logics/backlog/item_013_prefill_precedence_contract_alignment_and_tests.md`
  - `logics/backlog/item_014_playwright_server_isolation_for_ci_reliability.md`
  - `logics/backlog/item_015_submit_state_recovery_on_interrupted_navigation.md`

# Tasks
- `logics/tasks/task_004_super_orchestration_delivery_execution_for_item_011_to_item_015_with_validation_gates.md`

# Implementation snapshot
- `src/lib/config.ts`
- `src/lib/config.test.ts`
- `src/lib/prefill.ts`
- `src/lib/prefill.test.ts`
- `src/hooks/useContactForm.ts`
- `src/App.tsx`
- `src/App.css`
- `src/lib/i18n.ts`
- `src/tests/app.ui.test.tsx`
- `playwright.config.ts`
- `README.md`
- `CONTRIBUTING.md`
- `logics/backlog/item_011_formsubmit_receiver_guardrails_and_fail_fast_behavior.md`
- `logics/backlog/item_012_prefill_expiration_purge_and_retention_enforcement.md`
- `logics/backlog/item_013_prefill_precedence_contract_alignment_and_tests.md`
- `logics/backlog/item_014_playwright_server_isolation_for_ci_reliability.md`
- `logics/backlog/item_015_submit_state_recovery_on_interrupted_navigation.md`
- `logics/tasks/task_004_super_orchestration_delivery_execution_for_item_011_to_item_015_with_validation_gates.md`

# References
- `src/lib/config.ts`
- `src/lib/prefill.ts`
- `src/hooks/useContactForm.ts`
- `playwright.config.ts`
- `.github/workflows/ci.yml`
- `README.md`
- `logics/request/req_006_quality_hardening_security_privacy_ci_and_test_reliability.md`
