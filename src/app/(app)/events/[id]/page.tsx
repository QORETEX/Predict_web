"use client";

import { useState, useCallback, useMemo, Suspense } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Trophy,
  Users,
  TrendingUp,
  TrendingDown,
  Timer,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEventMarkets } from "@/hooks/use-websocket";
import { useEvent } from "@/hooks/use-events";
import type { MarketUpdate } from "@/lib/ws";
import type { OutcomeAPI } from "@/types";
import type { MarketOutcome } from "@/lib/ws";

const stakePresets = [50, 100, 200, 500];

function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-red-500">
      <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
      Live
    </span>
  );
}

function TeamAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1A2747] text-lg font-bold text-white">
      {initials}
    </div>
  );
}

function EventDetailContent() {
  const params = useParams();
  const id = params.id as string;
  const { data: event, isLoading, error } = useEvent(id);

  const [activeMarketId, setActiveMarketId] = useState<string | null>(null);
  const [selectedOutcomeId, setSelectedOutcomeId] = useState<number | null>(null);
  const [stake, setStake] = useState(100);
  const [pickPlaced, setPickPlaced] = useState(false);

  const [liveMarkets, setLiveMarkets] = useState<Map<string, MarketUpdate>>(new Map());
  const handleMarketUpdate = useCallback((data: MarketUpdate) => {
    setLiveMarkets((prev) => {
      const next = new Map(prev);
      next.set(data.market_id, data);
      return next;
    });
  }, []);
  useEventMarkets(id, handleMarketUpdate);

  const markets = useMemo(() => {
    if (!event?.markets) return [];
    return [...event.markets].sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
  }, [event?.markets]);

  const selectedMarket = useMemo(() => {
    const mid = activeMarketId ?? markets[0]?.id;
    return markets.find((m) => m.id === mid) ?? markets[0];
  }, [activeMarketId, markets]);

  type AnyOutcome = OutcomeAPI | MarketOutcome;
  const liveOutcomes = useMemo((): AnyOutcome[] => {
    if (!selectedMarket) return [];
    const live = liveMarkets.get(selectedMarket.id);
    return live?.outcomes ?? selectedMarket.outcomes ?? [];
  }, [selectedMarket, liveMarkets]);

  const selectedOutcome = liveOutcomes.find((o: AnyOutcome) => o.id === selectedOutcomeId);
  const potentialReturn = selectedOutcome
    ? (stake * selectedOutcome.multiplier_display).toFixed(2)
    : "0.00";

  const totalPool = useMemo(() => {
    return markets.reduce((sum, m) => {
      const live = liveMarkets.get(m.id);
      return sum + (live?.pool_total ?? m.pool_total ?? 0);
    }, 0);
  }, [markets, liveMarkets]);

  const topLiveOutcome = useMemo(() => {
    return Array.from(liveMarkets.values())
      .flatMap((m) => m.outcomes)
      .sort((a, b) => b.multiplier_display - a.multiplier_display)[0] ?? null;
  }, [liveMarkets]);

  const handlePlacePick = () => {
    setPickPlaced(true);
    setTimeout(() => {
      setPickPlaced(false);
      setSelectedOutcomeId(null);
      setStake(100);
    }, 3000);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-[#AAB5D0]" />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="space-y-4 py-10 text-center">
        <p className="text-sm text-[#AAB5D0]">Event not found</p>
        <Link href="/live" className="text-sm text-[#603BFF] hover:underline">
          Back to Live Events
        </Link>
      </div>
    );
  }

  const participants = event.participants ?? [];
  const home = participants.find((p) => p.code === "home") ?? participants[0];
  const away = participants.find((p) => p.code === "away") ?? participants[1];

  return (
    <div className="space-y-5">
      {/* Success notification */}
      {pickPlaced && (
        <div className="rounded-lg border border-[#22C55E]/40 bg-[#22C55E]/10 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#22C55E]">
              <span className="text-xl text-white">&#10003;</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#22C55E]">
                Pick placed successfully!
              </p>
              <p className="text-xs text-[#AAB5D0]">
                {stake} TKN on {selectedOutcome?.label} - Potential return: {potentialReturn} TKN
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Back Navigation */}
      <Link
        href="/live"
        className="inline-flex items-center gap-2 text-sm text-[#AAB5D0] transition-colors hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Events
      </Link>

      {/* Match Header Card */}
      <div className="rounded-lg bg-[#0F1A36] p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
              <Trophy className="h-4 w-4 text-[#FBBF24]" />
            </div>
            <span className="text-sm font-medium text-[#AAB5D0]">
              {event.sport.name}
            </span>
          </div>
          {event.status === "live" ? (
            <LiveBadge />
          ) : (
            <span className="inline-flex items-center rounded-full bg-[#AAB5D0]/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#AAB5D0]">
              {event.status}
            </span>
          )}
        </div>

        {/* Participants */}
        <div className="mt-6 flex items-center justify-center gap-6 sm:gap-10">
          {home && (
            <div className="flex flex-col items-center gap-2">
              <TeamAvatar name={home.name} />
              <span className="text-base font-semibold text-white">
                {home.name}
              </span>
            </div>
          )}

          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-medium text-[#AAB5D0]">vs</span>
            {event.status === "live" && (
              <div className="flex items-center gap-1.5">
                <Timer className="h-3.5 w-3.5 text-[#FBBF24]" />
                <span className="text-xs font-bold text-[#FBBF24]">LIVE</span>
              </div>
            )}
          </div>

          {away && (
            <div className="flex flex-col items-center gap-2">
              <TeamAvatar name={away.name} />
              <span className="text-base font-semibold text-white">
                {away.name}
              </span>
            </div>
          )}
        </div>

        {/* Match Info */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-xs text-[#AAB5D0]">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(event.starts_at).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Market Tabs */}
      {markets.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {markets.map((market) => (
            <button
              key={market.id}
              type="button"
              onClick={() => {
                setActiveMarketId(market.id);
                setSelectedOutcomeId(null);
              }}
              className={cn(
                "shrink-0 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                (activeMarketId ?? markets[0]?.id) === market.id
                  ? "bg-[#603BFF] text-white"
                  : "bg-[#0C1532] text-[#AAB5D0] hover:text-white"
              )}
            >
              {market.label}
            </button>
          ))}
        </div>
      )}

      {/* Outcomes Grid */}
      {selectedMarket && liveOutcomes.length > 0 && (
        <div className={cn(
          "grid gap-3",
          liveOutcomes.length <= 3 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2 sm:grid-cols-3"
        )}>
          {liveOutcomes.map((outcome) => {
            const isSelected = selectedOutcomeId === outcome.id;
            const changePct = outcome.change_pct ?? 0;
            const isUp = changePct > 0;
            const isDown = changePct < 0;
            return (
              <button
                key={outcome.id}
                type="button"
                onClick={() => setSelectedOutcomeId(isSelected ? null : outcome.id)}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-lg p-4 transition-all",
                  isSelected
                    ? "border border-[#603BFF] bg-[#603BFF] text-white"
                    : "bg-[#0F1A36] text-white hover:border hover:border-[#23315A]"
                )}
              >
                <span className="text-xs text-[#AAB5D0]">{outcome.code}</span>
                <span className="text-lg font-bold">{outcome.label ?? outcome.code}</span>
                <span className={cn(
                  "text-2xl font-bold",
                  isSelected ? "text-white" : "text-[#FBBF24]"
                )}>
                  {(outcome.multiplier_display ?? 0).toFixed(2)}
                </span>
                {changePct !== 0 && (
                  <span className={cn(
                    "flex items-center gap-0.5 text-xs font-medium",
                    isUp ? "text-[#22C55E]" : "text-red-400",
                  )}>
                    {isUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {isUp ? "+" : ""}{changePct.toFixed(1)}%
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Place Pick Section */}
      <div className="rounded-lg bg-[#0F1A36] p-5">
        <h3 className="text-sm font-semibold text-white">Place Your Pick</h3>
        <div className="mt-3 flex items-center gap-3">
          <div className="relative flex-1">
            <input
              type="number"
              value={stake}
              onChange={(e) => setStake(Math.max(0, Number(e.target.value)))}
              className="h-11 w-full rounded-lg border border-[#23315A] bg-[#0C1532] px-4 pr-14 text-sm font-medium text-white outline-none focus:border-[#603BFF]"
              placeholder="Stake amount"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-[#AAB5D0]">
              TKN
            </span>
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          {stakePresets.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setStake(preset)}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                stake === preset
                  ? "bg-[#603BFF] text-white"
                  : "bg-[#0C1532] text-[#AAB5D0] hover:text-white"
              )}
            >
              {preset}
            </button>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-[#AAB5D0]">Potential Return</p>
            <p className="text-lg font-bold text-white">
              {potentialReturn}{" "}
              <span className="text-xs font-normal text-[#AAB5D0]">TKN</span>
            </p>
          </div>
          <Button
            onClick={handlePlacePick}
            disabled={!selectedOutcomeId || stake <= 0 || pickPlaced}
            className="h-11 bg-[#22C55E] px-8 text-sm font-bold text-white hover:bg-[#1EAD52] disabled:opacity-40"
          >
            {pickPlaced ? "Pick Placed!" : "Place Pick"}
          </Button>
        </div>
      </div>

      {/* Pool Info sidebar */}
      <div className="rounded-lg bg-[#0F1A36] p-5">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
          <TrendingUp className="h-4 w-4 text-[#22C55E]" />
          Pool Info
        </h3>
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between rounded-lg bg-[#0C1532] px-4 py-3">
            <span className="text-xs text-[#AAB5D0]">Total Pool</span>
            <span className="text-sm font-bold text-white">
              {totalPool > 0 ? totalPool.toLocaleString() : "--"}{" "}
              <span className="text-xs font-normal text-[#AAB5D0]">TKN</span>
            </span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-[#0C1532] px-4 py-3">
            <span className="text-xs text-[#AAB5D0]">Markets</span>
            <span className="flex items-center gap-1.5 text-sm font-bold text-white">
              <Users className="h-3.5 w-3.5 text-[#AAB5D0]" />
              {markets.length}
            </span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-[#0C1532] px-4 py-3">
            <span className="text-xs text-[#AAB5D0]">Top Multiplier</span>
            {(() => {
              const top = topLiveOutcome ?? liveOutcomes.sort((a, b) => b.multiplier_display - a.multiplier_display)[0];
              if (!top) return <span className="text-xs text-[#AAB5D0]/40">--</span>;
              const isUp = top.change_pct > 0;
              const isDown = top.change_pct < 0;
              return (
                <span className={cn(
                  "flex items-center gap-1 text-sm font-bold",
                  isUp ? "text-[#22C55E]" : isDown ? "text-red-400" : "text-[#22C55E]",
                )}>
                  {top.multiplier_display.toFixed(2)}x
                  {top.change_pct !== 0 && (
                    isUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />
                  )}
                </span>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EventDetailPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-[#AAB5D0]" /></div>}>
      <EventDetailContent />
    </Suspense>
  );
}
