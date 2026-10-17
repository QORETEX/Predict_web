"use client";

import Link from "next/link";
import { ArrowRight, Trophy, Star, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth-store";

export default function WelcomePage() {
  const user = useAuthStore((s) => s.user);
  const displayName = user?.full_name?.split(" ")[0] ?? "there";

  return (
    <div className="text-center">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#FBBF24]/15">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FBBF24]/25">
          <Trophy className="h-7 w-7 text-[#FBBF24]" />
        </div>
      </div>

      <h1 className="text-2xl font-bold text-white">Hey {displayName}, you&apos;re all set!</h1>
      <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-[#AAB5D0]">
        Welcome to Predict. Your account is ready — start making picks and
        climbing the leaderboard.
      </p>

      <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full border border-[#FBBF24]/20 bg-[#FBBF24]/10 px-4 py-2">
        <Zap className="h-4 w-4 text-[#FBBF24]" />
        <span className="text-sm font-semibold text-[#FBBF24]">+50 TKN</span>
        <span className="text-sm text-[#AAB5D0]">welcome bonus</span>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <div className="rounded-lg border border-[#23315A] bg-[#0C1532] px-3 py-4">
          <Trophy className="mx-auto mb-2 h-5 w-5 text-[#FBBF24]" />
          <p className="text-lg font-bold text-white">0</p>
          <p className="text-[11px] text-[#AAB5D0]">Predictions</p>
        </div>
        <div className="rounded-lg border border-[#23315A] bg-[#0C1532] px-3 py-4">
          <Star className="mx-auto mb-2 h-5 w-5 text-[#FBBF24]" />
          <p className="text-lg font-bold text-white">50</p>
          <p className="text-[11px] text-[#AAB5D0]">Tokens</p>
        </div>
        <div className="rounded-lg border border-[#23315A] bg-[#0C1532] px-3 py-4">
          <Users className="mx-auto mb-2 h-5 w-5 text-[#34D399]" />
          <p className="text-lg font-bold text-white">0</p>
          <p className="text-[11px] text-[#AAB5D0]">Squads</p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <Button className="h-11 w-full" asChild>
          <Link href="/dashboard">
            Start Predicting
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
        <Button variant="outline" className="h-11 w-full border-[#23315A]" asChild>
          <Link href="/live">
            Explore Events
          </Link>
        </Button>
      </div>
    </div>
  );
}
