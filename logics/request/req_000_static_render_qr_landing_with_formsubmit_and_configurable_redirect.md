## req_000_static_render_qr_landing_with_formsubmit_and_configurable_redirect - Static Render QR Landing with FormSubmit and Configurable Redirect
> From version: 0.1.0
> Status: In Progress
> Understanding: 100%
> Confidence: 98%
> Complexity: Medium
> Theme: Lead Capture
> Reminder: Update status/understanding/confidence and references when you edit this doc.

# Needs
- Build a mobile-first static landing page hosted on Render and accessed through a QR code.
- Display a configurable logo and configurable top message so the project can be reused across different brands/campaigns.
- Generate a default project logo inside the repository to simplify initial setup.
- Expose configurable visual identity settings (site name, colors, and fonts) so each campaign can apply its own style without code edits.
- Collect user identity data with a form:
  - required: email, first name, last name;
  - optional: future additional fields.
- Validate required fields client-side before submission.
- Submit collected data without a custom backend by using FormSubmit.
- After successful submission, redirect the user to a configurable destination URL (for example an unlisted YouTube video).
- Generate and store the campaign QR code inside this repository once the production URL is known.

# Context
- The project must remain static-first for simple deployment/maintenance on Render.
- Frontend stack target is Vite + React.
- No dedicated backend API should be created for this flow.
- Form submission and collection will rely on FormSubmit.
- Configuration values are required to keep the project reusable and avoid hardcoded campaign-specific strings.
- Frontend environment variables are public at runtime; they can contain configuration, but not secrets.
- Repository URL to use as initial project reference: `https://github.com/AlexAgo83/scan-2-pass`.

# Objectives
- Provide a complete scan-to-form-to-redirect user flow with minimal operational overhead.
- Keep implementation portable so a new campaign can be configured mostly through environment variables.
- Ensure mobile usability as the primary experience (QR scan context).

# Scope
- In:
  - one static landing page optimized for mobile (implemented with Vite + React);
  - generated default logo asset stored in the project and used as initial branding;
  - configurable logo/text/site name/visual style/redirect settings through environment-based config;
  - FormSubmit integration for data capture;
  - client-side validation for required fields;
  - deterministic post-submit redirect;
  - QR code asset generation stored under `public/qr/`, with temporary target allowed before final Render URL is available.
- Out:
  - custom backend/API/database;
  - authentication/account system;
  - advanced CRM integration beyond FormSubmit forwarding.

# Locked execution decisions
- Decision 1: The delivery target is a static website hosted on Render.
- Decision 2: Implementation stack is Vite + React.
- Decision 3: Submission transport uses FormSubmit (`https://formsubmit.co/...`) instead of an in-house backend.
- Decision 4: Email, first name, and last name are mandatory fields for form submission.
- Decision 5: FormSubmit receiver address must be configurable.
- Decision 6: Redirect destination is configurable and not hardcoded.
- Decision 7: Post-submit redirect happens in the same tab using FormSubmit `_next`.
- Decision 8: Google Fonts usage is allowed for campaign typography.
- Decision 9: Initial campaign font target can be Montserrat via config.
- Decision 10: Config values are externally configurable, but treated as public client-side data.
- Decision 11: QR code artifact format is PNG and target folder is `public/qr/`.
- Decision 12: A default project logo is generated and versioned in-repo for immediate setup.
- Decision 13: Initial project reference URL is `https://github.com/AlexAgo83/scan-2-pass`.
- Decision 14: Temporary QR target may use the repository URL; final QR target must be the Render production URL.

# FormSubmit integration contract
- Use form `action` with FormSubmit endpoint bound to a dedicated receiving address.
- Include hidden fields:
  - `_next` for final redirect URL;
  - `_subject` for inbox readability;
  - `_honey` honeypot field for basic bot mitigation;
  - `_captcha` enabled unless explicitly disabled by campaign decision.
- Document FormSubmit first-time activation requirement (email confirmation on first submission).

# Config contract (initial target)
- `VITE_PROJECT_URL`: project URL shown in UI/docs (initial value: `https://github.com/AlexAgo83/scan-2-pass`).
- `VITE_SITE_NAME`: campaign/site display name used in the UI metadata/header.
- `VITE_BRAND_LOGO_URL`: logo source URL/path shown at top of page (initial default points to generated in-repo logo asset).
- `VITE_HEADER_TEXT`: main message displayed above the form.
- `VITE_REDIRECT_URL`: destination after successful form submission.
- `VITE_FORMSUBMIT_ENDPOINT`: FormSubmit endpoint (`https://formsubmit.co/<receiver>`).
- `VITE_FORMSUBMIT_RECEIVER`: receiving email address used to compose/validate endpoint setup (initial value: `a.agostini.fr@gmail.com`).
- `VITE_FORMSUBMIT_SUBJECT`: optional email subject for received submissions.
- `VITE_FORMSUBMIT_CAPTCHA`: `true` or `false`.
- `VITE_THEME_PRIMARY_COLOR`: primary brand color (buttons/accents).
- `VITE_THEME_BACKGROUND_COLOR`: page background color.
- `VITE_THEME_TEXT_COLOR`: default text color.
- `VITE_THEME_FONT_FAMILY`: primary font-family for page content.
- `VITE_THEME_HEADING_FONT_FAMILY`: optional heading font-family override.
- `VITE_THEME_FONT_URL`: optional Google Fonts CSS URL to load custom fonts.

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

# Non-functional requirements
- Mobile-first layout and readable controls at common phone sizes (`360x800`, `390x844`).
- Clear accessibility baseline: labels, focus visibility, and keyboard-usable form controls.
- Keep implementation lightweight and dependency-minimal.

# Definition of Ready (DoR)
- [x] Problem statement is explicit and user impact is clear.
- [x] Scope boundaries (in/out) are explicit.
- [x] Acceptance criteria are testable.
- [x] Dependencies and known risks are listed.

# Risks
- FormSubmit dependency/availability is external to the project.
- Public exposure of client configuration can be misunderstood as secret storage if not documented.
- Spam risk exists even with honeypot/captcha; campaign receiving inbox should be monitored.
- Redirect URL misconfiguration can break post-submit flow.
- Invalid color/font configuration can reduce readability if fallback rules are not enforced.

# Backlog
- Active item:
  - `logics/backlog/item_000_static_render_qr_landing_with_formsubmit_and_configurable_redirect.md`
- Optional future split:
  - `item_001_mobile_first_static_render_landing_bootstrap.md`
  - `item_002_config_contract_env_loading_and_runtime_safeguards.md`
  - `item_003_form_ui_validation_and_accessibility_baseline.md`
  - `item_004_formsubmit_integration_submission_metadata_and_redirect_flow.md`
  - `item_005_qr_code_generation_workflow_and_documentation.md`

# Tasks
- `logics/tasks/task_000_static_render_qr_landing_with_formsubmit_and_configurable_redirect.md`

# Implementation snapshot
- Implemented landing application: `src/App.jsx`, `src/App.css`, `src/index.css`.
- Implemented env/config and validation layers: `src/lib/config.js`, `src/lib/validation.js`.
- Added tests: `src/lib/config.test.js`, `src/lib/validation.test.js`.
- Added setup/runtime docs and env contract: `README.md`, `.env.example`.
- Added QR workflow and temp PNG artifact: `scripts/generate-qr.mjs`, `public/qr/scan-2-pass-temp.png`.
- Added default logo and deployment baseline: `public/logo-default.svg`, `render.yaml`.

# References
- `logics/instructions.md`
- `https://github.com/AlexAgo83/scan-2-pass`
