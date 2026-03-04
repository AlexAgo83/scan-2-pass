# Scan 2 Pass

Mobile-first static landing page (Vite + React + TypeScript) designed for QR access, FormSubmit data capture, and configurable redirect.

[![License](https://img.shields.io/github/license/AlexAgo83/scan-2-pass)](LICENSE)
[![CI](https://github.com/AlexAgo83/scan-2-pass/actions/workflows/ci.yml/badge.svg)](https://github.com/AlexAgo83/scan-2-pass/actions/workflows/ci.yml)
[![Live Demo](https://img.shields.io/badge/live%20demo-Render-46E3B7?logo=render&logoColor=white)](https://scan-2-pass.onrender.com)
![Version](https://img.shields.io/badge/version-v1.1.0-4C8BF5)
![Vite](https://img.shields.io/badge/Vite-7.3.1-646CFF?logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react&logoColor=black)

<img width="652" height="619" alt="image" src="https://github.com/user-attachments/assets/ee24ff84-716b-4d8c-b0d9-9f8e85447536" />
<img width="721" height="711" alt="image" src="https://github.com/user-attachments/assets/8ca6be84-7457-4bf8-b823-c81c1897a6df" />

## Stack

- Vite + React + TypeScript
- Render static hosting
- FormSubmit (no custom backend)

## Setup

1. Install dependencies:
   - `npm install`
2. Create local env file:
   - `cp .env.example .env`
3. Start development server:
   - `npm run dev`

## Environment variables

All frontend env variables are public at runtime. Do not place secrets in `.env`.

- `VITE_PROJECT_URL`: project reference URL.
- `VITE_SITE_NAME`: site name shown on page.
- `VITE_BRAND_LOGO_URL`: logo path or URL (root-relative or `http/https` only).
- `VITE_FAVICON_URL`: favicon path or URL (`/favicon.svg` or `https://...`).
- `VITE_HEADER_TEXT`: header text fallback above the form.
- `VITE_HEADER_TEXT_EN`: header text shown when locale is English.
- `VITE_HEADER_TEXT_FR`: header text shown when locale is French.
- `VITE_HEADER_TEXT_FONT_SIZE`: header font size (`px`, `rem`, `em`, `vw`, or fallback default).
- `VITE_HEADER_TEXT_FONT_WEIGHT`: header font weight (`normal`, `bold`, or numeric `400-900`).
- `VITE_HEADER_TEXT_FONT_STYLE`: header font style (`normal`, `italic`, `oblique`).
- `VITE_REDIRECT_URL`: redirect URL after successful form submit.
- `VITE_FORMSUBMIT_RECEIVER`: receiver email. Required and validated in non-development runtimes.
- `VITE_FORMSUBMIT_ENDPOINT`: optional direct FormSubmit endpoint (`https://formsubmit.co/<email>`). If empty, endpoint is composed from receiver.
- `VITE_FORMSUBMIT_SUBJECT`: optional subject for submission email.
- `VITE_FORMSUBMIT_CAPTCHA`: `true` or `false`.
- `VITE_THEME_PRIMARY_COLOR`: primary accent color.
- `VITE_THEME_BACKGROUND_COLOR`: page background color.
- `VITE_THEME_TEXT_COLOR`: main text color.
- `VITE_THEME_FONT_FAMILY`: body font stack.
- `VITE_THEME_HEADING_FONT_FAMILY`: heading font stack.
- `VITE_THEME_FONT_URL`: optional Google Fonts stylesheet URL.

For hex values in `.env`, wrap them in quotes (example: `VITE_THEME_PRIMARY_COLOR=\"#5a6bff\"`) so `#` is not treated as a comment.

## FormSubmit note

On first live submission, FormSubmit sends an activation email to the receiver address. Confirm it once to enable delivery.
For production/staging deployments, always set a valid `VITE_FORMSUBMIT_RECEIVER` value explicitly.

## QR generation

Generate temporary QR (repository URL):

- `npm run qr:temp`

Generate custom QR:

- `npm run qr:generate -- --url https://your-target-url --output public/qr/scan-2-pass.png`

Generated QR files are saved as PNG under `public/qr/`.

## Prefill strategy

Field prefill priority is deterministic:

1. URL query params (`email`, `firstName`, `lastName`; snake_case aliases supported).
2. Last valid local storage values (`scan2pass_prefill_v1`).
3. Browser-native autofill (`autocomplete`) and manual input.

Users can always edit prefilled values before submission.
Stored prefill values use a 24-hour retention window, expired entries are purged when read, and values are cleared when a valid form submission is triggered.

## Submit resilience

- During valid submit, the CTA is disabled and a pending status is shown.
- If navigation does not complete after the submit timeout window, submit state is automatically restored and the user can retry.

## Language behavior

- Default UI language is English.
- If browser/device locale starts with `fr` (for example `fr-FR`, `fr-CA`), non-configurable UI text is shown in French.
- Environment-configured header text can be localized with `VITE_HEADER_TEXT_EN` and `VITE_HEADER_TEXT_FR` (with `VITE_HEADER_TEXT` as fallback).
- If locale detection is unavailable, UI falls back to English.

## Render deployment

`render.yaml` is included for static hosting:

- build command: `npm ci && npm run build`
- publish path: `dist`
- deployment blueprint and checklist: [`docs/render-blueprint.md`](docs/render-blueprint.md)

## Quality checks

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run test` (unit + UI)
- `npm run test:ci` (unit + UI + coverage report)
- `npm run test:e2e` (Playwright smoke tests)
- `npm run ci:local` (same sequence as GitHub CI: lint + typecheck + unit/UI coverage + build + E2E)

Before first E2E run on a new machine, install browsers once:

- `npx playwright install chromium`

To replay CI from a clean install:

- `npm ci && npm run ci:local`

For local E2E debugging, you can override server reuse behavior:

- `PLAYWRIGHT_REUSE_EXISTING_SERVER=true npm run test:e2e`
- `PLAYWRIGHT_REUSE_EXISTING_SERVER=false npm run test:e2e`

## Contributing

Contribution guidelines are available in [CONTRIBUTING.md](CONTRIBUTING.md).

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE).
