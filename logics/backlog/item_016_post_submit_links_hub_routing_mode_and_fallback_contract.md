## item_016_post_submit_links_hub_routing_mode_and_fallback_contract - Post-submit links hub routing mode and fallback contract
> From version: 1.0.2
> Status: Done
> Understanding: 100%
> Confidence: 97%
> Progress: 100%
> Complexity: Medium
> Theme: UX
> Reminder: Update status/understanding/confidence/progress and linked task references when you edit this doc.

# Problem
- Post-submit behavior is currently direct redirect only and does not support deterministic hub-vs-direct routing rules.
- Product decisions now require mode switching based on number of valid enabled links (`0`, `1`, `2+`) with safe fallback behavior.

# Scope
- In:
  - formalize routing decision contract after successful submit:
    - `2+ valid enabled links` -> show links hub;
    - `1 valid enabled link` -> direct redirect (no hub);
    - `0 valid enabled links` -> safe fallback redirect;
  - keep existing submit lifecycle and FormSubmit integration semantics unchanged;
  - document route/query strategy for hub entry in static hosting context;
  - define deterministic behavior for malformed or empty destination config results.
- Out:
  - redesign of form UX before submit;
  - analytics instrumentation and reporting.

# Acceptance criteria
- AC1: Routing rule for `0/1/2+` valid links is explicitly implemented and documented.
- AC2: Single-link path keeps direct redirect behavior (no hub render).
- AC3: Zero-valid-link path uses safe fallback redirect and never leaves user on a dead-end page.
- AC4: Existing submit validation and pending/recovery behavior remains unchanged.
- AC5: Regression tests cover each routing branch (`0`, `1`, `2+`).
- AC6: Lint/typecheck/test/build pass after delivery.

# AC Traceability
- AC1, AC2, AC3 -> `src/App.tsx`, `src/lib/config.ts`, `README.md`.
- AC4 -> `src/hooks/useContactForm.ts`, `src/tests/app.ui.test.tsx`.
- AC5 -> `src/tests/app.ui.test.tsx` and/or dedicated routing/config tests.
- AC6 -> CI/local validation commands.

# Priority
- Impact: High.
- Urgency: Medium.

# Notes
- Derived from `logics/request/req_008_post_submit_intermediate_links_hub_with_configurable_destinations.md`.
- Delivery task: `logics/tasks/task_005_super_orchestration_delivery_execution_for_item_016_to_item_019_with_validation_gates.md`.
- Implemented artifacts:
  - `src/App.tsx`
  - `src/lib/post-submit-routing.ts`
  - `src/lib/post-submit-routing.test.ts`
  - `src/tests/app.ui.test.tsx`
  - `README.md`
