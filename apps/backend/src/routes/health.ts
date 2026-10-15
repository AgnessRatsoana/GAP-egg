import { Router } from 'express';

export const healthRouter = Router();

healthRouter.get('/', (_request, response) => {
  const payload = {
    status: 'ok',
    service: 'gap-month-backend',
    version: '0.1.0',
    timestamp: new Date().toISOString(),
  };
  response.json(payload);
});
