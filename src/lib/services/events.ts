import { api } from "@/lib/api";
import type { EventListItem, EventDetail, TopMover, OutcomeHistory } from "@/types";

export interface EventListParams {
  status?: "scheduled" | "live" | "finished" | "cancelled";
  sport?: string;
}

export function fetchEvents(params?: EventListParams): Promise<EventListItem[]> {
  const qs = new URLSearchParams();
  if (params?.status) qs.set("status", params.status);
  if (params?.sport) qs.set("sport", params.sport);
  const query = qs.toString();
  return api<EventListItem[]>(`/api/v1/competitions/events/${query ? `?${query}` : ""}`, { skipAuth: true });
}

export function fetchEvent(id: string): Promise<EventDetail> {
  return api<EventDetail>(`/api/v1/competitions/events/${id}/`, { skipAuth: true });
}

export function fetchTopMovers(sport?: string): Promise<TopMover[]> {
  const qs = sport ? `?sport=${sport}` : "";
  return api<TopMover[]>(`/api/v1/markets/top-movers/${qs}`, { skipAuth: true });
}

export function fetchMarketHistory(marketId: string, hours?: number): Promise<OutcomeHistory[]> {
  const qs = hours ? `?hours=${hours}` : "";
  return api<OutcomeHistory[]>(`/api/v1/markets/${marketId}/history/${qs}`, { skipAuth: true });
}
