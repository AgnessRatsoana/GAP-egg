import type { HealthStatus } from '@gap-month/shared-types';

export interface ApiClientOptions {
  baseUrl: string;
  fetcher?: typeof fetch;
}

export function createApiClient({ baseUrl, fetcher = fetch }: ApiClientOptions) {
  const request = async <T>(path: string, init?: RequestInit): Promise<T> => {
    const response = await fetcher(`${baseUrl.replace(/\/$/, '')}${path}`, {
      ...init,
      headers: { 'Content-Type': 'application/json', ...init?.headers },
    });
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    return response.json() as Promise<T>;
  };

  return {
    health: () => request<HealthStatus>('/api/v1/health'),
  };
}
