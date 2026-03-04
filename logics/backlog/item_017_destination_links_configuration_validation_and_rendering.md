## item_017_destination_links_configuration_validation_and_rendering - Destination links configuration validation and rendering
> From version: 1.0.2
> Status: Done
> Understanding: 100%
> Confidence: 97%
> Progress: 100%
> Complexity: Medium
> Theme: Engineering Quality
> Reminder: Update status/understanding/confidence/progress and linked task references when you edit this doc.

# Problem
- Destination links must now come from `VITE_DESTINATION_LINKS_JSON`, but parsing/validation/rendering contract is not implemented.
- Invalid JSON or malformed entries can break UX or create inconsistent routing without strict sanitization.

# Scope
- In:
  - add config parser for `VITE_DESTINATION_LINKS_JSON` in app runtime config;
  - validate entry schema:
    - `label.fr` and `label.en` as non-empty strings;
    - `url` as `http/https` only;
    - `order` as finite numeric value;
    - `enabled` as boolean;
  - ignore invalid entries safely without runtime crash;
  - sort valid enabled entries by ascending `order`;
  - document env contract with example and error-tolerant behavior.
- Out:
  - remote configuration management;
  - metadata expansion beyond `label`, `url`, `order`, `enabled`.

# Acceptance criteria
- AC1: `VITE_DESTINATION_LINKS_JSON` is parsed safely at runtime with no crash on malformed JSON.
- AC2: Only entries that fully satisfy schema and `enabled=true` are retained.
- AC3: Retained entries are sorted in ascending `order`.
- AC4: URL validation allows only `http` and `https` protocols.
- AC5: Docs (`README` and `.env.example` if relevant) include the new env variable contract and example.
- AC6: Unit tests cover malformed JSON, invalid entry filtering, and sort order behavior.
- AC7: Lint/typecheck/test/build pass after delivery.

# AC Traceability
- AC1, AC2, AC3, AC4 -> `src/lib/config.ts`, `src/lib/config.test.ts`.
- AC5 -> `README.md`, `.env.example`.
- AC6 -> `src/lib/config.test.ts`.
- AC7 -> CI/local validation commands.

# Priority
- Impact: High.
- Urgency: Medium.

# Notes
- Derived from `logics/request/req_008_post_submit_intermediate_links_hub_with_configurable_destinations.md`.
- Delivery task: `logics/tasks/task_005_super_orchestration_delivery_execution_for_item_016_to_item_019_with_validation_gates.md`.
- Implemented artifacts:
  - `src/lib/config.ts`
  - `src/lib/config.test.ts`
  - `.env.example`
  - `README.md`
