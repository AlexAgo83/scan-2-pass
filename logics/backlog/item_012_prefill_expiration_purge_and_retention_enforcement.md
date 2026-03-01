## item_012_prefill_expiration_purge_and_retention_enforcement - Prefill expiration purge and retention enforcement
> From version: 1.0.1
> Status: In Progress
> Understanding: 99%
> Confidence: 96%
> Progress: 0%
> Complexity: Medium
> Theme: Privacy
> Reminder: Update status/understanding/confidence/progress and linked task references when you edit this doc.

# Problem
- Expired prefill values are ignored by selection logic but remain persisted in browser storage.
- This weakens the effective privacy retention promise and keeps stale personal data longer than intended.

# Scope
- In:
  - actively purge expired prefill payloads from storage when detected;
  - keep existing safe fallback behavior when stored payload is missing, malformed, or expired;
  - preserve submit-lifecycle clearing behavior for successful flows;
  - document retention enforcement behavior.
- Out:
  - consent management workflows;
  - server-side retention enforcement.

# Acceptance criteria
- AC1: Expired stored prefill payloads are removed from storage when read/validated.
- AC2: Expired or malformed payloads fall back to safe empty/default values.
- AC3: Valid non-expired payload behavior remains unchanged.
- AC4: Submit lifecycle cleanup remains compatible with retention enforcement.
- AC5: Tests explicitly cover purge-on-expiry behavior.
- AC6: Lint/typecheck/test/build pass after changes.

# AC Traceability
- AC1, AC2, AC3 -> `src/lib/prefill.ts`.
- AC4 -> `src/hooks/useContactForm.ts`.
- AC5 -> `src/lib/prefill.test.ts`.
- AC6 -> CI/local checks and related docs.

# Priority
- Impact: High.
- Urgency: Medium.

# Notes
- Derived from `logics/request/req_007_follow_up_hardening_for_form_routing_prefill_privacy_and_e2e_integrity.md`.
- Delivery task: `logics/tasks/task_004_super_orchestration_delivery_execution_for_item_011_to_item_015_with_validation_gates.md`.
- Planned artifacts:
  - `src/lib/prefill.ts`
  - `src/lib/prefill.test.ts`
  - `src/hooks/useContactForm.ts`
  - `README.md`
