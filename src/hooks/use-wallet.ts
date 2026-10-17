import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWallet, fetchTransactions, claimRefill } from "@/lib/services/wallet";
import { useAuthStore } from "@/stores/auth-store";
import { toast } from "@/stores/toast-store";
import { parseApiError } from "@/lib/errors";

export function useWallet() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ["wallet"],
    queryFn: fetchWallet,
    enabled: isAuthenticated,
  });
}

export function useTransactions() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ["wallet", "transactions"],
    queryFn: fetchTransactions,
    enabled: isAuthenticated,
  });
}

export function useClaimRefill() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: claimRefill,
    onSuccess: (data) => {
      toast("success", `+${data.refilled_amount} tokens refilled!`);
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
      queryClient.invalidateQueries({ queryKey: ["me", "summary"] });
    },
    onError: (err) => {
      toast("error", parseApiError(err, "Refill not available yet."));
    },
  });
}
