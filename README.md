# Jeffrey Danaher Property Management

Immersive, single-screen front end for Jeffrey Danaher Property Management in Essex, Vermont: home, services, work, about and contact views over a background video.

**Live:** https://jeffrey-danaher-property-mgmt.vercel.app

## Tech stack

- Vite 8 + React 19 + TypeScript, plain CSS (`src/styles.css`)
- Content in `src/data.ts`; navigation in `src/nav.ts`; one component per view in `src/views/`
- Local optimised WebP photography (sizes in `src/imageMeta.json`) and an MP4 background video
- Static build — no server code and no environment variables

## Local setup

Requires Node 20+.

```bash
npm install
npm run dev
npm run lint     # oxlint
npm run build    # type-check, then build to dist/
```

## Deploying

Hosted on Vercel with the stock Vite preset (`npm run build`, output `dist`). Pushes to `main` deploy to production.
