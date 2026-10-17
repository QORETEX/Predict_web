import { api, ApiError } from "./api";
import type { AuthResponse, OtpChallengeResponse, OtpPurpose, User } from "@/types";

const TOKEN_COOKIE = "predict_access";

// ---------------------------------------------------------------------------
// Token storage — localStorage + cookie (so middleware can read it)
// ---------------------------------------------------------------------------

export function setTokens(tokens: { access: string; refresh: string }) {
  localStorage.setItem("access_token", tokens.access);
  localStorage.setItem("refresh_token", tokens.refresh);
  document.cookie = `${TOKEN_COOKIE}=${tokens.access}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
}

export function clearTokens() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  document.cookie = `${TOKEN_COOKIE}=; path=/; max-age=0`;
}

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("refresh_token");
}

// ---------------------------------------------------------------------------
// Token refresh
// ---------------------------------------------------------------------------

let refreshPromise: Promise<string | null> | null = null;

export async function refreshAccessToken(): Promise<string | null> {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    const refresh = getRefreshToken();
    if (!refresh) return null;

    try {
      const data = await api<{ access: string; refresh: string }>("/api/v1/auth/token/refresh/", {
        method: "POST",
        body: { refresh },
        skipAuth: true,
      });
      setTokens(data);
      return data.access;
    } catch {
      clearTokens();
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

// ---------------------------------------------------------------------------
// Auth endpoints — /api/v1/auth/
// ---------------------------------------------------------------------------

export async function register(data: {
  full_name: string;
  identifier: string;
  password: string;
  referred_by?: string;
}): Promise<OtpChallengeResponse> {
  return api<OtpChallengeResponse>("/api/v1/auth/register/", {
    method: "POST",
    body: data,
    skipAuth: true,
  });
}

export async function login(data: {
  identifier: string;
  password: string;
}): Promise<AuthResponse> {
  return api<AuthResponse>("/api/v1/auth/login/", {
    method: "POST",
    body: data,
    skipAuth: true,
  });
}

export async function logout(): Promise<void> {
  const refresh = getRefreshToken();
  if (refresh) {
    try {
      await api("/api/v1/auth/logout/", {
        method: "POST",
        body: { refresh },
      });
    } catch {
      // Best-effort
    }
  }
  clearTokens();
}

export async function requestOtp(data: {
  identifier: string;
  purpose: OtpPurpose;
}): Promise<OtpChallengeResponse> {
  return api<OtpChallengeResponse>("/api/v1/auth/otp/request/", {
    method: "POST",
    body: data,
    skipAuth: true,
  });
}

export async function verifyOtp(data: {
  identifier: string;
  code: string;
  purpose: OtpPurpose;
}): Promise<AuthResponse> {
  return api<AuthResponse>("/api/v1/auth/otp/verify/", {
    method: "POST",
    body: data,
    skipAuth: true,
  });
}

export async function passwordResetRequest(data: {
  identifier: string;
}): Promise<OtpChallengeResponse> {
  return api<OtpChallengeResponse>("/api/v1/auth/password/reset/request/", {
    method: "POST",
    body: data,
    skipAuth: true,
  });
}

export async function passwordResetConfirm(data: {
  identifier: string;
  code: string;
  new_password: string;
}): Promise<void> {
  await api("/api/v1/auth/password/reset/confirm/", {
    method: "POST",
    body: data,
    skipAuth: true,
  });
}

// ---------------------------------------------------------------------------
// Social auth — send provider token to backend
// ---------------------------------------------------------------------------

export async function googleAuth(idToken: string): Promise<AuthResponse> {
  return api<AuthResponse>("/api/v1/auth/google/", {
    method: "POST",
    body: { id_token: idToken },
    skipAuth: true,
  });
}

export async function appleAuth(identityToken: string, fullName?: string): Promise<AuthResponse> {
  return api<AuthResponse>("/api/v1/auth/apple/", {
    method: "POST",
    body: { identity_token: identityToken, full_name: fullName },
    skipAuth: true,
  });
}

// ---------------------------------------------------------------------------
// Fetch current user
// ---------------------------------------------------------------------------

export async function fetchMe(): Promise<User> {
  return api<User>("/api/v1/me/");
}

export { ApiError };
