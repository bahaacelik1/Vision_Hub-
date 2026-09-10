import type { VisionEvent, Opportunity, Profile, Paginated } from '@vision/types';

export interface VisionClientOptions {
  baseUrl: string;
  getToken?: () => string | null | Promise<string | null>;
}

export class VisionClient {
  constructor(private readonly opts: VisionClientOptions) {}

  private async request<T>(path: string, init: RequestInit = {}): Promise<T> {
    const token = await this.opts.getToken?.();
    const res = await fetch(`${this.opts.baseUrl}${path}`, {
      ...init,
      headers: {
        'content-type': 'application/json',
        ...(token ? { authorization: `Bearer ${token}` } : {}),
        ...init.headers,
      },
    });
    if (!res.ok) throw new Error(`Vision API ${res.status}: ${await res.text()}`);
    return res.json() as Promise<T>;
  }

  events = {
    list: (params?: { city?: string; category?: string; page?: number }) =>
      this.request<Paginated<VisionEvent>>(`/events?${new URLSearchParams(params as never)}`),
    get: (id: string) => this.request<VisionEvent>(`/events/${id}`),
  };

  opportunities = {
    list: (params?: { type?: string; page?: number }) =>
      this.request<Paginated<Opportunity>>(
        `/opportunities?${new URLSearchParams(params as never)}`,
      ),
  };

  profile = {
    me: () => this.request<Profile>('/profile/me'),
  };
}

export function createClient(opts: VisionClientOptions) {
  return new VisionClient(opts);
}
