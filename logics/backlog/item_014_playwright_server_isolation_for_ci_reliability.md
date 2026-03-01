## item_014_playwright_server_isolation_for_ci_reliability - Playwright server isolation for CI reliability
> From version: 1.0.1
> Status: Done
> Understanding: 100%
> Confidence: 97%
> Progress: 100%
> Complexity: Medium
> Theme: Engineering Quality
> Reminder: Update status/understanding/confidence/progress and linked task references when you edit this doc.

# Problem
- E2E execution can reuse an already running local server, reducing determinism of production-like validation in CI.
- This may produce false positives where tests pass against the wrong runtime context.

# Scope
- In:
  - enforce CI-safe Playwright server lifecycle so E2E targets intended build/preview context;
  - keep local developer ergonomics explicit via controlled override if needed;
  - document server reuse policy and expected behavior in local vs CI execution;
  - preserve existing smoke test intent and command simplicity.
- Out:
  - browser matrix expansion;
  - full deployment smoke suite beyond current landing flow.

# Acceptance criteria
- AC1: CI E2E no longer depends on accidental reuse of pre-existing local servers.
- AC2: Playwright config clearly separates deterministic CI behavior from optional local convenience behavior.
- AC3: E2E command path remains production-like (`build + preview`) for CI.
- AC4: Documentation reflects the server lifecycle policy for contributors.
- AC5: Lint/typecheck/test/build/test:e2e pass after changes.

# AC Traceability
- AC1, AC2, AC3 -> `playwright.config.ts`, `.github/workflows/ci.yml`.
- AC4 -> `README.md`, `CONTRIBUTING.md` (if relevant).
- AC5 -> CI/local checks (`ci:local`, `test:e2e`).

# Priority
- Impact: Medium.
- Urgency: Medium.

# Notes
- Derived from `logics/request/req_007_follow_up_hardening_for_form_routing_prefill_privacy_and_e2e_integrity.md`.
- Delivery task: `logics/tasks/task_004_super_orchestration_delivery_execution_for_item_011_to_item_015_with_validation_gates.md`.
- Implemented artifacts:
  - `playwright.config.ts`
  - `README.md`
  - `CONTRIBUTING.md`
