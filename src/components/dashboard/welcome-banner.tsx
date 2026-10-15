"use client";

import Image from "next/image";
import { Coins, Flame, Trophy } from "lucide-react";

interface StatCardProps {
  icon: React.ReactNode;
  iconBg: string;
  value: string;
  label: string;
}

function StatCard({ icon, iconBg, value, label }: StatCardProps) {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-[#070D25]/60 px-3.5 py-2.5">
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${iconBg}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-base font-bold leading-tight text-white">{value}</p>
        <p className="text-[11px] text-[#AAB5D0]">{label}</p>
      </div>
    </div>
  );
}

export function WelcomeBanner() {
  return (
    <div className="relative overflow-hidden rounded-lg bg-[#0F1A36]">
      {/* Background image — right half */}
      <div className="absolute right-0 top-0 h-full w-1/2">
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F1A36] via-[#0F1A36]/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 lg:p-8">
        <div className="max-w-xl">
          {/* Heading */}
          <h2 className="text-2xl font-bold text-white lg:text-3xl">
            Welcome back,{" "}
            <span className="text-[#603BFF]">Kwame!</span>{" "}
            <span role="img" aria-label="wave">
              👋
            </span>
          </h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-[#AAB5D0]">
            Predict, play, climb. Take on today&apos;s events, earn XP, climb
            the leaderboard and make your school proud.
          </p>

          {/* Stat cards */}
          <div className="mt-5 flex flex-wrap gap-3">
            <StatCard
              icon={<Coins className="h-4 w-4 text-yellow-400" />}
              iconBg="bg-yellow-400/15"
              value="1,250"
              label="Tokens"
            />
            <StatCard
              icon={<Flame className="h-4 w-4 text-orange-400" />}
              iconBg="bg-orange-400/15"
              value="12"
              label="Day streak"
            />
            <StatCard
              icon={<Trophy className="h-4 w-4 text-yellow-400" />}
              iconBg="bg-yellow-400/15"
              value="842"
              label="Leaderboard Rank"
            />
          </div>

          {/* XP progress bar */}
          <div className="mt-5 max-w-md">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-white">Level 3 XP</span>
              <span className="text-[#AAB5D0]">320 / 500 XP</span>
            </div>
            <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-[#070D25]">
              <div
                className="h-full rounded-full bg-[#603BFF] transition-all"
                style={{ width: `${(320 / 500) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
