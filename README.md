# Gap Month

Gap Month is the MENTEC Foundation sanctuary platform. The repository is an npm
workspace monorepo managed with Turborepo:

```text
apps/
  web/       Existing React + Vite website and beneficiary/admin portal
  mobile/    Expo + React Native + Expo Router foundation
  backend/   Versioned Express + TypeScript API and Prisma schema
packages/
  shared-types/  Platform-neutral domain and API types
  validation/   Runtime-safe Zod input schemas
  api-client/   Small typed client for web and mobile
```

## Getting started

```bash
npm install
npm run dev:web
npm run dev:backend
npm run dev:mobile
```

The backend uses SQLite locally (`file:./dev.db`) and can be configured through
`apps/backend/.env`. Copy `.env.example` when you need to set CORS, port, or a
different Prisma-compatible database. Never commit credentials or environment
files.

Useful checks:

```bash
npm run build
npm run typecheck
npm run lint
npm test
```

The website migration preserves the existing pages, components, context, mock
data, CSS, and user flows under `apps/web`. The mobile and backend foundations
are intentionally explicit about what is not implemented yet: authentication,
identity verification, facial recognition, messaging persistence, and database
business workflows are planned, not simulated.
