"use client";

import { Bell, Search, Coins, Menu } from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";
import { useMeSummary } from "@/hooks/use-me";

export function Header({
  onOpenMobileNav,
}: {
  onOpenMobileNav: () => void;
}) {
  const user = useAuthStore((s) => s.user);
  const { data: summary } = useMeSummary();

  const balance = summary?.balance ?? 0;
  const level = summary?.level ?? 1;
  const unread = summary?.unread_notifications ?? 0;
  const name = user?.full_name ?? "User";
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-[#23315A] bg-[#070D25]/90 px-4 backdrop-blur-md lg:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileNav}
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0C1532] text-[#AAB5D0] transition-colors hover:text-white lg:hidden"
        >
          <Menu className="h-4.5 w-4.5" />
        </button>

        <div className="relative max-w-md flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#AAB5D0]" />
          <input
            type="text"
            placeholder="Search events, schools, squads..."
            className="h-9 w-full rounded-lg border border-[#23315A] bg-[#0C1532] pl-9 pr-3 text-sm text-white placeholder:text-[#AAB5D0] focus:outline-none focus:ring-1 focus:ring-[#603BFF]"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-[#0C1532] text-[#AAB5D0] transition-colors hover:text-white"
        >
          <Bell className="h-4.5 w-4.5" />
          {unread > 0 && (
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
          )}
        </button>

        <div className="flex items-center gap-1.5 rounded-lg border border-[#23315A] bg-[#0C1532] px-3 py-1.5">
          <Coins className="h-4 w-4 text-yellow-400" />
          <span className="text-sm font-semibold text-white">
            {balance.toLocaleString()}
          </span>
          <span className="text-xs text-[#AAB5D0]">TKN</span>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#603BFF] text-xs font-bold text-white">
            {initials}
          </div>
          <div className="hidden flex-col md:flex">
            <span className="text-sm font-medium leading-tight text-white">
              {name}
            </span>
            <span className="text-[11px] text-[#AAB5D0]">Level {level}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
