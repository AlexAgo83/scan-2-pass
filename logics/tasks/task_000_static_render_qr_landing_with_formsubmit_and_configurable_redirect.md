## task_000_static_render_qr_landing_with_formsubmit_and_configurable_redirect - Static Render QR Landing with FormSubmit and Configurable Redirect
> From version: 0.1.0
> Status: Draft
> Understanding: 97%
> Confidence: 95%
> Progress: 0%
> Complexity: Medium
> Theme: Lead Capture
> Reminder: Update status/understanding/confidence/progress and dependencies/references when you edit this doc.

# Context
Derived from `logics/backlog/item_000_static_render_qr_landing_with_formsubmit_and_configurable_redirect.md`

Execution focus for this task:
- deliver a Vite + React static landing flow for Render;
- implement FormSubmit integration without backend;
- make branding/content/style configurable from env-backed frontend config;
- include generated default logo and QR workflow (temporary repo URL then final Render URL).

# Plan
- [ ] 1. Bootstrap Vite + React project skeleton and static hosting baseline (Render-compatible).
- [ ] 2. Add runtime config layer and `.env.example` contract for:
  - project/site metadata;
  - FormSubmit receiver/endpoint;
  - redirect URL;
  - theming (colors/fonts, optional Google Fonts URL).
- [ ] 3. Implement mobile-first landing UI with:
  - generated default logo;
  - configurable site name/header text;
  - accessible required fields (`email`, `firstName`, `lastName`).
- [ ] 4. Implement client-side validation and user feedback for required fields.
- [ ] 5. Integrate FormSubmit payload submission including hidden metadata fields.
- [ ] 6. Wire same-tab redirect behavior via configured `_next` URL.
- [ ] 7. Add QR generation workflow/documentation with PNG output in `public/qr/` targeting:
  - temporary repo URL (`https://github.com/AlexAgo83/scan-2-pass`);
  - final Render URL once available.
- [ ] 8. Update README/setup documentation, including explicit note that frontend env values are public.
- [ ] FINAL: Update related Logics docs

# AC Traceability
- AC1, AC8 -> Steps 1 and 8. Proof: static build/deploy docs + no-backend architecture.
- AC2, AC11, AC12, AC15 -> Steps 2 and 3. Proof: config wiring + UI theming/logo files.
- AC3, AC4 -> Steps 3 and 4. Proof: form markup/validation logic and checks.
- AC5, AC6, AC13 -> Step 5. Proof: FormSubmit endpoint/hidden fields and configurable receiver.
- AC7 -> Step 6. Proof: `_next` redirect wiring and submit flow.
- AC9, AC14 -> Step 7. Proof: QR generation procedure + PNG artifact path.
- AC10 -> Step 8. Proof: README/env documentation statements.

# Validation
- npm run -s lint
- npm run -s build
- npm run -s test
- python3 logics/skills/logics-doc-linter/scripts/logics_lint.py

# Definition of Done (DoD)
- [ ] Scope implemented and acceptance criteria covered.
- [ ] Validation commands executed and results captured.
- [ ] Linked request/backlog/task docs updated.
- [ ] Status is `Done` and progress is `100%`.

# Report
- Started from backlog item `item_000_static_render_qr_landing_with_formsubmit_and_configurable_redirect`.
- Populate this section with:
  - implemented files/modules;
  - validation command outputs;
  - AC-by-AC proof links.
