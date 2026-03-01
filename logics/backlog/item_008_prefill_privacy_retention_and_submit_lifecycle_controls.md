## item_008_prefill_privacy_retention_and_submit_lifecycle_controls - Prefill privacy retention and submit lifecycle controls
> From version: 1.0.0
> Status: Done
> Understanding: 100%
> Confidence: 96%
> Progress: 100%
> Complexity: Medium
> Theme: Privacy
> Reminder: Update status/understanding/confidence/progress and linked task references when you edit this doc.

# Problem
- Prefill values (`email`, `firstName`, `lastName`) are persisted on every change without retention window or lifecycle cleanup.
- This increases privacy exposure risk and can keep stale personal data longer than needed.

# Scope
- In:
  - add retention policy for stored prefill values (for example TTL-based expiry);
  - purge or reset persisted prefill data on successful submit flow;
  - keep deterministic prefill precedence and validation compatibility;
  - document the privacy behavior and retention rules in README.
- Out:
  - backend consent storage;
  - server-side identity/session handling.

# Acceptance criteria
- AC1: Prefill storage includes an explicit retention window and expiry behavior.
- AC2: Expired prefill data is ignored and replaced by safe defaults.
- AC3: Successful submit lifecycle clears or invalidates persisted prefill data.
- AC4: Existing prefill priority (query > storage > defaults) remains deterministic for valid non-expired data.
- AC5: Tests cover TTL expiry and submit-lifecycle cleanup.
- AC6: README documents privacy and retention behavior.
- AC7: Lint/build/test pass after changes.

# AC Traceability
- AC1, AC2, AC4 -> `src/lib/prefill.ts`.
- AC3 -> `src/hooks/useContactForm.ts` + submit flow in `src/App.tsx`.
- AC5 -> `src/lib/prefill.test.ts` and related UI tests if needed.
- AC6 -> `README.md`.
- AC7 -> CI/local checks (`lint`, `test`, `build`).

# Priority
- Impact: High.
- Urgency: Medium.

# Notes
- Derived from `logics/request/req_006_quality_hardening_security_privacy_ci_and_test_reliability.md`.
- Delivery task: `logics/tasks/task_003_super_orchestration_delivery_execution_for_item_007_to_item_010_with_validation_gates.md`.
- Implemented artifacts:
  - `src/lib/prefill.ts`
  - `src/lib/prefill.test.ts`
  - `src/hooks/useContactForm.ts`
  - `README.md`
