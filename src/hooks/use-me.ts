import { useQuery } from "@tanstack/react-query";
import { fetchMeSummary } from "@/lib/services/me";
import { useAuthStore } from "@/stores/auth-store";

export function useMeSummary() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ["me", "summary"],
    queryFn: fetchMeSummary,
    enabled: isAuthenticated,
  });
}
