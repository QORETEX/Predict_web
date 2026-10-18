"use client";

import { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Info,
  Star,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  ChevronUp,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePickSlip } from "@/contexts/pick-slip-context";
import { useLiveFeed } from "@/hooks/use-websocket";
import { useLiveEvents } from "@/hooks/use-events";
import { useSports } from "@/hooks/use-competitions";
import type { MarketUpdate } from "@/lib/ws";
import type { EventListItem } from "@/types";

function LiveBadge({ size = "sm" }: { size?: "sm" | "md" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-red-500/15 font-bold uppercase tracking-wide text-red-500",
        size === "md"
          ? "px-3 py-1 text-xs"
          : "px-2 py-0.5 text-[10px]"
      )}
    >
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
      Live
    </span>
  );
}

function groupBySport(events: EventListItem[]) {
  const map = new Map<string, EventListItem[]>();
  for (const e of events) {
    const key = e.sport.name;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(e);
  }
  return Array.from(map.entries()).map(([name, items]) => ({
    name,
    events: items,
  }));
}

export default function LivePage() {
  const { openPickSlip } = usePickSlip();
  const [activeSport, setActiveSport] = useState<string>("all");
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set());

  const sportParam = activeSport === "all" ? undefined : activeSport;
  const { data: events = [], isLoading } = useLiveEvents(sportParam);
  const { data: sports = [] } = useSports();

  const groups = useMemo(() => groupBySport(events), [events]);

  const [liveData, setLiveData] = useState<Map<string, MarketUpdate>>(new Map());
  const handleLiveUpdate = useCallback((data: MarketUpdate) => {
    setLiveData((prev) => {
      const next = new Map(prev);
      next.set(data.market_id, data);
      return next;
    });
  }, []);
  useLiveFeed(handleLiveUpdate);

  function getLiveMarketForEvent(eventId: string) {
    return Array.from(liveData.values()).find(
      (m) => m.event_id === eventId && m.market_status === "open",
    );
  }

  function toggleGroup(id: string) {
    setCollapsedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleBookmark(key: string) {
    setBookmarked((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  const sportFilters = useMemo(() => {
    const base = [{ slug: "all", name: "All" }];
    const fromApi = sports.map((s) => ({ slug: s.slug, name: s.name }));
    return [...base, ...fromApi];
  }, [sports]);

  return (
    <div className="space-y-5">
      {/* Hero banner */}
      <div className="relative overflow-hidden rounded-lg bg-[#0F1A36]">
        <div className="absolute right-0 top-0 h-full w-1/2">
          <Image
            src="/images/hero.jpg"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1A36] via-[#0F1A36]/80 to-transparent" />
        </div>
        <div className="relative px-6 py-7 sm:px-8">
          <div className="flex items-center gap-3">
            <LiveBadge size="md" />
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              Live Events
            </h1>
          </div>
          <p className="mt-2 max-w-lg text-sm text-[#AAB5D0]">
            Real-time events. Live multipliers. Place your picks before the
            market locks.
          </p>
        </div>
      </div>

      {/* Sport filter pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {sportFilters.map(({ slug, name }) => (
          <button
            key={slug}
            type="button"
            onClick={() => setActiveSport(slug)}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors",
              activeSport === slug
                ? "bg-[#603BFF] text-white"
                : "border border-[#23315A] bg-[#0C1532] text-[#AAB5D0] hover:border-[#603BFF]/40 hover:text-white"
            )}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Events table */}
      <div className="rounded-lg bg-[#0F1A36]">
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            {/* Table header */}
            <div className="grid grid-cols-[minmax(280px,1fr)_140px_140px_120px_80px_80px] items-center gap-x-3 border-b border-[#23315A]/60 px-5 py-3 text-[11px] font-medium uppercase tracking-wider text-[#AAB5D0]/60">
              <span>Event / Competition</span>
              <span>Market</span>
              <span className="flex items-center gap-1">
                Live Multiplier
                <Info className="h-3 w-3" />
              </span>
              <span>Pool</span>
              <span>Time</span>
              <span>Actions</span>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-5 w-5 animate-spin text-[#AAB5D0]" />
              </div>
            ) : events.length === 0 ? (
              <div className="py-16 text-center text-sm text-[#AAB5D0]/60">
                No live events right now
              </div>
            ) : (
              <div className="divide-y divide-[#23315A]/30">
                {groups.map((group) => {
                  const isCollapsed = collapsedGroups.has(group.name);
                  return (
                    <div key={group.name}>
                      {/* Group header */}
                      <button
                        type="button"
                        onClick={() => toggleGroup(group.name)}
                        className="flex w-full items-center gap-3 border-l-[3px] border-l-[#603BFF] px-5 py-3 text-left transition-colors hover:bg-white/[0.02]"
                      >
                        {isCollapsed ? (
                          <ChevronDown className="h-4 w-4 shrink-0 text-[#AAB5D0]/60" />
                        ) : (
                          <ChevronUp className="h-4 w-4 shrink-0 text-[#AAB5D0]/60" />
                        )}
                        <span className="text-sm font-semibold text-white">
                          {group.name}
                        </span>
                        <LiveBadge />
                        <span className="ml-auto shrink-0 text-xs text-[#AAB5D0]/60">
                          {group.events.length} event{group.events.length !== 1 ? "s" : ""} live
                        </span>
                      </button>

                      {/* Event rows */}
                      {!isCollapsed && (
                        <div className="divide-y divide-[#23315A]/20">
                          {group.events.map((event) => {
                            const rowKey = event.id;
                            const liveMarket = getLiveMarketForEvent(event.id);
                            const pm = event.primary_market;
                            const outcomes = liveMarket?.outcomes ?? pm?.outcomes ?? [];
                            const sorted = [...outcomes].sort((a, b) => b.multiplier_display - a.multiplier_display);
                            const topOutcome = sorted[0];

                            const pool = liveMarket?.pool_total ?? pm?.pool_total ?? 0;
                            const multiplierVal = topOutcome?.multiplier_display ?? 0;
                            const changePct = topOutcome?.change_pct ?? 0;
                            const isUp = changePct > 0;
                            const isDown = changePct < 0;

                            const marketLabel = liveMarket?.market_label ?? pm?.label ?? "--";
                            const topOutcomeLabel = topOutcome?.label ?? topOutcome?.code ?? "--";

                            const startTime = new Date(event.starts_at);
                            const timeStr = startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

                            return (
                              <div
                                key={rowKey}
                                className="grid grid-cols-[minmax(280px,1fr)_140px_140px_120px_80px_80px] items-center gap-x-3 px-5 py-3.5 transition-colors hover:bg-[#0C1532]/60"
                              >
                                {/* Event info */}
                                <div className="flex items-center gap-3">
                                  <span className="w-11 shrink-0 text-center text-xs font-medium text-[#AAB5D0]">
                                    {timeStr}
                                  </span>
                                  <LiveBadge />
                                  <Link href={`/events/${event.id}`} className="min-w-0 hover:underline">
                                    <span className="truncate text-sm text-white">
                                      {event.name}
                                    </span>
                                  </Link>
                                </div>

                                {/* Market */}
                                <div>
                                  <p className="text-sm font-medium text-white">
                                    {marketLabel}
                                  </p>
                                  <p className="text-[11px] text-[#AAB5D0]/60">
                                    {topOutcomeLabel}
                                  </p>
                                </div>

                                {/* Live Multiplier */}
                                <div className="flex items-center gap-1.5">
                                  {multiplierVal > 0 ? (
                                    <>
                                      <span className="text-sm font-bold text-white">
                                        {multiplierVal.toFixed(2)}
                                      </span>
                                      {isUp ? (
                                        <TrendingUp className="h-3.5 w-3.5 text-[#22C55E]" />
                                      ) : isDown ? (
                                        <TrendingDown className="h-3.5 w-3.5 text-red-400" />
                                      ) : null}
                                      <span className={cn(
                                        "text-xs font-medium",
                                        isUp ? "text-[#22C55E]" : isDown ? "text-red-400" : "text-[#AAB5D0]",
                                      )}>
                                        {changePct > 0 ? "+" : ""}{changePct.toFixed(1)}%
                                      </span>
                                    </>
                                  ) : (
                                    <span className="text-xs text-[#AAB5D0]/40">--</span>
                                  )}
                                </div>

                                {/* Pool */}
                                <div>
                                  <p className="text-sm font-semibold text-white">
                                    {pool > 0 ? pool.toLocaleString() : "--"}{" "}
                                    <span className="text-[10px] font-normal text-[#AAB5D0]/60">
                                      TKN
                                    </span>
                                  </p>
                                </div>

                                {/* Time */}
                                <span className="text-sm font-medium text-[#AAB5D0]">
                                  {timeStr}
                                </span>

                                {/* Actions */}
                                <div className="flex items-center gap-2">
                                  <Button size="sm" className="h-7 px-4 text-xs">
                                    Pick
                                  </Button>
                                  <button
                                    type="button"
                                    onClick={() => toggleBookmark(rowKey)}
                                  >
                                    <Star
                                      className={cn(
                                        "h-4 w-4 transition-colors",
                                        bookmarked.has(rowKey)
                                          ? "fill-yellow-400 text-yellow-400"
                                          : "text-[#AAB5D0]/40 hover:text-[#AAB5D0]"
                                      )}
                                    />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
