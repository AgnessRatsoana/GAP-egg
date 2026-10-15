# Gap Month Backend

The backend is an Express API with TypeScript, Prisma, SQLite for local development,
and a versioned `/api/v1` surface. SQLite is used initially because it is zero-setup
for local development; the Prisma schema can move to PostgreSQL by changing the
provider and `DATABASE_URL` for hosted environments.

Implemented:

- `GET /api/v1/health`
- security headers, JSON body limits, configured CORS, request logging, and centralized errors
- environment validation and Prisma schema foundation

Planned modules:

- authentication and role-based authorization
- users and beneficiaries
- applications and bookings
- properties and support sessions
- messages, verification, and administration

Authentication and verification are intentionally not represented as working features
until their providers, persistence, and tests are implemented.
