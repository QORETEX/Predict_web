"use client";

import { Star, Zap, Frame, Award, ImageIcon, Shield, Crown } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const XP_BALANCE = 2480;
const NEXT_LEVEL_XP = 3000;
const CURRENT_LEVEL = 3;

const storeItems = [
  {
    name: "Avatar Frame",
    description: "Exclusive animated profile frame",
    cost: 500,
    icon: Frame,
  },
  {
    name: "Custom Badge",
    description: "Design your own profile badge",
    cost: 750,
    icon: Award,
  },
  {
    name: "Profile Banner",
    description: "Custom profile banner image",
    cost: 1000,
    icon: ImageIcon,
  },
  {
    name: "Streak Shield",
    description: "Protect your streak for one day",
    cost: 1200,
    icon: Shield,
  },
  {
    name: "Double XP",
    description: "Double XP for 24 hours",
    cost: 1500,
    icon: Zap,
  },
  {
    name: "Premium Badge",
    description: "Exclusive premium member badge",
    cost: 2000,
    icon: Crown,
  },
];

export default function XPStorePage() {
  const progressPercent = (XP_BALANCE / NEXT_LEVEL_XP) * 100;

  return (
    <div className="space-y-5">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-lg bg-[#0F1A36]">
        <div className="absolute right-0 top-0 h-full w-1/2">
          <Image src="/images/hero.jpg" alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1A36] via-[#0F1A36]/80 to-transparent" />
        </div>
        <div className="relative px-6 py-7 sm:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#FBBF24]/15">
              <Star className="h-6 w-6 text-[#FBBF24]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                XP Store
              </h1>
              <p className="mt-1 text-sm text-[#AAB5D0]">
                Spend XP on exclusive rewards and perks.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* XP Balance Card */}
      <div className="rounded-lg bg-[#0F1A36] p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-[#AAB5D0]">
              Your XP Balance
            </p>
            <div className="mt-1 flex items-center gap-2">
              <Zap className="h-6 w-6 text-[#FBBF24]" />
              <span className="text-3xl font-bold text-white">
                {XP_BALANCE.toLocaleString()} XP
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-[#AAB5D0]">
              Level {CURRENT_LEVEL}
            </p>
            <p className="mt-1 text-xs text-[#AAB5D0]">
              {XP_BALANCE.toLocaleString()} / {NEXT_LEVEL_XP.toLocaleString()}{" "}
              XP
            </p>
          </div>
        </div>
        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-[#0C1532]">
          <div
            className="h-full rounded-full bg-[#603BFF] transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Rewards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {storeItems.map((item) => {
          const Icon = item.icon;
          const canAfford = XP_BALANCE >= item.cost;

          return (
            <div
              key={item.name}
              className={cn(
                "group rounded-lg bg-[#0F1A36] p-5 transition-colors",
                "hover:border hover:border-[#23315A]"
              )}
            >
              <div className="flex items-center justify-center rounded-lg bg-[#0C1532] p-4">
                <Icon
                  className={cn(
                    "h-8 w-8",
                    canAfford ? "text-[#603BFF]" : "text-[#AAB5D0]"
                  )}
                />
              </div>
              <h3 className="mt-4 text-base font-semibold text-white">
                {item.name}
              </h3>
              <p className="mt-1 text-sm text-[#AAB5D0]">
                {item.description}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Zap className="h-4 w-4 text-[#FBBF24]" />
                  <span className="text-sm font-semibold text-[#FBBF24]">
                    {item.cost.toLocaleString()} XP
                  </span>
                </div>
                <Button size="sm">Redeem</Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
