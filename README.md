# Jeffrey Danaher Property Management

Immersive, single-screen front end for Jeffrey Danaher Property Management in Essex, Vermont.

## Scripts

```bash
npm install
npm run dev
npm run lint
npm run build
```

## Notes

- Built with React, TypeScript, and Vite.
- Uses local optimized WebP photography and an MP4 background video.
- The estimate form currently falls back to a pre-filled email to `danaherjeff@yahoo.com`. Set `FORM_ENDPOINT` in `src/views/Contact.tsx` if a hosted form/webhook endpoint is provided later.
