import { api } from "@/lib/api";
import type { OtpChallengeResponse } from "@/types";

export interface MeSummary {
  balance: number;
  level: number;
  xp: number;
  unread_notifications: number;
  age_tier: string;
  has_verified_phone: boolean;
  onboarding: {
    phone: boolean;
    date_of_birth: boolean;
    identity: boolean;
    profile: boolean;
    interests: boolean;
    completed: boolean;
  };
}

export interface MePatchPayload {
  username?: string;
  full_name?: string;
  avatar_url?: string;
}

export interface ProfilePatchPayload {
  school_id?: number;
  class_year?: string;
  favourite_team?: string;
}

export function fetchMeSummary(): Promise<MeSummary> {
  return api<MeSummary>("/api/v1/me/summary/");
}

export function patchMe(data: MePatchPayload) {
  return api("/api/v1/me/", { method: "PATCH", body: data });
}

export function patchProfile(data: ProfilePatchPayload) {
  return api("/api/v1/me/profile/", { method: "PATCH", body: data });
}

export function addPhone(phone: string): Promise<OtpChallengeResponse> {
  return api<OtpChallengeResponse>("/api/v1/me/phone/", { method: "POST", body: { phone } });
}

export function setDateOfBirth(date_of_birth: string) {
  return api("/api/v1/me/date-of-birth/", { method: "POST", body: { date_of_birth } });
}

export function setInterests(sport_ids: number[]) {
  return api("/api/v1/me/interests/", { method: "PUT", body: { sport_ids } });
}

export function completeOnboarding() {
  return api("/api/v1/me/onboarding/complete/", { method: "POST" });
}
