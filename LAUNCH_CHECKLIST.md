# Manual launch checklist

## Truth and content

- [ ] Replace all `example.com`, placeholder email, and résumé values.
- [ ] Search the repository for `TODO`; verify or retain every unresolved item deliberately.
- [ ] Open each live demo and GitHub URL in a private window.
- [ ] Confirm demo/confirmed labels match the deployed reality.
- [ ] Proofread both Ukrainian and English routes.

## Functionality

- [ ] Submit the form through Telegram, SMTP, and the intended production route.
- [ ] Confirm honeypot, Zod errors, rate limits, error state, and thank-you redirect.
- [ ] Check home → each case study → contact → privacy → 404.
- [ ] Confirm language and theme persist after reload.
- [ ] Confirm the résumé downloads and all buttons have a real destination.

## Accessibility and responsive QA

- [ ] Complete keyboard-only navigation, including menu, theme, language, radio controls, and form.
- [ ] Test with a screen reader and verify heading order/landmarks.
- [ ] Verify focus visibility, AA contrast, 200% zoom, and reduced-motion mode.
- [ ] Test at 360, 768, 1024, 1440, and a wide desktop; confirm no horizontal overflow.

## Performance and platform

- [ ] Run the production build without console errors.
- [ ] Run Lighthouse mobile on the deployed URL; record Performance ≥90, Accessibility ≥95, Best Practices ≥95, SEO ≥95 or document remaining work.
- [ ] Self-host fonts if external font requests are not acceptable.
- [ ] Optimize final screenshots and reserve their dimensions.
- [ ] Confirm canonical URLs, Open Graph preview, JSON-LD, robots, sitemap, and static-route fallbacks.
- [ ] Set cache/security headers and verify no secrets appear in frontend bundles.

## Browser coverage

- [ ] Current Chrome, Firefox, Safari, and Edge.
- [ ] iOS Safari and Android Chrome on a real device.
- [ ] Run `npm test`, `npm run build`, and `npm run test:e2e` in CI.
