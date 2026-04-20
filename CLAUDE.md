# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start           # Dev server with HMR
npm run dist        # Production build → dist/
npm test            # Jest test suite
npm run lint        # Type check + ESLint
npm run lint:types  # tsc --noEmit only
npm run lint:eslint # ESLint only
npm run lint:format # Prettier format
```

Run a single test file: `npm test -- path/to/file.test.ts`

## Architecture

Single-page React app with no router — tab state is local `useState`. Two features live in `src/pages/Main/index.tsx`:

- **Create tab**: textarea → `QRCodeCanvas` (qrcode.react) renders live; download uses `canvas.toDataURL()` via a ref
- **Read tab**: `QrReader` (react-qr-reader) accesses the camera and calls `setValue` on scan result

**Build**: Custom esbuild script (`esbuild.js`) — not Vite/CRA. It generates `dist/index.html` from `public/index.html`, injects a content hash for cache busting, and defines `APP_ENV`, `APP_NAME`, `APP_VERSION` globals at build time.

**Styling**: Tailwind CSS 4 + DaisyUI 5. Class merging uses the local `mc()` utility (`src/styles/utils.ts`), not `clsx`/`cn`.

**Logging**: `Log('ModuleName')` from `src/core/log.ts` returns a context-aware logger. Logs are suppressed in production (`APP_ENV !== 'development'`).

**Path alias**: `@/*` resolves to `src/*` (configured in `tsconfig.json` and Jest module mapper).

**Conventions**: See `.claude/rules/typescript.md` and `.claude/rules/react.md` — arrow functions, no `null`, PascalCase constants, `FC<Props>` with `interface Props`.
