"use client";

import Link from "next/link";
import { ArrowRight, Coins, Flame, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth-store";
import { useMeSummary } from "@/hooks/use-me";

export default function WelcomePage() {
  const user = useAuthStore((s) => s.user);
  const { data: summary } = useMeSummary();
  const displayName = user?.username || user?.full_name?.split(" ")[0] || "there";
  const balance = summary?.balance ?? 0;
  const level = summary?.level ?? 1;

  return (
    <div>
      {/* Greeting */}
      <div className="text-center">
        <p className="text-sm font-medium tracking-wide text-[#603BFF]">
          WELCOME TO PREDICT
        </p>
        <h1 className="mt-2 text-2xl font-bold text-white">
          Hey {displayName}!
        </h1>
        <p className="mt-1.5 text-sm text-[#AAB5D0]">
          Your account is ready. Here&apos;s what you start with.
        </p>
      </div>

      {/* Stats row */}
      <div className="mt-7 flex gap-3">
        <div className="flex-1 rounded-xl bg-[#0C1532] p-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-400/10">
            <Coins className="h-4 w-4 text-yellow-400" />
          </div>
          <p className="mt-3 text-xl font-bold text-white">{balance}</p>
          <p className="text-xs text-[#AAB5D0]">Tokens</p>
        </div>
        <div className="flex-1 rounded-xl bg-[#0C1532] p-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-400/10">
            <Flame className="h-4 w-4 text-orange-400" />
          </div>
          <p className="mt-3 text-xl font-bold text-white">{level}</p>
          <p className="text-xs text-[#AAB5D0]">Level</p>
        </div>
        <div className="flex-1 rounded-xl bg-[#0C1532] p-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#603BFF]/10">
            <Target className="h-4 w-4 text-[#603BFF]" />
          </div>
          <p className="mt-3 text-xl font-bold text-white">0</p>
          <p className="text-xs text-[#AAB5D0]">Picks</p>
        </div>
      </div>

      {/* What to do next */}
      <div className="mt-7">
        <p className="mb-3 text-xs font-medium tracking-wide text-[#AAB5D0]/60">
          WHAT YOU CAN DO
        </p>
        <div className="space-y-2.5">
          {[
            { text: "Predict outcomes on live & upcoming events", color: "text-yellow-400" },
            { text: "Compete on school & national leaderboards", color: "text-[#603BFF]" },
            { text: "Earn XP, level up, unlock rewards", color: "text-orange-400" },
          ].map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-3 rounded-lg bg-[#0C1532] px-3.5 py-3"
            >
              <span className={`text-base ${item.color}`}>&#8226;</span>
              <span className="text-sm text-[#AAB5D0]">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-7 space-y-3">
        <Button className="h-12 w-full text-[15px]" asChild>
          <Link href="/dashboard">
            Go to Dashboard
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
