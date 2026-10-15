import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { pinoHttp } from 'pino-http';
import { config } from './config.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { apiRouter } from './routes/index.js';

export function createApp() {
  const app = express();
  app.disable('x-powered-by');
  app.use(helmet());
  app.use(cors({ origin: config.corsOrigins }));
  app.use(express.json({ limit: '1mb' }));
  app.use(pinoHttp({ level: config.LOG_LEVEL }));
  app.use('/api/v1', apiRouter);
  app.use(notFoundHandler);
  app.use(errorHandler);
  return app;
}
