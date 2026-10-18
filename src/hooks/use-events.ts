import { useQuery } from "@tanstack/react-query";
import {
  fetchEvents,
  fetchEvent,
  fetchTopMovers,
  fetchMarketHistory,
} from "@/lib/services/events";

export function useLiveEvents(sport?: string) {
  return useQuery({
    queryKey: ["events", "live", sport],
    queryFn: () => fetchEvents({ status: "live", sport }),
    refetchInterval: 30_000,
  });
}

export function useScheduledEvents(sport?: string) {
  return useQuery({
    queryKey: ["events", "scheduled", sport],
    queryFn: () => fetchEvents({ status: "scheduled", sport }),
  });
}

export function useAllEvents(sport?: string) {
  return useQuery({
    queryKey: ["events", "all", sport],
    queryFn: () => fetchEvents({ sport }),
  });
}

export function useEvent(id: string | undefined) {
  return useQuery({
    queryKey: ["event", id],
    queryFn: () => fetchEvent(id!),
    enabled: !!id,
  });
}

export function useTopMovers(sport?: string) {
  return useQuery({
    queryKey: ["top-movers", sport],
    queryFn: () => fetchTopMovers(sport),
    refetchInterval: 30_000,
  });
}

export function useMarketHistory(marketId: string | undefined, hours?: number) {
  return useQuery({
    queryKey: ["market-history", marketId, hours],
    queryFn: () => fetchMarketHistory(marketId!, hours),
    enabled: !!marketId,
  });
}
