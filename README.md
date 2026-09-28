# CallGuard Ghana — Landing Page

A responsive, installable landing page for CallGuard, built for Ghana. The public site presents the supplied product mockup and logo, the requested home-screen install message, feature overview, Defender and Pro pricing, and contact details.

> This repository contains the **public marketing site only**. Native iOS source, signing configuration, and backend credentials are maintained separately in the private `callguard-app` repository.

## Public site

GitHub Pages is configured to publish from the GitHub Actions workflow in `.github/workflows/deploy-pages.yml`. The expected site URL is <https://callguardhq.github.io/Callguardhq/> once the first deployment succeeds and Pages is enabled for this repository.

## Local preview

The site uses React, Vite, and TypeScript. With Node.js 22 and pnpm 10 installed, run:

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Check types and build the same static output used by Pages with:

```bash
pnpm check
pnpm build:pages
```

## Scope and integrations

The website is static and has no backend. The install CTA provides browser-specific Add to Home Screen guidance, and the service worker caches the site shell for offline access after the first successful visit. MTN MoMo pricing buttons are informational placeholders until payment processing is connected; they do not collect payment details.

## Contact

CallGuard Enterprise: [callguardhq@gmail.com](mailto:callguardhq@gmail.com)
