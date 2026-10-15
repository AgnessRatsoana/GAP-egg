import { describe, expect, it } from 'vitest';
import { createApp } from './app.js';

describe('health endpoint', () => {
  it('reports service health without exposing configuration', async () => {
    const server = createApp().listen(0);
    const address = server.address();
    if (!address || typeof address === 'string') {
      server.close();
      throw new Error('Test server did not bind to a TCP port');
    }

    const response = await fetch(`http://127.0.0.1:${address.port}/api/v1/health`);
    const body = await response.json();
    server.close();

    expect(response.status).toBe(200);
    expect(body).toMatchObject({
      status: 'ok',
      service: 'gap-month-backend',
    });
    expect(body).not.toHaveProperty('databaseUrl');
  });
});
