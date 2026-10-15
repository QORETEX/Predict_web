import { api } from "./api";
import type { User } from "@/types";

interface TokenPair {
  access: string;
  refresh: string;
}

export function setTokens(tokens: TokenPair) {
  localStorage.setItem("access_token", tokens.access);
  localStorage.setItem("refresh_token", tokens.refresh);
}

export function clearTokens() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

export function getAccessToken(): string | null {
  return localStorage.getItem("access_token");
}

export async function refreshAccessToken(): Promise<string | null> {
  const refresh = localStorage.getItem("refresh_token");
  if (!refresh) return null;

  try {
    const data = await api<TokenPair>("/auth/refresh/", {
      method: "POST",
      body: { refresh },
    });
    setTokens(data);
    return data.access;
  } catch {
    clearTokens();
    return null;
  }
}

export async function requestOtp(phone: string): Promise<void> {
  await api("/auth/otp/request/", { method: "POST", body: { phone } });
}

export async function verifyOtp(phone: string, code: string): Promise<{ tokens: TokenPair; user: User; isNewUser: boolean }> {
  return api("/auth/otp/verify/", { method: "POST", body: { phone, code } });
}
