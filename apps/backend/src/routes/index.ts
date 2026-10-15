import { Router } from 'express';
import { healthRouter } from './health.js';

export const apiRouter = Router();

apiRouter.use('/health', healthRouter);

// Planned modules: auth, users, beneficiaries, applications, bookings,
// properties, support sessions, messages, verification, and administration.
