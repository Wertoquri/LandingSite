# Kyrylo Poidiuk — portfolio

A bilingual, production-oriented portfolio for a full-stack JavaScript developer. It presents verified live links and screenshots for TaskFlow, ARCHGUARD, WebStore, and Nordline Studio while keeping demo work clearly labelled.

## Run locally

```bash
npm install
copy .env.example .env
npm run dev
```

The Vite site runs on `http://localhost:5173`; the Express contact API runs on `http://localhost:8787` and is proxied under `/api`.

```bash
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

## Content map

- `src/config/site.ts`: identity, email, social links, SEO defaults, services, process, and all project records.
- `src/locales/uk.ts` and `src/locales/en.ts`: all interface and marketing copy.
- `src/pages/CaseStudy.tsx`: shared case-study presentation for `/work/:slug`.
- `src/styles.css`: design tokens, themes, responsive rules, motion, and component styling.
- `server/contactHandler.ts`: shared Zod validation and Telegram/SMTP delivery.

Read [CONTENT_GUIDE.md](./CONTENT_GUIDE.md) before replacing placeholders.

## Environment variables

At least one delivery channel is required. Telegram uses `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`. Email uses `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_FROM_EMAIL`, and `CONTACT_TO_EMAIL`. The API also accepts TaskFlow-style fallback names: `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_SECURE`, `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_FROM`, and `EMAIL_TO`. Do not expose these with a `VITE_` prefix.

## Deployment

### Vercel

1. Import the repository and keep the Vite framework preset.
2. Add delivery environment variables for Production and Preview.
3. Deploy. `vercel.json` preserves client-side routes and `/api/contact.ts` supplies the serverless form endpoint.
4. Replace `example.com` in site config, `robots.txt`, and `sitemap.xml`.

### Render

1. Create a Blueprint from `render.yaml` for the contact API.
2. Add the secret delivery variables in the dashboard.
3. Deploy the static frontend separately with build command `npm ci && npm run build` and publish directory `dist`.
4. Point `/api` to the Render service using the static-site rewrite/proxy configuration, or set an explicit API origin in a same-origin gateway.

## Analytics

The small adapter in `src/lib/analytics.ts` emits `portfolio:analytics` browser events for `case_study_open`, `live_demo_click`, `github_click`, `contact_start`, and `contact_submit`. Connect that event to a privacy-compatible provider after consent requirements are defined; no third-party script ships by default.

## Asset and font sources

- UI icons: [Lucide](https://lucide.dev/), ISC license, installed through npm.
- Typography: Instrument Serif and DM Sans from Google Fonts, licensed under the SIL Open Font License. For stricter privacy/performance, self-host their WOFF2 files before launch.
- Project visuals: original screenshots captured from the verified production deployments.
- Favicon and Open Graph visual: original SVG assets in `public/`.

## Honest-content policy

No client names, revenue, conversion claims, testimonials, awards, employment, or years of experience are asserted. TaskFlow and ARCHGUARD are confirmed projects; WebStore and Nordline Studio are explicitly labelled demo content.

## Launch gate

Complete [LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md). Lighthouse scores are targets, not claims, until measured against the production deployment.
