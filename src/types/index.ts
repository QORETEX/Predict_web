export type AgeTier = "free_play" | "full";

export interface User {
  id: string;
  phone: string;
  displayName: string;
  avatar: string | null;
  ageTier: AgeTier;
  level: number;
  title: string;
  balance: number;
  isVerified: boolean;
  createdAt: string;
}

export interface Event {
  id: string;
  title: string;
  category: "nsmq" | "football" | "basketball" | "custom";
  competition: string;
  startsAt: string;
  status: "upcoming" | "live" | "settled" | "cancelled";
  marketsCount: number;
  imageUrl: string | null;
}

export interface Market {
  id: string;
  eventId: string;
  question: string;
  status: "open" | "locked" | "settled" | "cancelled";
  locksAt: string;
  totalPool: number;
  rake: number;
  outcomes: Outcome[];
}

export interface Outcome {
  id: string;
  label: string;
  totalStaked: number;
  multiplier: number;
  isWinner: boolean | null;
}

export interface Pick {
  id: string;
  marketId: string;
  outcomeId: string;
  stake: number;
  estimatedReturn: number;
  finalReturn: number | null;
  status: "pending" | "won" | "lost" | "cancelled" | "refunded";
  createdAt: string;
}

export interface WalletTransaction {
  id: string;
  type: "stake" | "win" | "refill" | "refund" | "bonus" | "rake" | "purchase";
  amount: number;
  balanceAfter: number;
  description: string;
  createdAt: string;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  displayName: string;
  avatar: string | null;
  tokensWon: number;
  correctPicks: number;
}
