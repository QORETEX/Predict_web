"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronRight,
  Info,
  Star,
  TrendingUp,
  TrendingDown,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLiveFeed } from "@/hooks/use-websocket";
import { useLiveEvents, useScheduledEvents } from "@/hooks/use-events";
import { useSports } from "@/hooks/use-competitions";
import type { MarketUpdate } from "@/lib/ws";
import type { EventListItem } from "@/types";

type MainTab = "live" | "upcoming";

function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-red-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-red-500">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
      Live
    </span>
  );
}

function OddsCell({
  label,
  value,
  isSelected,
  onClick,
}: {
  label: string;
  value: number;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full flex-col items-center gap-0.5 rounded-md border px-2 py-2 text-center transition-all",
        isSelected
          ? "border-[#603BFF] bg-[#603BFF] text-white"
          : "border-[#23315A] bg-[#0C1532] text-white hover:border-[#603BFF]/50",
      )}
    >
      <span className="text-[9px] font-medium uppercase text-[#AAB5D0]/60">{label}</span>
      <span className="text-sm font-semibold">{value.toFixed(2)}</span>
    </button>
  );
}

const TABLE_GRID = "grid-cols-[minmax(260px,1fr)_64px_64px_64px_90px_130px_100px_72px_36px]";

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

export function EventsPanel() {
  const [activeTab, setActiveTab] = useState<MainTab>("live");
  const [activeSport, setActiveSport] = useState<string>("all");
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());
  const [selectedOdds, setSelectedOdds] = useState<Set<string>>(new Set());
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set());

  const sportParam = activeSport === "all" ? undefined : activeSport;
  const liveQuery = useLiveEvents(sportParam);
  const scheduledQuery = useScheduledEvents(sportParam);
  const sportsQuery = useSports();

  const query = activeTab === "live" ? liveQuery : scheduledQuery;
  const events: EventListItem[] = useMemo(() => {
    return Array.isArray(query.data) ? query.data : [];
  }, [query.data]);

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

  function toggleOdd(key: string) {
    setSelectedOdds((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
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
    const fromApi = (sportsQuery.data ?? []).map((s) => ({ slug: s.slug, name: s.name }));
    return [...base, ...fromApi];
  }, [sportsQuery.data]);

  return (
    <div className="rounded-lg bg-[#0F1A36]">
      {/* Header row */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#23315A] px-4 py-3 sm:px-5">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setActiveTab("live")}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              activeTab === "live"
                ? "bg-red-500/15 text-red-500"
                : "text-[#AAB5D0] hover:text-white",
            )}
          >
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full bg-red-500",
                activeTab === "live" && "animate-pulse",
              )}
            />
            Live
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("upcoming")}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              activeTab === "upcoming"
                ? "bg-[#603BFF]/15 text-[#603BFF]"
                : "text-[#AAB5D0] hover:text-white",
            )}
          >
            Upcoming
          </button>
        </div>
      </div>

      {/* Sport filter pills */}
      <div className="border-b border-[#23315A] px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
          {sportFilters.map(({ slug, name }) => (
            <button
              key={slug}
              type="button"
              onClick={() => setActiveSport(slug)}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors",
                activeSport === slug
                  ? "bg-[#603BFF] text-white"
                  : "border border-[#23315A] bg-[#0C1532] text-[#AAB5D0] hover:border-[#603BFF]/40 hover:text-white",
              )}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <div className="min-w-[880px]">
          {/* Table header */}
          <div className="border-b border-[#23315A]/60 px-5 py-0.5">
            <div className={cn("grid items-center gap-x-3 py-3 text-[11px] font-medium uppercase tracking-wider text-[#AAB5D0]/60", TABLE_GRID)}>
              <span>Event / Competition</span>
              <span className="text-center">1</span>
              <span className="text-center">X</span>
              <span className="text-center">2</span>
              <span className="text-center">Pool</span>
              <span className="flex items-center justify-center gap-1">
                Live Multiplier
                <Info className="h-3 w-3" />
              </span>
              <span className="text-center">Est. Return</span>
              <span className="text-center">Actions</span>
              <span />
            </div>
          </div>

          {/* Loading / Empty / Groups */}
          {query.isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-5 w-5 animate-spin text-[#AAB5D0]" />
            </div>
          ) : events.length === 0 ? (
            <div className="py-12 text-center text-sm text-[#AAB5D0]/60">
              No {activeTab} events right now
            </div>
          ) : (
            <div className="divide-y divide-[#23315A]/40">
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
                        <ChevronRight className="h-4 w-4 shrink-0 text-[#AAB5D0]/60" />
                      ) : (
                        <ChevronDown className="h-4 w-4 shrink-0 text-[#AAB5D0]/60" />
                      )}
                      <span className="text-sm font-semibold text-white">{group.name}</span>
                      {group.events.some((e) => e.status === "live") && <LiveBadge />}
                      <span className="text-xs text-[#AAB5D0]/60">
                        {group.events.length} event{group.events.length !== 1 ? "s" : ""}
                      </span>
                    </button>

                    {/* Event rows */}
                    {!isCollapsed && (
                      <div className="divide-y divide-[#23315A]/30">
                        {group.events.map((event) => {
                          const rowKey = event.id;
                          const liveMarket = getLiveMarketForEvent(event.id);
                          const pm = event.primary_market;
                          const outcomes = liveMarket?.outcomes ?? pm?.outcomes ?? [];
                          const sorted = [...outcomes].sort((a, b) => b.multiplier_display - a.multiplier_display);
                          const topOutcome = sorted[0];

                          const odds = outcomes.length >= 3
                            ? { home: outcomes[0].multiplier_display, draw: outcomes[1].multiplier_display, away: outcomes[2].multiplier_display }
                            : outcomes.length >= 2
                              ? { home: outcomes[0].multiplier_display, draw: 0, away: outcomes[1].multiplier_display }
                              : { home: 0, draw: 0, away: 0 };
                          const pool = liveMarket?.pool_total ?? pm?.pool_total ?? 0;
                          const multiplierVal = topOutcome?.multiplier_display ?? 0;
                          const changePct = topOutcome?.change_pct ?? 0;
                          const isUp = changePct > 0;
                          const isDown = changePct < 0;

                          const startTime = new Date(event.starts_at);
                          const timeStr = startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

                          return (
                            <div
                              key={rowKey}
                              className={cn("group grid items-center gap-x-3 px-5 py-3.5 transition-colors hover:bg-[#0C1532]/60", TABLE_GRID)}
                            >
                              {/* Event info */}
                              <div className="flex items-center gap-3">
                                <span className="w-11 shrink-0 text-xs font-medium text-[#AAB5D0]">
                                  {timeStr}
                                </span>
                                {event.status === "live" && <LiveBadge />}
                                <Link href={`/events/${event.id}`} className="min-w-0 hover:underline">
                                  <p className="truncate text-sm font-medium text-white">
                                    {event.name}
                                  </p>
                                  <p className="truncate text-[11px] text-[#AAB5D0]/70">
                                    {event.sport.name}
                                  </p>
                                </Link>
                              </div>

                              {/* Odds cells */}
                              <OddsCell
                                label="1"
                                value={odds.home}
                                isSelected={selectedOdds.has(`${rowKey}-home`)}
                                onClick={() => toggleOdd(`${rowKey}-home`)}
                              />
                              <OddsCell
                                label="X"
                                value={odds.draw}
                                isSelected={selectedOdds.has(`${rowKey}-draw`)}
                                onClick={() => toggleOdd(`${rowKey}-draw`)}
                              />
                              <OddsCell
                                label="2"
                                value={odds.away}
                                isSelected={selectedOdds.has(`${rowKey}-away`)}
                                onClick={() => toggleOdd(`${rowKey}-away`)}
                              />

                              {/* Pool */}
                              <span className="text-center text-xs font-semibold text-white">
                                {pool > 0 ? pool.toLocaleString() : "--"}{" "}
                                <span className="text-[10px] font-normal text-[#AAB5D0]/60">TKN</span>
                              </span>

                              {/* Live Multiplier */}
                              <div className="flex items-center justify-center gap-1">
                                {multiplierVal > 0 ? (
                                  <>
                                    <span className={cn(
                                      "text-sm font-semibold",
                                      isUp ? "text-[#22C55E]" : isDown ? "text-red-400" : "text-[#AAB5D0]",
                                    )}>
                                      {multiplierVal.toFixed(2)}
                                    </span>
                                    {isUp ? (
                                      <TrendingUp className="h-3 w-3 text-[#22C55E]" />
                                    ) : isDown ? (
                                      <TrendingDown className="h-3 w-3 text-red-400" />
                                    ) : null}
                                    <span className={cn(
                                      "text-[10px] font-medium",
                                      isUp ? "text-[#22C55E]" : isDown ? "text-red-400" : "text-[#AAB5D0]",
                                    )}>
                                      {changePct > 0 ? "+" : ""}{changePct.toFixed(1)}%
                                    </span>
                                  </>
                                ) : (
                                  <span className="text-xs text-[#AAB5D0]/40">--</span>
                                )}
                              </div>

                              {/* Est. Return */}
                              <span className="text-center text-xs font-semibold text-white">
                                --
                              </span>

                              {/* Pick button */}
                              <div className="flex items-center justify-center">
                                <Button size="sm" className="h-7 px-4 text-xs">
                                  Pick
                                </Button>
                              </div>

                              {/* Bookmark */}
                              <button
                                type="button"
                                onClick={() => toggleBookmark(rowKey)}
                                className="flex items-center justify-center"
                              >
                                <Star
                                  className={cn(
                                    "h-4 w-4 transition-colors",
                                    bookmarked.has(rowKey)
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-[#AAB5D0]/40 hover:text-[#AAB5D0]",
                                  )}
                                />
                              </button>
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
  );
}
