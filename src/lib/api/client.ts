// Client-side: use /backend proxy to avoid CORS
// Server-side (API routes, build): hit the backend directly
const API_URL =
  typeof window === "undefined"
    ? process.env.API_URL!
    : "/backend";

type RequestOptions = {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
  signal?: AbortSignal;
  skipAuth?: boolean;
};

class ApiError extends Error {
  constructor(
    public status: number,
    public data: unknown,
  ) {
    super(`API error ${status}`);
    this.name = "ApiError";
  }
}

function getAuthHeaders(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function api<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, headers = {}, signal, skipAuth = false } = options;

  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(skipAuth ? {} : getAuthHeaders()),
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      signal,
    });
  } catch (err) {
    // Network error or CORS block — re-throw as-is so callers can distinguish
    throw err;
  }

  if (res.status === 401 && !skipAuth) {
    const { refreshAccessToken } = await import("@/lib/auth");
    const newToken = await refreshAccessToken();
    if (newToken) {
      const retryRes = await fetch(`${API_URL}${path}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${newToken}`,
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        signal,
      });

      if (!retryRes.ok) {
        const data = await retryRes.json().catch(() => null);
        throw new ApiError(retryRes.status, data);
      }
      if (retryRes.status === 204) return undefined as T;
      return retryRes.json();
    }

    if (typeof window !== "undefined") {
      const { clearTokens } = await import("@/lib/auth");
      clearTokens();
      window.location.href = "/login";
    }
  }

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new ApiError(res.status, data);
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

export { ApiError };
