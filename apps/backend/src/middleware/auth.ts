import type { RequestHandler } from 'express';

export const requireAuthentication: RequestHandler = (_request, response, next) => {
  response.status(501).json({
    error: {
      code: 'AUTH_NOT_CONFIGURED',
      message: 'Authentication is not enabled in this environment yet',
    },
  });
};
