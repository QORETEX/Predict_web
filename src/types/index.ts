export type AgeTier = "free_play" | "full";

export interface User {
  id: string;
  phone_number: string | null;
  email: string | null;
  username: string | null;
  full_name: string;
  age_tier: string;
  is_identity_verified: boolean;
  has_verified_phone: boolean;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
  is_new_user: boolean;
  needs_phone_verification?: boolean;
}

export interface OtpChallengeResponse {
  challenge_id: string;
  channel: string;
  destination_masked: string;
  seconds_until_resend: number;
  debug_code?: string;
}

export type OtpPurpose = "signup" | "login" | "verify_phone" | "verify_email" | "password_reset";

export type EventStatus = "scheduled" | "live" | "finished" | "cancelled";
export type MarketType =
  | "winner"
  | "match_result_1x2"
  | "over_under"
  | "both_teams_to_score"
  | "double_chance"
  | "handicap"
  | "total_points"
  | "correct_score"
  | "next_goal"
  | "set_betting"
  | "custom";
export type MarketStatus = "open" | "locked" | "settled" | "void";

export interface Participant {
  id: number;
  name: string;
  code: string;
  display_order: number;
}

export interface OutcomeAPI {
  id: number;
  label: string;
  code: string;
  multiplier_display: number;
  change_pct: number;
  staked_total: number;
  is_indicative?: boolean;
  display_order?: number;
}

export interface MarketSummary {
  id: string;
  type: MarketType;
  label: string;
  status: MarketStatus;
  locks_at: string;
  pool_total: number;
  outcomes: OutcomeAPI[];
}

export interface Market {
  id: string;
  type: MarketType;
  label: string;
  line: string | null;
  status: MarketStatus;
  locks_at: string;
  display_order: number;
  settled_at: string | null;
  pool_total: number;
  outcomes: OutcomeAPI[];
}

export interface EventListItem {
  id: string;
  name: string;
  sport: Sport;
  status: EventStatus;
  starts_at: string;
  participants: Participant[];
  primary_market: MarketSummary | null;
}

export interface EventDetail {
  id: string;
  name: string;
  sport: Sport;
  status: EventStatus;
  starts_at: string;
  participants: Participant[];
  markets: Market[];
}

export interface TopMover {
  outcome_id: number;
  outcome_label: string;
  market_label: string;
  event_name: string;
  sport_slug: string;
  multiplier_display: number;
  change_pct: number;
}

export interface OutcomeHistory {
  outcome_id: number;
  outcome_label: string;
  outcome_code: string;
  points: { taken_at: string; multiplier: number; pool_total: number }[];
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

export type IdentityVerificationStatus =
  | "started"
  | "pending"
  | "verified"
  | "rejected"
  | "duplicate"
  | "failed";

export interface IdentityStatus {
  status: IdentityVerificationStatus;
  failure_reason: string;
  verified_at: string | null;
  age_tier: string;
  created_at: string;
  updated_at: string;
}

export interface MetaMapConfig {
  client_id: string;
  flow_id: string;
  metadata: Record<string, unknown>;
}

export interface School {
  id: number;
  name: string;
  short_name: string;
  region: string;
}

export interface Sport {
  id: number;
  name: string;
  slug: string;
  icon: string;
}
