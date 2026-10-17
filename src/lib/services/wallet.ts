import { api } from "@/lib/api";

export interface WalletSummary {
  balance: number;
  bonus_balance: number;
  change_7d: number;
  total_won: number;
  total_staked: number;
  total_purchased: number;
  can_refill: boolean;
  next_refill_at: string | null;
}

export interface Transaction {
  id: string;
  kind: string;
  label: string;
  amount: number;
  balance: number;
  memo: string;
  created_at: string;
}

export interface RefillResponse {
  balance: number;
  refilled_amount: number;
  next_refill_at: string;
}

export function fetchWallet(): Promise<WalletSummary> {
  return api<WalletSummary>("/api/v1/wallet/");
}

export function fetchTransactions(): Promise<Transaction[]> {
  return api<Transaction[]>("/api/v1/wallet/transactions/");
}

export function claimRefill(): Promise<RefillResponse> {
  return api<RefillResponse>("/api/v1/wallet/refill/claim/", { method: "POST" });
}
