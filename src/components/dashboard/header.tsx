"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, Search, Coins, Menu, BellOff } from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";
import { useMeSummary } from "@/hooks/use-me";

export function Header({
  onOpenMobileNav,
}: {
  onOpenMobileNav: () => void;
}) {
  const user = useAuthStore((s) => s.user);
  const { data: summary } = useMeSummary();
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  const balance = summary?.balance ?? 0;
  const level = summary?.level ?? 1;
  const unread = summary?.unread_notifications ?? 0;
  const name = user?.username || user?.full_name || "User";
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

        <div className="relative max-w-xl flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#AAB5D0]" />
          <input
            type="text"
            placeholder="Search events, schools, squads..."
            className="h-9 w-full rounded-lg border border-[#23315A] bg-[#0C1532] pl-9 pr-3 text-sm text-white placeholder:text-[#AAB5D0] focus:outline-none focus:ring-1 focus:ring-[#603BFF]"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-[#0C1532] text-[#AAB5D0] transition-colors hover:text-white"
          >
            <Bell className="h-4.5 w-4.5" />
            {unread > 0 && (
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-[#23315A] bg-[#0A1128] shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#23315A] px-4 py-3">
                <h3 className="text-sm font-semibold text-white">Notifications</h3>
                {unread > 0 && (
                  <span className="rounded-full bg-red-500/15 px-2 py-0.5 text-[10px] font-semibold text-red-400">
                    {unread} new
                  </span>
                )}
              </div>
              <div className="flex flex-col items-center justify-center px-4 py-10">
                <BellOff className="mb-3 h-8 w-8 text-[#AAB5D0]/30" />
                <p className="text-sm text-[#AAB5D0]">No notifications yet</p>
                <p className="mt-1 text-xs text-[#AAB5D0]/50">
                  We&apos;ll notify you about picks, wins and updates.
                </p>
              </div>
            </div>
          )}
        </div>

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
