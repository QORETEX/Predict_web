"use client";

import Image from "next/image";
import { Coins, Flame, Trophy } from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";
import { useMeSummary } from "@/hooks/use-me";

interface StatCardProps {
  icon: React.ReactNode;
  iconBg: string;
  value: string;
  label: string;
}

function StatCard({ icon, iconBg, value, label }: StatCardProps) {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-muted/60 px-3.5 py-2.5">
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${iconBg}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-base font-bold leading-tight text-foreground">{value}</p>
        <p className="text-[11px] text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

const XP_PER_LEVEL = 500;

export function WelcomeBanner() {
  const user = useAuthStore((s) => s.user);
  const { data: summary } = useMeSummary();

  const firstName = user?.full_name?.split(" ")[0] ?? "there";
  const balance = summary?.balance ?? 0;
  const level = summary?.level ?? 1;
  const xp = summary?.xp ?? 0;
  const xpProgress = Math.min((xp / XP_PER_LEVEL) * 100, 100);

  return (
    <div className="relative overflow-hidden rounded-lg bg-card">
      <div className="absolute right-0 top-0 h-full w-1/2">
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-card via-card/80 to-transparent" />
      </div>

      <div className="relative z-10 p-6 lg:p-8">
        <div className="max-w-xl">
          <h2 className="text-2xl font-bold text-foreground lg:text-3xl">
            Welcome back,{" "}
            <span className="text-warning">{firstName}!</span>{" "}
            <span role="img" aria-label="wave">
              👋
            </span>
          </h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
            Predict, play, climb. Take on today&apos;s events, earn XP, climb
            the leaderboard and make your school proud.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <StatCard
              icon={<Coins className="h-4 w-4 text-yellow-400" />}
              iconBg="bg-yellow-400/15"
              value={balance.toLocaleString()}
              label="Tokens"
            />
            <StatCard
              icon={<Flame className="h-4 w-4 text-orange-400" />}
              iconBg="bg-orange-400/15"
              value={String(level)}
              label="Level"
            />
            <StatCard
              icon={<Trophy className="h-4 w-4 text-yellow-400" />}
              iconBg="bg-yellow-400/15"
              value={xp.toLocaleString()}
              label="XP"
            />
          </div>

          <div className="mt-5 max-w-md">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">Level {level} XP</span>
              <span className="text-muted-foreground">{xp} / {XP_PER_LEVEL} XP</span>
            </div>
            <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-warning transition-all"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
