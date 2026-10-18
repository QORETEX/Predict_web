"use client";

import { useCallback, useState } from "react";
import { ArrowRight, TrendingUp, TrendingDown, Radio, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLiveFeed } from "@/hooks/use-websocket";
import { useTopMovers } from "@/hooks/use-events";
import type { MarketUpdate } from "@/lib/ws";

interface LiveItem {
  key: string;
  label: string;
  topOutcome: string;
  multiplier: number;
  changePct: number;
}

export function LiveOdds() {
  const { data: topMovers, isLoading } = useTopMovers();

  const [wsOverrides, setWsOverrides] = useState<Map<string, LiveItem>>(new Map());

  const handleUpdate = useCallback((data: MarketUpdate) => {
    if (data.market_status !== "open") return;
    const top = [...data.outcomes].sort(
      (a, b) => b.multiplier_display - a.multiplier_display,
    )[0];
    if (!top) return;

    setWsOverrides((prev) => {
      const next = new Map(prev);
      next.set(data.market_id, {
        key: data.market_id,
        label: data.market_label,
        topOutcome: top.label ?? top.code,
        multiplier: top.multiplier_display,
        changePct: top.change_pct,
      });
      return next;
    });
  }, []);

  useLiveFeed(handleUpdate);

  const apiItems: LiveItem[] = (topMovers ?? []).slice(0, 6).map((m) => ({
    key: `mover-${m.outcome_id}`,
    label: m.event_name,
    topOutcome: `${m.market_label} - ${m.outcome_label}`,
    multiplier: m.multiplier_display,
    changePct: m.change_pct,
  }));

  const wsItems = Array.from(wsOverrides.values()).slice(0, 6);
  const items = wsItems.length > 0 ? wsItems : apiItems;

  return (
    <div className="rounded-lg bg-[#0F1A36] p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-white">
            Live Multipliers
          </h3>
          <span className="flex items-center gap-1 rounded-full bg-red-500/15 px-1.5 py-0.5 text-[9px] font-bold uppercase text-red-500">
            <Radio className="h-2.5 w-2.5" />
            Live
          </span>
        </div>
        <button className="flex items-center gap-1 text-xs text-[#AAB5D0] transition-colors hover:text-white">
          View all
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>

      <div className="mt-3 space-y-2">
        {isLoading && items.length === 0 ? (
          <div className="flex items-center justify-center py-6">
            <Loader2 className="h-4 w-4 animate-spin text-[#AAB5D0]" />
          </div>
        ) : items.length === 0 ? (
          <div className="py-6 text-center text-xs text-[#AAB5D0]/60">
            No live markets right now
          </div>
        ) : (
          items.map((item) => {
            const isUp = item.changePct > 0;
            const isDown = item.changePct < 0;
            return (
              <div
                key={item.key}
                className="flex items-center gap-3 rounded-md bg-[#0C1532] px-3 py-2"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-white">
                    {item.label}
                  </p>
                  <p className="truncate text-[10px] text-[#AAB5D0]">
                    {item.topOutcome}
                  </p>
                </div>

                <span className="text-sm font-semibold text-white">
                  {item.multiplier.toFixed(2)}x
                </span>

                <span
                  className={cn(
                    "flex items-center gap-0.5 text-[11px] font-medium",
                    isUp && "text-[#22C55E]",
                    isDown && "text-red-400",
                    !isUp && !isDown && "text-[#AAB5D0]",
                  )}
                >
                  {isUp ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : isDown ? (
                    <TrendingDown className="h-3 w-3" />
                  ) : null}
                  {item.changePct > 0 ? "+" : ""}
                  {item.changePct.toFixed(1)}%
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
