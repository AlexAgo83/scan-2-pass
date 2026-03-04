## req_008_post_submit_intermediate_links_hub_with_configurable_destinations - Post-submit intermediate links hub with configurable destinations
> From version: 1.0.2
> Status: Done
> Understanding: 100%
> Confidence: 96%
> Complexity: Medium
> Theme: UX
> Reminder: Update status/understanding/confidence and references when you edit this doc.

# Needs
- Replace direct single-link redirection after form submission with an intermediate destination page.
- Support a configurable list of destination links (starting with one YouTube video link, then extensible over time).
- Keep the current form submission reliability while enabling future campaign/content flexibility.
- Support bilingual user experience (FR/EN) for hub content.

# Context
- Current behavior redirects users directly to a single configured URL after successful FormSubmit handling.
- Product intent is shifting from one fixed destination to a curated destination set that may change over time.
- Introducing an extra step can reduce conversion if the added choice is not meaningful or if UI latency increases.
- This project is static-first and config-driven; destination management should remain lightweight and deployment-friendly.
- Product decision: no analytics implementation in this wave.

# Objectives
- Define a deterministic post-submit routing model that can operate with one or many destinations.
- Keep backward compatibility with current single-link flows.
- Ensure the intermediate page is optional and safe by default.
- Prevent configuration errors from degrading user experience (empty list, invalid URLs, broken labels/order).

# Scope
- In:
  - a post-submit intermediate links hub page in the frontend flow when at least 2 valid links are enabled;
  - direct redirection when exactly 1 valid link is enabled (no hub in this case);
  - config contract from `.env` using a JSON string variable for destination entries (`label`, `url`, `order`, `enabled`);
  - fallback behavior when no valid destination is available;
  - direct clickable links on the hub page (no extra sub-step);
  - FR/EN handling for hub text and link labels.
- Out:
  - backend CMS/admin panel for managing links;
  - personalization/recommendation logic by user profile;
  - analytics/instrumentation in this request scope.

# Locked execution decisions
- Decision 1: Links configuration source is `.env` only for this wave, via `VITE_DESTINATION_LINKS_JSON`.
- Decision 2: The current direct redirect path remains active when exactly one valid link exists.
- Decision 3: Destination links must be validated (http/https only) before rendering.
- Decision 4: Destination metadata contract is limited to `label`, `url`, `order`, `enabled`.
- Decision 5: No analytics events are implemented in this wave.
- Decision 6: Hub UX supports FR/EN.
- Decision 7: Links are directly accessible from the hub page.

# Config contract
- `VITE_DESTINATION_LINKS_JSON` stores a JSON array of destination entries.
- Entry schema:
  - `label`: localized object with `fr` and `en` string values.
  - `url`: destination URL (`http/https` only).
  - `order`: numeric ordering (ascending).
  - `enabled`: boolean toggle.
- Example:
  - `VITE_DESTINATION_LINKS_JSON=[{"label":{"fr":"Voir la video","en":"Watch the video"},"url":"https://youtube.com/watch?v=demo","order":1,"enabled":true},{"label":{"fr":"Telecharger le guide","en":"Download the guide"},"url":"https://example.com/guide.pdf","order":2,"enabled":true}]`
- Parsing/validation behavior:
  - malformed JSON or invalid entries are ignored safely;
  - only valid enabled entries are kept for runtime routing/rendering;
  - if no valid enabled entry remains, fallback uses existing safe redirect behavior (`VITE_REDIRECT_URL`).

# Acceptance criteria
- AC1: Post-submit flow routes to the links hub only when 2 or more valid links are enabled.
- AC2: The links hub renders only valid, enabled destinations from configuration.
- AC3: Configuration is read from `VITE_DESTINATION_LINKS_JSON` and supports at minimum: `label`, `url`, `order`, `enabled`.
- AC4: When exactly one valid link is enabled, post-submit behavior stays direct (no hub view).
- AC5: When configuration is empty or fully invalid, the app falls back to a safe configured default behavior.
- AC6: Existing submit behavior (validation, pending state, submit recovery) is not regressed.
- AC7: Hub links are directly clickable from the hub page.
- AC8: Hub UX is available in FR/EN (non-configurable UI copy + link labels contract).
- AC9: UI remains mobile-first and accessible (keyboard focus order, readable labels, tap targets).
- AC10: Malformed JSON and invalid entries do not break runtime; only valid enabled entries are considered.
- AC11: Entries are displayed in ascending `order`.
- AC12: README and env contract documentation are updated for link-list configuration and fallback rules.
- AC13: Lint, typecheck, unit/UI tests, build, and E2E smoke checks pass after implementation.

# Definition of Ready (DoR)
- [x] Problem statement is explicit and user impact is clear.
- [x] Scope boundaries (in/out) are explicit.
- [x] Acceptance criteria are testable.
- [x] Dependencies and known risks are listed.

# Risks
- Conversion can drop because of one extra click in the funnel.
- Poorly curated link lists can create decision fatigue and lower click-through.
- Lack of analytics in this wave can delay objective conversion evaluation.
- Misconfiguration (invalid URLs or no active links) can produce dead-end experiences without robust fallback.

# Backlog
- To create from this request:
  - none (items created)

- Active items:
  - `logics/backlog/item_016_post_submit_links_hub_routing_mode_and_fallback_contract.md`
  - `logics/backlog/item_017_destination_links_configuration_validation_and_rendering.md`
  - `logics/backlog/item_018_links_hub_bilingual_fr_en_contract_and_ui_copy_alignment.md`
  - `logics/backlog/item_019_links_hub_ui_accessibility_mobile_ux_and_regression_coverage.md`

# Tasks
- `logics/tasks/task_005_super_orchestration_delivery_execution_for_item_016_to_item_019_with_validation_gates.md`

# Implementation snapshot
- Implemented artifacts:
  - `src/lib/config.ts`
  - `src/lib/config.test.ts`
  - `src/lib/post-submit-routing.ts`
  - `src/lib/post-submit-routing.test.ts`
  - `src/lib/i18n.ts`
  - `src/lib/i18n.test.ts`
  - `src/App.tsx`
  - `src/App.css`
  - `src/tests/app.ui.test.tsx`
  - `.env.example`
  - `README.md`
  - `logics/backlog/item_016_post_submit_links_hub_routing_mode_and_fallback_contract.md`
  - `logics/backlog/item_017_destination_links_configuration_validation_and_rendering.md`
  - `logics/backlog/item_018_links_hub_bilingual_fr_en_contract_and_ui_copy_alignment.md`
  - `logics/backlog/item_019_links_hub_ui_accessibility_mobile_ux_and_regression_coverage.md`
  - `logics/tasks/task_005_super_orchestration_delivery_execution_for_item_016_to_item_019_with_validation_gates.md`

# References
- `src/App.tsx`
- `src/lib/config.ts`
- `src/hooks/useContactForm.ts`
- `src/tests/app.ui.test.tsx`
- `README.md`
- `logics/request/req_000_static_render_qr_landing_with_formsubmit_and_configurable_redirect.md`
