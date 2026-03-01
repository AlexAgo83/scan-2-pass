## req_001_render_deployment_blueprint_and_reusable_setup_contract - Render deployment blueprint and reusable setup contract
> From version: 0.1.0
> Status: Done
> Understanding: 100%
> Confidence: 98%
> Complexity: Low
> Theme: Platform
> Reminder: Update status/understanding/confidence and references when you edit this doc.

# Needs
- Define a clear Render blueprint for this project so deployment can be repeated without trial-and-error.
- Standardize the minimal set of Render settings, environment variables, build/publish commands, and validation checks.
- Keep the blueprint reusable for future campaigns of the same static QR/form flow.

# Context
- The project is a static Vite + React application deployed on Render.
- A `render.yaml` exists, but a dedicated request is needed to formalize the deployment contract and operational checklist.
- The project relies on frontend runtime config (`VITE_*`) and FormSubmit integration.
- Frontend env values are public and must be treated as configuration only, never secrets.

# Objectives
- Produce an explicit deployment blueprint for Render (service type, build, publish, routing behavior).
- Define required and optional environment variables for staging/production.
- Define a pre-deploy and post-deploy verification checklist.
- Reduce deployment risk and onboarding time for future reuse.

# Scope
- In:
  - Render static service blueprint for this app;
  - configuration matrix (required/optional env vars);
  - release checklist (before deploy / after deploy);
  - rollback/basic incident response guidance for failed deploys.
- Out:
  - migration to a non-Render hosting provider;
  - backend service provisioning;
  - advanced monitoring/observability stack setup.

# Locked execution decisions
- Decision 1: Hosting target is Render static service.
- Decision 2: Deploy flow must remain compatible with repository-based CI deploy on Render.
- Decision 3: Build command baseline is `npm ci && npm run build`.
- Decision 4: Publish path baseline is `dist`.
- Decision 5: SPA fallback rewrite to `/index.html` is required.
- Decision 6: Deployment blueprint must include FormSubmit and redirect env configuration checks.

# Acceptance criteria
- AC1: A blueprint document (or equivalent request-derived artifact) defines the full Render static setup contract for this project.
- AC2: Required/optional env variable matrix is explicit, including defaults and environment-specific notes.
- AC3: Build command, publish directory, and SPA rewrite behavior are documented and aligned with repository config.
- AC4: Pre-deploy checklist includes at least:
  - lint/build/test validation;
  - `.env` contract verification;
  - QR target URL verification.
- AC5: Post-deploy checklist includes at least:
  - form submit smoke test;
  - redirect smoke test;
  - mobile viewport smoke test.
- AC6: A minimal rollback procedure is defined for broken deployments.
- AC7: Documentation explicitly reminds that frontend env values are public.
- AC8: Blueprint is reusable without changing code (configuration-only reuse path).

# Definition of Ready (DoR)
- [x] Problem statement is explicit and user impact is clear.
- [x] Scope boundaries (in/out) are explicit.
- [x] Acceptance criteria are testable.
- [x] Dependencies and known risks are listed.

# Risks
- Configuration drift between documented blueprint and actual Render dashboard settings.
- Env value mistakes can break form submission or redirect behavior in production.
- Missing post-deploy smoke checks can leave regressions undetected.

# Backlog
- To create from this request:
  - `item_001_render_blueprint_specification_and_env_matrix.md`
  - `item_002_render_deploy_checklist_and_operational_runbook.md`

- `logics/backlog/item_001_render_deployment_blueprint_and_reusable_setup_contract.md`

# Tasks
- `logics/tasks/task_001_super_orchestration_delivery_execution_for_item_001_to_item_004_with_validation_gates.md`

# Implementation snapshot
- `docs/render-blueprint.md`
- `render.yaml`
- `.env.example`
- `README.md`

# References
- `render.yaml`
- `.env.example`
- `README.md`
- `logics/request/req_000_static_render_qr_landing_with_formsubmit_and_configurable_redirect.md`
