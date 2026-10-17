"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth-store";
import { getAccessToken, setTokens, fetchMe, clearTokens } from "@/lib/auth";
import type { AuthResponse } from "@/types";

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; path=/; max-age=0`;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((s) => s.setUser);
  const setLoading = useAuthStore((s) => s.setLoading);

  useEffect(() => {
    // Check if we just came back from OAuth (server set cookies)
    const authDataStr = getCookie("predict_auth_data");
    if (authDataStr) {
      try {
        const authData: AuthResponse = JSON.parse(authDataStr);
        setTokens(authData);
        setUser(authData.user);
      } catch {
        // Ignore malformed cookie
      }
      deleteCookie("predict_auth_data");
      return;
    }

    // Normal init — check for existing token
    const token = getAccessToken();
    if (!token) {
      setUser(null);
      return;
    }

    setLoading(true);
    fetchMe()
      .then((user) => setUser(user))
      .catch(() => {
        clearTokens();
        setUser(null);
      });
  }, [setUser, setLoading]);

  return <>{children}</>;
}
