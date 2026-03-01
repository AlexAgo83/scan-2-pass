# Render Blueprint

## Service contract

- Platform: Render
- Service type: Static Site
- Root directory: repository root
- Build command: `npm ci && npm run build`
- Publish directory: `dist`
- SPA rewrite: `/* -> /index.html`

Repository-managed baseline is defined in [`render.yaml`](../render.yaml).

## Environment matrix

All `VITE_*` values are public at runtime. Never store secrets in frontend env.

Required:

- `VITE_SITE_NAME`
- `VITE_HEADER_TEXT`
- `VITE_REDIRECT_URL`
- `VITE_FORMSUBMIT_RECEIVER`

Recommended:

- `VITE_BRAND_LOGO_URL`
- `VITE_FORMSUBMIT_SUBJECT`
- `VITE_THEME_PRIMARY_COLOR`
- `VITE_THEME_BACKGROUND_COLOR`
- `VITE_THEME_TEXT_COLOR`
- `VITE_THEME_FONT_FAMILY`
- `VITE_THEME_HEADING_FONT_FAMILY`
- `VITE_THEME_FONT_URL`
- `VITE_HEADER_TEXT_FONT_SIZE`
- `VITE_HEADER_TEXT_FONT_WEIGHT`
- `VITE_HEADER_TEXT_FONT_STYLE`

Optional:

- `VITE_PROJECT_URL`
- `VITE_FORMSUBMIT_ENDPOINT` (if empty, composed from receiver)
- `VITE_FORMSUBMIT_CAPTCHA`

Use [`.env.example`](../.env.example) as the canonical key list.

## Pre-deploy checklist

1. Confirm Render service uses static runtime and publish path `dist`.
2. Confirm target branch and auto-deploy policy.
3. Verify environment values in Render dashboard:
   - FormSubmit receiver/endpoint values are correct.
   - Redirect URL points to intended destination.
   - Branding/theme values are valid.
4. Run local quality checks:
   - `npm run -s lint`
   - `npm run -s build`
   - `npm run -s test`
5. If QR target changed, regenerate QR artifact:
   - `npm run qr:generate -- --url <target-url> --output public/qr/<name>.png`

## Post-deploy checklist

1. Open production URL on mobile viewport (`390x844` and `360x800`).
2. Verify page branding and header typography.
3. Run form smoke test:
   - invalid email blocks submit;
   - valid payload submits to FormSubmit.
4. Verify redirect smoke test after valid submission.
5. Verify prefill behavior:
   - browser autofill enabled;
   - optional query/local storage prefill does not break validation.
6. Confirm no horizontal overflow in primary flow.

## Rollback baseline

1. In Render dashboard, redeploy previous successful build (or previous commit).
2. If failure is configuration-only, revert env values to last known-good set.
3. Re-run post-deploy smoke checklist.
4. Document incident root cause and fix in logics docs before next deploy.

