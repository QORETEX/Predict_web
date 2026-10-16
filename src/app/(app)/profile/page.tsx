"use client";

import { useState } from "react";
import Image from "next/image";
import {
  User,
  Target,
  TrendingUp,
  Zap,
  Flame,
  Calendar,
  Trophy,
  Award,
  Star,
  Shield,
  Crosshair,
  GraduationCap,
  ChevronRight,
  Bell,
  Lock,
  Globe,
  Link2,
  Edit3,
  Clock,
  Users,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface PredictionRow {
  date: string;
  event: string;
  pick: string;
  result: "won" | "lost";
  xp: number;
}

interface Achievement {
  name: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  bgColor: string;
  earned: boolean;
}

interface ActivityItem {
  text: string;
  timestamp: string;
  Icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
}

/* ------------------------------------------------------------------ */
/*  Seed data                                                          */
/* ------------------------------------------------------------------ */

const predictions: PredictionRow[] = [
  { date: "Oct 14, 2026", event: "Man City vs Arsenal", pick: "Man City Win", result: "won", xp: 120 },
  { date: "Oct 12, 2026", event: "Lakers vs Celtics", pick: "Lakers +5.5", result: "won", xp: 95 },
  { date: "Oct 10, 2026", event: "Prempeh vs Opoku Ware", pick: "Prempeh College", result: "won", xp: 150 },
  { date: "Oct 8, 2026", event: "Nadal vs Djokovic", pick: "Djokovic in 3 Sets", result: "lost", xp: 0 },
  { date: "Oct 6, 2026", event: "Chelsea vs Liverpool", pick: "Over 2.5 Goals", result: "won", xp: 85 },
];

const achievements: Achievement[] = [
  { name: "First Pick", description: "Made your first prediction", Icon: Crosshair, iconColor: "text-yellow-400", bgColor: "bg-yellow-500/15", earned: true },
  { name: "Hot Streak", description: "Won 10 predictions in a row", Icon: Flame, iconColor: "text-orange-400", bgColor: "bg-orange-500/15", earned: true },
  { name: "NSMQ Scholar", description: "Predicted 25 NSMQ matches", Icon: GraduationCap, iconColor: "text-purple-400", bgColor: "bg-purple-500/15", earned: true },
  { name: "Sharpshooter", description: "Achieved 80% win rate", Icon: Target, iconColor: "text-green-400", bgColor: "bg-green-500/15", earned: true },
  { name: "Squad Leader", description: "Lead a squad of 20+", Icon: Users, iconColor: "text-blue-400", bgColor: "bg-blue-500/15", earned: false },
  { name: "Legend", description: "Reach Level 10", Icon: Crown, iconColor: "text-yellow-400", bgColor: "bg-yellow-500/15", earned: false },
];

const activityFeed: ActivityItem[] = [
  { text: "Won 450 tokens from Man City vs Arsenal", timestamp: "2 hours ago", Icon: Trophy, iconColor: "text-[#FBBF24]" },
  { text: "Joined The Dreamers squad", timestamp: "5 hours ago", Icon: Users, iconColor: "text-[#603BFF]" },
  { text: "Reached Level 3", timestamp: "1 day ago", Icon: Star, iconColor: "text-[#FBBF24]" },
  { text: "Earned Hot Streak badge", timestamp: "2 days ago", Icon: Flame, iconColor: "text-orange-400" },
  { text: "Won 200 tokens from Lakers vs Celtics", timestamp: "3 days ago", Icon: Trophy, iconColor: "text-[#FBBF24]" },
];

const settingsLinks = [
  { label: "Edit Profile", Icon: Edit3, iconColor: "text-[#603BFF]" },
  { label: "Notifications", Icon: Bell, iconColor: "text-[#FBBF24]" },
  { label: "Privacy", Icon: Lock, iconColor: "text-[#22C55E]" },
  { label: "Language", Icon: Globe, iconColor: "text-[#AAB5D0]" },
  { label: "Linked Accounts", Icon: Link2, iconColor: "text-[#F43F5E]" },
];

/* ------------------------------------------------------------------ */
/*  Crown icon (imported separately for the achievements)              */
/* ------------------------------------------------------------------ */

function Crown({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z" />
      <path d="M5 21h14" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ProfilePage() {
  const [activeSettingHover, setActiveSettingHover] = useState<string | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [privacyPublic, setPrivacyPublic] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-5">
      {/* ============================================================ */}
      {/*  Hero banner                                                  */}
      {/* ============================================================ */}
      <div className="relative overflow-hidden rounded-lg bg-[#0F1A36]">
        <div className="absolute right-0 top-0 h-full w-1/2">
          <Image src="/images/hero.jpg" alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1A36] via-[#0F1A36]/80 to-transparent" />
        </div>
        <div className="relative px-6 py-7 sm:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#FBBF24]/15">
              <User className="h-6 w-6 text-[#FBBF24]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white sm:text-3xl">Profile</h1>
              <p className="mt-1 text-sm text-[#AAB5D0]">Manage your account and preferences.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  Profile Card                                                 */}
      {/* ============================================================ */}
      <div className="rounded-lg bg-[#0F1A36] p-6">
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
          {/* Avatar */}
          <div className="relative">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-[#603BFF] text-3xl font-bold text-white ring-4 ring-[#603BFF]/30">
              KS
            </div>
            <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#FBBF24] text-xs font-bold text-[#070D25] ring-2 ring-[#0F1A36]">
              3
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-white">Kwame Star</h2>
                <p className="text-sm text-[#AAB5D0]">@kwamestar</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FBBF24]/15 px-3 py-1 text-xs font-semibold text-[#FBBF24]">
                  <Star className="h-3 w-3" />
                  Level 3
                </span>
                <Button
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  className={cn(isEditing && "bg-[#5030E0]")}
                >
                  <Edit3 className="mr-1.5 h-3.5 w-3.5" />
                  {isEditing ? "Save Profile" : "Edit Profile"}
                </Button>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-[#AAB5D0] sm:justify-start">
              <Calendar className="h-3.5 w-3.5" />
              Joined September 2026
            </div>

            <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#AAB5D0]">
              Passionate sports predictor and NSMQ enthusiast. Building my streak one pick at a time.
              Always backing the underdogs.
            </p>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  Stats Overview                                               */}
      {/* ============================================================ */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="flex items-center gap-3 rounded-lg bg-[#0F1A36] px-4 py-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#603BFF]/15">
            <Target className="h-5 w-5 text-[#603BFF]" />
          </div>
          <div>
            <p className="text-xs text-[#AAB5D0]">Total Picks</p>
            <p className="text-lg font-bold text-white">156</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg bg-[#0F1A36] px-4 py-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#22C55E]/15">
            <TrendingUp className="h-5 w-5 text-[#22C55E]" />
          </div>
          <div>
            <p className="text-xs text-[#AAB5D0]">Win Rate</p>
            <p className="text-lg font-bold text-white">72%</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg bg-[#0F1A36] px-4 py-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FBBF24]/15">
            <Zap className="h-5 w-5 text-[#FBBF24]" />
          </div>
          <div>
            <p className="text-xs text-[#AAB5D0]">Total XP</p>
            <p className="text-lg font-bold text-white">2,480</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg bg-[#0F1A36] px-4 py-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500/15">
            <Flame className="h-5 w-5 text-orange-400" />
          </div>
          <div>
            <p className="text-xs text-[#AAB5D0]">Current Streak</p>
            <p className="text-lg font-bold text-white">12 days</p>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  Two-column layout                                            */}
      {/* ============================================================ */}
      <div className="grid gap-5 xl:grid-cols-[1fr_380px]">
        {/* Left column */}
        <div className="space-y-5">
          {/* Prediction History */}
          <div className="rounded-lg bg-[#0F1A36]">
            <div className="flex items-center justify-between border-b border-[#23315A]/40 px-5 py-4">
              <h2 className="flex items-center gap-2 text-base font-semibold text-white">
                <Clock className="h-4 w-4 text-[#FBBF24]" />
                Prediction History
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#23315A]/20">
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-[#AAB5D0]/60">Date</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-[#AAB5D0]/60">Event</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-[#AAB5D0]/60">Pick</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-[#AAB5D0]/60">Result</th>
                    <th className="px-4 py-2.5 text-right text-xs font-medium text-[#AAB5D0]/60">XP Earned</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#23315A]/10">
                  {predictions.map((row, idx) => (
                    <tr key={idx} className="transition-colors hover:bg-[#0C1532]/60">
                      <td className="px-4 py-3 text-sm text-[#AAB5D0]">{row.date}</td>
                      <td className="px-4 py-3 text-sm font-medium text-white">{row.event}</td>
                      <td className="px-4 py-3 text-sm text-[#AAB5D0]">{row.pick}</td>
                      <td className="px-4 py-3">
                        {row.result === "won" ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#22C55E]/15 px-2.5 py-0.5 text-xs font-semibold text-[#22C55E]">
                            <CheckCircle className="h-3 w-3" />
                            Won
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#F43F5E]/15 px-2.5 py-0.5 text-xs font-semibold text-[#F43F5E]">
                            <XCircle className="h-3 w-3" />
                            Lost
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right text-sm font-medium text-white">
                        {row.xp > 0 ? `+${row.xp}` : "--"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Achievements */}
          <div className="rounded-lg bg-[#0F1A36]">
            <div className="flex items-center justify-between border-b border-[#23315A]/40 px-5 py-4">
              <h2 className="flex items-center gap-2 text-base font-semibold text-white">
                <Award className="h-4 w-4 text-[#FBBF24]" />
                Achievements
              </h2>
              <span className="text-xs text-[#AAB5D0]">
                {achievements.filter((a) => a.earned).length}/{achievements.length} unlocked
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 p-5 sm:grid-cols-3">
              {achievements.map((badge, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-lg p-4 text-center transition-colors",
                    badge.earned
                      ? badge.bgColor
                      : "bg-[#0C1532] opacity-50"
                  )}
                >
                  <badge.Icon
                    className={cn(
                      "h-7 w-7",
                      badge.earned ? badge.iconColor : "text-[#AAB5D0]/40"
                    )}
                  />
                  <div>
                    <p className={cn(
                      "text-xs font-semibold",
                      badge.earned ? "text-white" : "text-[#AAB5D0]/60"
                    )}>
                      {badge.name}
                    </p>
                    <p className="mt-0.5 text-[10px] text-[#AAB5D0]/60">{badge.description}</p>
                  </div>
                  {badge.earned ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#22C55E]">
                      <CheckCircle className="h-3 w-3" />
                      Earned
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#AAB5D0]/40">
                      <Lock className="h-3 w-3" />
                      Locked
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column (380px) */}
        <div className="space-y-4">
          {/* Account Settings */}
          <div className="rounded-lg bg-[#0F1A36]">
            <div className="border-b border-[#23315A]/40 px-5 py-4">
              <h2 className="flex items-center gap-2 text-base font-semibold text-white">
                <Shield className="h-4 w-4 text-[#FBBF24]" />
                Account Settings
              </h2>
            </div>
            <div className="divide-y divide-[#23315A]/10">
              {settingsLinks.map((item) => {
                const isNotification = item.label === "Notifications";
                const isPrivacy = item.label === "Privacy";

                return (
                  <button
                    key={item.label}
                    type="button"
                    className={cn(
                      "flex w-full items-center gap-3 px-5 py-3.5 text-left transition-colors hover:bg-[#0C1532]/60",
                      activeSettingHover === item.label && "border-l-2 border-[#603BFF]"
                    )}
                    onMouseEnter={() => setActiveSettingHover(item.label)}
                    onMouseLeave={() => setActiveSettingHover(null)}
                    onClick={() => {
                      if (isNotification) setNotificationsEnabled(!notificationsEnabled);
                      if (isPrivacy) setPrivacyPublic(!privacyPublic);
                    }}
                  >
                    <item.Icon className={cn("h-4 w-4 shrink-0", item.iconColor)} />
                    <span className="flex-1 text-sm font-medium text-white">{item.label}</span>
                    {isNotification ? (
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                          notificationsEnabled
                            ? "bg-[#22C55E]/15 text-[#22C55E]"
                            : "bg-[#F43F5E]/15 text-[#F43F5E]"
                        )}
                      >
                        {notificationsEnabled ? "On" : "Off"}
                      </span>
                    ) : isPrivacy ? (
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                          privacyPublic
                            ? "bg-[#22C55E]/15 text-[#22C55E]"
                            : "bg-[#FBBF24]/15 text-[#FBBF24]"
                        )}
                      >
                        {privacyPublic ? "Public" : "Private"}
                      </span>
                    ) : (
                      <ChevronRight className="h-4 w-4 text-[#AAB5D0]/40" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Activity */}
          <div className="rounded-lg bg-[#0F1A36]">
            <div className="border-b border-[#23315A]/40 px-5 py-4">
              <h2 className="flex items-center gap-2 text-base font-semibold text-white">
                <Zap className="h-4 w-4 text-[#FBBF24]" />
                Activity
              </h2>
            </div>
            <div className="divide-y divide-[#23315A]/10">
              {activityFeed.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 px-5 py-3.5">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0C1532]">
                    <item.Icon className={cn("h-4 w-4", item.iconColor)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white">{item.text}</p>
                    <p className="mt-0.5 text-xs text-[#AAB5D0]/60">{item.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
