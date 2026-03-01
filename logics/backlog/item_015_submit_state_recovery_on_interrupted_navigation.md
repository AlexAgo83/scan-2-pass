## item_015_submit_state_recovery_on_interrupted_navigation - Submit state recovery on interrupted navigation
> From version: 1.0.1
> Status: In Progress
> Understanding: 98%
> Confidence: 95%
> Progress: 0%
> Complexity: Medium
> Theme: UX
> Reminder: Update status/understanding/confidence/progress and linked task references when you edit this doc.

# Problem
- Submit pending state currently has no explicit recovery path if navigation/submission does not complete.
- Users can become stuck with disabled submit action in interruption edge cases.

# Scope
- In:
  - add explicit recovery path for pending submit when navigation does not complete as expected;
  - preserve duplicate-submit guard during actual in-flight submit;
  - keep validation-first flow and FormSubmit payload contract unchanged;
  - provide accessible user feedback for pending/recovery state transitions.
- Out:
  - custom network retry backend;
  - broad redesign of form UX.

# Acceptance criteria
- AC1: Pending submit state cannot remain indefinitely locked without recovery.
- AC2: Duplicate submit prevention remains active during legitimate pending period.
- AC3: Recovery behavior is user-visible and accessibility-safe.
- AC4: Validation behavior and successful submit flow remain unchanged.
- AC5: UI/hook tests cover interrupted submit or non-navigation edge case.
- AC6: Lint/typecheck/test/build pass after changes.

# AC Traceability
- AC1, AC2, AC3 -> `src/hooks/useContactForm.ts`, `src/App.tsx`.
- AC4 -> `src/lib/validation.ts` and submit integration.
- AC5 -> `src/tests/app.ui.test.tsx` and/or dedicated hook tests.
- AC6 -> CI/local checks.

# Priority
- Impact: Medium.
- Urgency: Medium.

# Notes
- Derived from `logics/request/req_007_follow_up_hardening_for_form_routing_prefill_privacy_and_e2e_integrity.md`.
- Delivery task: `logics/tasks/task_004_super_orchestration_delivery_execution_for_item_011_to_item_015_with_validation_gates.md`.
- Planned artifacts:
  - `src/hooks/useContactForm.ts`
  - `src/App.tsx`
  - `src/App.css`
  - `src/tests/app.ui.test.tsx`
