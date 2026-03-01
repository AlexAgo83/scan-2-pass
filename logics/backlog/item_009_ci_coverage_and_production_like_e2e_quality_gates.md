## item_009_ci_coverage_and_production_like_e2e_quality_gates - CI coverage and production-like E2E quality gates
> From version: 1.0.0
> Status: To Do
> Understanding: 100%
> Confidence: 97%
> Progress: 0%
> Complexity: Medium
> Theme: Engineering Quality
> Reminder: Update status/understanding/confidence/progress and linked task references when you edit this doc.

# Problem
- Current CI gates miss some critical checks (`typecheck`, production-like E2E path).
- Coverage configuration currently includes test files in measured scope, reducing signal quality.

# Scope
- In:
  - add `typecheck` as required CI step;
  - update coverage target to focus on source code only (exclude tests);
  - introduce explicit coverage thresholds to prevent regression drift;
  - run E2E against production-like serving mode (`build + preview` or equivalent);
  - keep CI pipeline readable and deterministic.
- Out:
  - full matrix testing across all browsers/devices;
  - deployment orchestration changes.

# Acceptance criteria
- AC1: CI workflow includes `npm run typecheck`.
- AC2: Coverage config excludes test files from measured scope.
- AC3: Coverage thresholds are defined and enforced in CI.
- AC4: E2E runs against production-like build output in CI.
- AC5: CI remains green with updated gates on baseline code.

# AC Traceability
- AC1, AC4, AC5 -> `.github/workflows/ci.yml` and related scripts.
- AC2, AC3 -> `vite.config.ts` test coverage configuration.
- AC4 -> `playwright.config.ts` and/or CI command wiring.

# Priority
- Impact: High.
- Urgency: High.

# Notes
- Derived from `logics/request/req_006_quality_hardening_security_privacy_ci_and_test_reliability.md`.
- Delivery task: `logics/tasks/task_003_super_orchestration_delivery_execution_for_item_007_to_item_010_with_validation_gates.md`.
- Planned target artifacts:
  - `.github/workflows/ci.yml`
  - `vite.config.ts`
  - `playwright.config.ts`
  - `package.json`
