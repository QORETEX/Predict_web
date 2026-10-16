"use client";

import { useState } from "react";
import Image from "next/image";
import { Trophy, TrendingDown, Award, Zap, Flame, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WinModal } from "@/components/celebrations/win-modal";
import { LossModal } from "@/components/celebrations/loss-modal";
import { BadgeUnlockModal } from "@/components/celebrations/badge-unlock-modal";
import { LevelUpModal } from "@/components/celebrations/level-up-modal";
import { StreakModal } from "@/components/celebrations/streak-modal";

export default function CelebrationsDemoPage() {
  const [showWin, setShowWin] = useState(false);
  const [showLoss, setShowLoss] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showStreak, setShowStreak] = useState(false);

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
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#FBBF24]/15">
              <Sparkles className="h-6 w-6 text-[#FBBF24]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                Celebrations Demo
              </h1>
              <p className="mt-1 text-sm text-[#AAB5D0]">
                Preview all gamification modals and animations
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="rounded-lg bg-[#603BFF]/10 p-4">
        <p className="text-sm text-[#AAB5D0]">
          <span className="font-semibold text-[#603BFF]">Developer Note:</span>{" "}
          This page demonstrates all celebration modals. These will automatically
          trigger in the app when users win picks, unlock badges, level up, or
          maintain streaks.
        </p>
      </div>

      {/* Celebration cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {/* Win Modal */}
        <div className="rounded-lg bg-[#0F1A36] p-6">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#22C55E]/20">
            <Trophy className="h-8 w-8 text-[#22C55E]" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">Win Celebration</h3>
          <p className="mb-4 text-sm text-[#AAB5D0]">
            Shown when a user wins a prediction with confetti animation, win amount,
            and XP earned.
          </p>
          <Button
            onClick={() => setShowWin(true)}
            className="w-full bg-[#22C55E] hover:bg-[#16A34A]"
          >
            Preview Win
          </Button>
        </div>

        {/* Loss Modal */}
        <div className="rounded-lg bg-[#0F1A36] p-6">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20">
            <TrendingDown className="h-8 w-8 text-red-500" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">Loss Feedback</h3>
          <p className="mb-4 text-sm text-[#AAB5D0]">
            Encouraging feedback when a prediction doesn't win, with tips to improve.
          </p>
          <Button
            onClick={() => setShowLoss(true)}
            variant="outline"
            className="w-full border-[#23315A]"
          >
            Preview Loss
          </Button>
        </div>

        {/* Badge Unlock */}
        <div className="rounded-lg bg-[#0F1A36] p-6">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#8B5CF6]/20">
            <Award className="h-8 w-8 text-[#8B5CF6]" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">Badge Unlock</h3>
          <p className="mb-4 text-sm text-[#AAB5D0]">
            Epic reveal when earning a new achievement badge with rarity tiers.
          </p>
          <Button
            onClick={() => setShowBadge(true)}
            className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED]"
          >
            Preview Badge
          </Button>
        </div>

        {/* Level Up */}
        <div className="rounded-lg bg-[#0F1A36] p-6">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#603BFF]/20">
            <Zap className="h-8 w-8 text-[#603BFF]" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">Level Up</h3>
          <p className="mb-4 text-sm text-[#AAB5D0]">
            Exciting level up animation with rewards, bonuses, and new unlocks.
          </p>
          <Button
            onClick={() => setShowLevelUp(true)}
            className="w-full"
          >
            Preview Level Up
          </Button>
        </div>

        {/* Streak */}
        <div className="rounded-lg bg-[#0F1A36] p-6">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F59E0B]/20">
            <Flame className="h-8 w-8 text-[#F59E0B]" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">Streak Milestone</h3>
          <p className="mb-4 text-sm text-[#AAB5D0]">
            Celebrate daily login streaks with fire animation and multiplier bonuses.
          </p>
          <Button
            onClick={() => setShowStreak(true)}
            className="w-full bg-gradient-to-r from-[#F59E0B] to-[#EF4444] hover:from-[#EF4444] hover:to-[#DC2626]"
          >
            Preview Streak
          </Button>
        </div>

        {/* Integration Note */}
        <div className="rounded-lg border-2 border-dashed border-[#23315A] bg-[#0C1532] p-6">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#AAB5D0]/20">
            <Sparkles className="h-8 w-8 text-[#AAB5D0]" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">Auto-trigger</h3>
          <p className="text-sm text-[#AAB5D0]">
            These modals will automatically appear throughout the app when users
            complete actions. No manual triggers needed in production.
          </p>
        </div>
      </div>

      {/* Implementation notes */}
      <div className="rounded-lg bg-[#0F1A36] p-6">
        <h3 className="mb-4 text-lg font-semibold text-white">
          Implementation Notes
        </h3>
        <div className="space-y-3 text-sm text-[#AAB5D0]">
          <div className="flex gap-3">
            <span className="shrink-0 text-[#603BFF]">•</span>
            <p>
              <span className="font-semibold text-white">Win Modal:</span> Triggers
              when a pick is settled with a winning result. Shows confetti animation,
              total winnings, and XP earned.
            </p>
          </div>
          <div className="flex gap-3">
            <span className="shrink-0 text-[#603BFF]">•</span>
            <p>
              <span className="font-semibold text-white">Loss Modal:</span> Provides
              encouraging feedback with tips for improvement and quick access to
              stats.
            </p>
          </div>
          <div className="flex gap-3">
            <span className="shrink-0 text-[#603BFF]">•</span>
            <p>
              <span className="font-semibold text-white">Badge Unlock:</span>{" "}
              Celebrates achievement unlocks with rarity system (Common, Rare, Epic,
              Legendary) and sparkle effects.
            </p>
          </div>
          <div className="flex gap-3">
            <span className="shrink-0 text-[#603BFF]">•</span>
            <p>
              <span className="font-semibold text-white">Level Up:</span> Shows new
              level with starburst animation, bonus rewards, and feature unlocks.
            </p>
          </div>
          <div className="flex gap-3">
            <span className="shrink-0 text-[#603BFF]">•</span>
            <p>
              <span className="font-semibold text-white">Streak Modal:</span> Fires
              on consecutive daily logins with flame animation and escalating
              multipliers.
            </p>
          </div>
        </div>
      </div>

      {/* Modals */}
      <WinModal
        isOpen={showWin}
        onClose={() => setShowWin(false)}
        event="Man City vs Arsenal"
        stake={100}
        odds={1.72}
        winAmount={172}
        xpEarned={25}
      />

      <LossModal
        isOpen={showLoss}
        onClose={() => setShowLoss(false)}
        event="Liverpool vs Chelsea"
        stake={75}
        odds={2.1}
        yourPick="Liverpool to win"
        result="Chelsea won 2-1"
      />

      <BadgeUnlockModal
        isOpen={showBadge}
        onClose={() => setShowBadge(false)}
        badgeName="First Blood"
        badgeIcon={<Trophy className="h-12 w-12" />}
        badgeColor="text-[#8B5CF6]"
        description="Win your first prediction and prove you've got what it takes!"
        rarity="epic"
      />

      <LevelUpModal
        isOpen={showLevelUp}
        onClose={() => setShowLevelUp(false)}
        newLevel={15}
        rewards={{
          tokens: 250,
          xp: 10,
          unlocks: [
            "Custom avatar frames",
            "Squad challenges",
            "Advanced stats dashboard",
          ],
        }}
      />

      <StreakModal
        isOpen={showStreak}
        onClose={() => setShowStreak(false)}
        streakDays={7}
        bonusTokens={100}
        multiplier={1.5}
      />
    </div>
  );
}
