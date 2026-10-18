import { api } from "@/lib/api";
import type { School, Sport } from "@/types";

export function fetchSchools(): Promise<School[]> {
  return api<School[]>("/api/v1/competitions/schools/", { skipAuth: true });
}

export function fetchSports(): Promise<Sport[]> {
  return api<Sport[]>("/api/v1/competitions/sports/", { skipAuth: true });
}
