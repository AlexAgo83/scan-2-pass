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
- `VITE_HEADER_TEXT`: header text above the form.
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

## FormSubmit note

On first live submission, FormSubmit sends an activation email to the receiver address. Confirm it once to enable delivery.

## QR generation

Generate temporary QR (repository URL):

- `npm run qr:temp`

Generate custom QR:

- `npm run qr:generate -- --url https://your-target-url --output public/qr/scan-2-pass.png`

Generated QR files are saved as PNG under `public/qr/`.

## Render deployment

`render.yaml` is included for static hosting:

- build command: `npm ci && npm run build`
- publish path: `dist`

## Quality checks

- `npm run lint`
- `npm run build`
- `npm run test`
