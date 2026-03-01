# Scan 2 Pass

Mobile-first static landing page (Vite + React) designed for QR access, FormSubmit data capture, and configurable redirect.

## Stack

- Vite + React
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
- `VITE_BRAND_LOGO_URL`: logo path or URL.
- `VITE_FAVICON_URL`: favicon path or URL (`/favicon.svg` or `https://...`).
- `VITE_HEADER_TEXT`: header text above the form.
- `VITE_HEADER_TEXT_FONT_SIZE`: header font size (`px`, `rem`, `em`, `vw`, or fallback default).
- `VITE_HEADER_TEXT_FONT_WEIGHT`: header font weight (`normal`, `bold`, or numeric `400-900`).
- `VITE_HEADER_TEXT_FONT_STYLE`: header font style (`normal`, `italic`, `oblique`).
- `VITE_REDIRECT_URL`: redirect URL after successful form submit.
- `VITE_FORMSUBMIT_RECEIVER`: receiver email (default `a.agostini.fr@gmail.com`).
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

## Language behavior

- Default UI language is English.
- If browser/device locale starts with `fr` (for example `fr-FR`, `fr-CA`), non-configurable UI text is shown in French.
- Environment-configured text (for example `VITE_HEADER_TEXT`) is not overridden by locale detection.
- If locale detection is unavailable, UI falls back to English.

## Render deployment

`render.yaml` is included for static hosting:

- build command: `npm ci && npm run build`
- publish path: `dist`
- deployment blueprint and checklist: [`docs/render-blueprint.md`](docs/render-blueprint.md)

## Quality checks

- `npm run lint`
- `npm run build`
- `npm run test`
