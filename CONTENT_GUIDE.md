# Content editing guide

## Identity and contact

Edit `src/config/site.ts` first. Replace `hello@example.com`, `https://example.com`, the résumé placeholder, and any social URLs. This file is the only source for personal/contact configuration.

## Projects

Each project has localized confirmed facts, responsibilities, flows, decisions, and verification evidence. A missing URL must stay `null`; do not insert `#` or a fake destination. Replace a `TODO` only after opening the deployed feature or repository and checking it directly.

Use `status: 'demo'` when a project or feature is conceptual, seeded, or not connected to live infrastructure. Use `status: 'confirmed'` only for behavior that can be reproduced.

For screenshots, add optimized AVIF/WebP files under `public/projects/<slug>/`, include intrinsic dimensions, write literal alt text, and replace the CSS mockups in `CaseStudy.tsx`.

## Locales

Keep `src/locales/uk.ts` and `src/locales/en.ts` structurally identical. TypeScript enforces the same keys. Translate meaning and client intent rather than word order.

## SEO

Update the canonical domain in `src/config/site.ts`, `public/robots.txt`, and `public/sitemap.xml`. Replace `public/og-default.svg` if a richer social image becomes available. Confirm every route title and description in a deployed build.

## Résumé

`public/resume-placeholder.html` is deliberately marked as incomplete. Replace it with a reviewed one-page PDF and update `resumeUrl` before launch.
