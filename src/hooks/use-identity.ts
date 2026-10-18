import { useQuery } from "@tanstack/react-query";
import { fetchIdentityStatus, fetchMetaMapConfig } from "@/lib/services/identity";
import { useAuthStore } from "@/stores/auth-store";

export function useIdentityStatus() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ["identity", "status"],
    queryFn: fetchIdentityStatus,
    enabled: isAuthenticated,
  });
}

export function useMetaMapConfig() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ["identity", "metamap-config"],
    queryFn: fetchMetaMapConfig,
    enabled: isAuthenticated,
  });
}
