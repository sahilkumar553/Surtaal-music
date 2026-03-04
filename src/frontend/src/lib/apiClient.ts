const DEFAULT_API_BASE_URL = "/api";

function normalizeBaseUrl(raw: string | undefined): string {
  if (!raw) return DEFAULT_API_BASE_URL;
  return raw.replace(/\/$/, "");
}

export const API_BASE_URL = normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL);

async function parseError(response: Response): Promise<string> {
  try {
    const text = await response.text();
    try {
      const data = JSON.parse(text);
      if (data && typeof data.message === "string" && data.message.trim()) {
        return data.message;
      }
    } catch {
      // not JSON
    }
    return text || `Request failed with status ${response.status}`;
  } catch {
    return `Request failed with status ${response.status}`;
  }
}

export async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });

  if (!response.ok) {
    const message = await parseError(response);
    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

type PollingOptions = {
  intervalMs?: number;
};

type PollingCallback<T> = (data: T) => void;

type PollingErrorCallback = (error: Error) => void;

export type Unsubscribe = () => void;

export function subscribeWithPolling<T>(
  fetcher: () => Promise<T>,
  onData: PollingCallback<T>,
  onError?: PollingErrorCallback,
  options?: PollingOptions,
): Unsubscribe {
  const intervalMs = options?.intervalMs ?? 30000;

  let stopped = false;

  const tick = async () => {
    try {
      const data = await fetcher();
      if (!stopped) {
        onData(data);
      }
    } catch (error) {
      if (!stopped && !(error instanceof DOMException && error.name === "AbortError")) {
        console.error(error);
        onError?.(error as Error);
      }
    }
  };

  void tick();
  const timer = setInterval(tick, intervalMs);

  return () => {
    stopped = true;
    clearInterval(timer);
  };
}
