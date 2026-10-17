import { ApiError } from "./api";

/**
 * Extract a human-readable error message from an API error response.
 *
 * The backend may return errors in several shapes:
 *   { "detail": "..." }
 *   { "error": { "detail": "..." } }
 *   { "error": { "detail": { "detail": "..." } } }
 *   { "error": { "code": "...", "detail": { "code": "...", "detail": "..." } } }
 *   { "non_field_errors": ["..."] }
 *   { "field_name": ["..."] }
 */
export function parseApiError(err: unknown, fallback = "Something went wrong. Please try again."): string {
  if (!(err instanceof ApiError)) {
    if (err instanceof TypeError) {
      return "Unable to reach the server. Please try again.";
    }
    return fallback;
  }

  if (!err.data) {
    return statusFallback(err.status, fallback);
  }

  const msg = extractFromBody(err.data);
  if (msg) return msg;

  return statusFallback(err.status, fallback);
}

function extractFromBody(data: unknown): string | null {
  if (typeof data !== "object" || data === null) return null;
  const obj = data as Record<string, unknown>;

  // Nested: { "error": { ... } }
  if (typeof obj.error === "object" && obj.error !== null) {
    const inner = obj.error as Record<string, unknown>;

    // { "error": { "detail": "string" } }
    if (typeof inner.detail === "string") return inner.detail;

    // { "error": { "detail": { "detail": "string" } } }
    if (typeof inner.detail === "object" && inner.detail !== null) {
      const nested = inner.detail as Record<string, unknown>;
      if (typeof nested.detail === "string") return nested.detail;
    }

    // { "error": { "message": "string" } }
    if (typeof inner.message === "string") return inner.message;
  }

  // Flat: { "detail": "string" }
  if (typeof obj.detail === "string") return obj.detail;

  // { "message": "string" }
  if (typeof obj.message === "string") return obj.message;

  // { "non_field_errors": ["..."] }
  if (Array.isArray(obj.non_field_errors) && obj.non_field_errors.length > 0) {
    return extractString(obj.non_field_errors[0]);
  }

  // Field-level errors — return the first one
  for (const key of Object.keys(obj)) {
    if (key === "error") continue;
    const val = obj[key];
    if (typeof val === "string") return val;
    if (Array.isArray(val) && val.length > 0) {
      return extractString(val[0]);
    }
  }

  return null;
}

function extractString(val: unknown): string {
  if (typeof val === "string") return val;
  if (typeof val === "object" && val !== null && "message" in val) {
    return (val as { message: string }).message;
  }
  return String(val);
}

function statusFallback(status: number, fallback: string): string {
  switch (status) {
    case 400: return "Invalid request. Please check your input.";
    case 401: return "Invalid credentials. Please try again.";
    case 403: return "You don't have permission to do this.";
    case 404: return "Account not found.";
    case 409: return "An account with this email or phone already exists.";
    case 429: return "Too many attempts. Please wait a moment and try again.";
    case 500:
    case 502:
    case 503: return "Server error. Please try again later.";
    default: return fallback;
  }
}
