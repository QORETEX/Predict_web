"use client";

import { useEffect, useRef } from "react";
import { connect, disconnect, subscribe } from "@/lib/ws";

export function useWebSocket(
  channel: string,
  messageType: string,
  handler: (data: Record<string, unknown>) => void,
) {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    connect(channel);
    const unsubscribe = subscribe(messageType, (data) => handlerRef.current(data));
    return () => {
      unsubscribe();
      disconnect();
    };
  }, [channel, messageType]);
}
