"use client";

import Link from "next/link";
import {
  GraduationCap,
  Goal,
  Users,
  Medal,
  Ticket,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickNavItem {
  href: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
}

const items: QuickNavItem[] = [
  {
    href: "/nsmq",
    title: "NSMQ",
    subtitle: "Regional & National",
    icon: GraduationCap,
    iconBg: "bg-[#603BFF]",
  },
  {
    href: "/football",
    title: "Football",
    subtitle: "Premier League & more",
    icon: Goal,
    iconBg: "bg-emerald-500",
  },
  {
    href: "/squads",
    title: "Squads",
    subtitle: "Join or create",
    icon: Users,
    iconBg: "bg-blue-500",
  },
  {
    href: "/leaderboards",
    title: "Leaderboards",
    subtitle: "See where you rank",
    icon: Medal,
    iconBg: "bg-[#FBBF24]",
  },
  {
    href: "/picks",
    title: "Your Picks",
    subtitle: "View & track",
    icon: Ticket,
    iconBg: "bg-[#603BFF]",
  },
];

export function QuickNav() {
  return (
    <div className="flex gap-3 overflow-x-auto pb-1 sm:grid sm:grid-cols-3 sm:overflow-visible lg:grid-cols-5">
      {items.map(({ href, title, subtitle, icon: Icon, iconBg }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "flex min-w-[160px] items-center gap-3 rounded-lg border border-transparent bg-[#0F1A36] px-4 py-3.5 transition-all hover:border-[#603BFF]/30 hover:bg-[#162042]",
            "lg:min-w-0"
          )}
        >
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
              iconBg
            )}
          >
            <Icon className="h-5 w-5 text-white" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">{title}</p>
            <p className="truncate text-xs text-[#AAB5D0]">{subtitle}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
