"use client";

import { useEffect, useRef, useCallback } from "react";
import { WSChannel, type MarketUpdate } from "@/lib/ws";

export function useLiveFeed(handler: (data: MarketUpdate) => void) {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    const channel = new WSChannel("/ws/live/");
    channel.connect();
    const unsub = channel.subscribe((data) => handlerRef.current(data));
    return () => {
      unsub();
      channel.disconnect();
    };
  }, []);
}

export function useEventMarkets(
  eventId: string | null | undefined,
  handler: (data: MarketUpdate) => void,
) {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    if (!eventId) return;
    const channel = new WSChannel(`/ws/events/${eventId}/`);
    channel.connect();
    const unsub = channel.subscribe((data) => handlerRef.current(data));
    return () => {
      unsub();
      channel.disconnect();
    };
  }, [eventId]);
}
