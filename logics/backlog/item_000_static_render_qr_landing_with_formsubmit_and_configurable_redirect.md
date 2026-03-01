## item_000_static_render_qr_landing_with_formsubmit_and_configurable_redirect - Static Render QR Landing with FormSubmit and Configurable Redirect
> From version: 0.1.0
> Status: Done
> Understanding: 100%
> Confidence: 98%
> Progress: 100%
> Complexity: Medium
> Theme: Lead Capture
> Reminder: Update status/understanding/confidence/progress and linked task references when you edit this doc.

# Problem
- The project needs a production-ready scan-to-web flow where a QR code opens a mobile-first landing page.
- The page must collect required user identity fields and submit data without a custom backend.
- The project must remain reusable across campaigns, so branding/content/style and operational URLs must be configurable.
- Without a clear implementation backlog item, delivery risk is high (scope drift, missing acceptance checks, and configuration inconsistencies).

# Scope
- In:
  - bootstrap a Vite + React static app structure suitable for Render static hosting;
  - implement a mobile-first landing page with:
    - generated default logo asset;
    - configurable site name, header text, colors, and fonts from env-backed runtime config;
    - required fields (`email`, `firstName`, `lastName`) with client-side validation;
  - integrate FormSubmit endpoint flow with required hidden fields (`_next`, `_subject`, `_honey`, `_captcha`);
  - support same-tab redirect using configured destination URL after successful submit;
  - add initial QR generation workflow with PNG artifact in `public/qr/` targeting:
    - temporary URL: `https://github.com/AlexAgo83/scan-2-pass`;
    - final URL: Render production URL when available;
  - document public nature of frontend env config and setup instructions.
- Out:
  - custom backend/API/database development;
  - auth/account/session features;
  - CRM integrations beyond FormSubmit;
  - analytics/marketing automation integrations.

# Acceptance criteria
- AC1: The landing page is deployable as a static site on Render and loads correctly from a mobile QR scan flow.
- AC2: Page header shows logo, site name, and top text from configuration values, without hardcoded campaign content.
- AC3: Form contains required fields: email, first name, last name.
- AC4: Client-side validation blocks submission when required fields are empty or email format is invalid.
- AC5: Valid submission posts to FormSubmit endpoint with expected payload fields.
- AC6: Form submission includes configured hidden metadata (`_next`, `_subject`, honeypot, captcha behavior).
- AC7: After successful submission, user is redirected to configured destination URL.
- AC8: No custom backend/webservice is required for the end-to-end flow.
- AC9: QR code generation procedure supports:
  - temporary QR targeting `https://github.com/AlexAgo83/scan-2-pass` for initial setup;
  - final QR targeting the Render production URL when available.
- AC10: Configuration and README notes explicitly state that client-side env values are public.
- AC11: Theme colors and font settings provided through config are applied in UI.
- AC12: If a style variable is missing/invalid, the page uses stable defaults and remains readable.
- AC13: FormSubmit receiving address is configurable without code edits.
- AC14: QR code is generated as a PNG file under `public/qr/`.
- AC15: A default generated logo asset is present in the repository and used by default configuration.

# AC Traceability
- AC1, AC2, AC11, AC12, AC15 -> UI shell + theming + branding setup. Proof: app files and responsive checks.
- AC3, AC4 -> form structure and client validation layer. Proof: validation utilities/tests and manual smoke path.
- AC5, AC6, AC7, AC13 -> FormSubmit integration and submit flow. Proof: form payload mapping and config wiring.
- AC8, AC10 -> architecture/docs constraints (static + no backend + public env guidance). Proof: README/config docs.
- AC9, AC14 -> QR generation workflow and PNG artifact policy. Proof: script/docs + output location in `public/qr/`.

# Priority
- Impact: High (core product flow and data capture path).
- Urgency: High (project bootstrap blocker before implementation can continue).

# Notes
- Derived from `logics/request/req_000_static_render_qr_landing_with_formsubmit_and_configurable_redirect.md`.
- Delivery task: `logics/tasks/task_000_static_render_qr_landing_with_formsubmit_and_configurable_redirect.md`.
- Implemented artifacts:
  - `src/App.jsx`
  - `src/lib/config.js`
  - `src/lib/validation.js`
  - `.env.example`
  - `scripts/generate-qr.mjs`
  - `public/logo-default.svg`
  - `public/qr/scan-2-pass-temp.png`
  - `render.yaml`
- Validation summary:
  - `npm run -s lint` passed.
  - `npm run -s build` passed.
  - `npm run -s test` passed.
