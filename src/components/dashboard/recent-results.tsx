"use client";

import Link from "next/link";
import {
  ArrowRight,
  Ticket,
  Coins,
  Users,
  Medal,
  Gift,
  ShieldCheck,
  Gamepad2,
  UsersRound,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Recent Results                                                            */
/* -------------------------------------------------------------------------- */

interface ResultItem {
  competition: string;
  match: string;
  timePrimary: string;
  timeSecondary: string;
  status: "Completed";
}

const results: ResultItem[] = [
  {
    competition: "NSMQ Regional",
    match: "Kumasi Academy vs Prempeh College",
    timePrimary: "Kumasi · 2h ago",
    timeSecondary: "Today · 7:30 PM",
    status: "Completed",
  },
  {
    competition: "Premier League",
    match: "Liverpool vs Chelsea",
    timePrimary: "Today · 7:30 PM",
    timeSecondary: "Today · 7:30 PM",
    status: "Completed",
  },
  {
    competition: "UEFA Champions League",
    match: "Real Madrid vs Bayern Munich",
    timePrimary: "Yesterday · 1:30 PM",
    timeSecondary: "Today · 8:00 PM",
    status: "Completed",
  },
];

function RecentResults() {
  return (
    <div>
      {/* Section header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Recent Results</h2>
        <Link
          href="/results"
          className="flex items-center gap-1 text-sm text-[#603BFF] hover:underline"
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Result list */}
      <div className="flex flex-col gap-3">
        {results.map((item) => (
          <div
            key={`${item.competition}-${item.match}`}
            className="rounded-lg bg-[#0F1A36] p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">
                  {item.competition}
                </p>
                <p className="mt-0.5 truncate text-sm text-[#AAB5D0]">
                  {item.match}
                </p>
                <p className="mt-1 text-xs text-[#AAB5D0]/70">
                  {item.timePrimary} &middot; {item.timeSecondary}
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Quick Actions                                                             */
/* -------------------------------------------------------------------------- */

interface QuickAction {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

const actions: QuickAction[] = [
  { label: "My Picks", icon: Ticket, href: "/picks" },
  { label: "Refill Tokens", icon: Coins, href: "/tokens" },
  { label: "Squad", icon: Users, href: "/squads" },
  { label: "View Leaderboard", icon: Medal, href: "/leaderboards" },
  { label: "Redeem Rewards", icon: Gift, href: "/rewards" },
];

function QuickActions() {
  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-white">Quick Actions</h2>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-3">
        {actions.map(({ label, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="flex flex-col items-center justify-center gap-2 rounded-lg bg-[#0C1532] px-3 py-4 text-center transition-colors hover:bg-[#162042]"
          >
            <Icon className="h-5 w-5 text-[#603BFF]" />
            <span className="text-xs font-medium text-[#AAB5D0]">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Footer bar                                                                */
/* -------------------------------------------------------------------------- */

interface FooterItem {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
}

const footerItems: FooterItem[] = [
  {
    icon: Info,
    text: "Free to play · Tokens have no cash value",
  },
  {
    icon: ShieldCheck,
    text: "15+ Age · Ghana Card verification",
  },
  {
    icon: Gamepad2,
    text: "NSMQ + Football + More · Complete, earn XP, climb",
  },
  {
    icon: UsersRound,
    text: "Community Driven · Friends, squads, schools",
  },
];

export function DashboardFooter() {
  return (
    <footer className="rounded-lg bg-[#0C1532] px-6 py-4">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        {footerItems.map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-1.5">
            <Icon className="h-3.5 w-3.5 shrink-0 text-[#AAB5D0]/60" />
            <span className="text-xs text-[#AAB5D0]/70">{text}</span>
          </div>
        ))}
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/*  Combined export                                                           */
/* -------------------------------------------------------------------------- */

export function RecentResultsSection() {
  return (
    <section>
      <RecentResults />
    </section>
  );
}
