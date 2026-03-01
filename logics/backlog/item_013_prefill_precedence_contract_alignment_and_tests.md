## item_013_prefill_precedence_contract_alignment_and_tests - Prefill precedence contract alignment and tests
> From version: 1.0.1
> Status: In Progress
> Understanding: 99%
> Confidence: 96%
> Progress: 0%
> Complexity: Low
> Theme: Data Integrity
> Reminder: Update status/understanding/confidence/progress and linked task references when you edit this doc.

# Problem
- Current merge behavior can diverge from the documented prefill priority contract under non-empty base defaults.
- This creates latent nondeterminism and contract drift between implementation, tests, and documentation.

# Scope
- In:
  - align prefill merge logic with documented priority (`query > storage > base`);
  - preserve existing sanitization and validation behavior for each source;
  - add explicit regression tests covering competing source values and precedence order;
  - align docs/comments with implemented precedence.
- Out:
  - expansion to new prefill sources;
  - major refactor of prefill architecture.

# Acceptance criteria
- AC1: Implementation enforces deterministic precedence `query > storage > base` for each field.
- AC2: Existing valid source sanitization behavior remains unchanged.
- AC3: Regression tests cover non-empty base defaults and conflicting source values.
- AC4: Documentation/comments no longer conflict with implementation behavior.
- AC5: Lint/typecheck/test/build pass after alignment.

# AC Traceability
- AC1, AC2, AC4 -> `src/lib/prefill.ts`.
- AC3 -> `src/lib/prefill.test.ts`.
- AC4, AC5 -> `README.md` (if needed) and CI/local checks.

# Priority
- Impact: Medium.
- Urgency: Medium.

# Notes
- Derived from `logics/request/req_007_follow_up_hardening_for_form_routing_prefill_privacy_and_e2e_integrity.md`.
- Delivery task: `logics/tasks/task_004_super_orchestration_delivery_execution_for_item_011_to_item_015_with_validation_gates.md`.
- Planned artifacts:
  - `src/lib/prefill.ts`
  - `src/lib/prefill.test.ts`
  - `README.md`
