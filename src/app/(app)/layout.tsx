"use client";

import { Suspense, useState } from "react";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { BottomNav } from "@/components/bottom-nav";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import Image from "next/image";
import { Zap, ShieldCheck, Gamepad2, UsersRound } from "lucide-react";
import { PickSlip } from "@/components/dashboard/pick-slip";
import { WalletCard } from "@/components/dashboard/wallet-card";
import { LiveOdds } from "@/components/dashboard/live-odds";
import { SquadCard } from "@/components/dashboard/squad-card";
import { cn } from "@/lib/utils";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-dvh overflow-x-hidden bg-[#070D25]">
      {/* Left sidebar */}
      <Suspense>
        <Sidebar
          open={leftOpen}
          onToggle={() => setLeftOpen((prev) => !prev)}
          mobileOpen={mobileNavOpen}
          onMobileClose={() => setMobileNavOpen(false)}
        />
      </Suspense>

      {/* Main area — offset by sidebar width */}
      <div
        className={cn(
          "flex min-h-dvh flex-col transition-[padding] duration-300",
          leftOpen ? "lg:pl-[240px]" : "lg:pl-[68px]"
        )}
      >
        <Header onOpenMobileNav={() => setMobileNavOpen(true)} />

        <div className="flex min-h-0 flex-1">
          <main className="min-w-0 flex-1 overflow-x-hidden px-4 py-4 pb-24 lg:px-6 lg:pb-24">
            {children}
          </main>

          {/* Right sidebar */}
          <aside
            className={cn(
              "relative hidden shrink-0 border-l border-[#23315A] transition-all duration-300 lg:block",
              rightOpen ? "w-[320px]" : "w-0 overflow-hidden border-l-0"
            )}
          >
            <div
              className={cn(
                "h-full w-[320px] overflow-y-auto transition-opacity duration-200",
                rightOpen ? "opacity-100" : "pointer-events-none opacity-0"
              )}
            >
              {/* Collapse button at top */}
              <div className="flex items-center justify-end px-4 pt-3 pb-1">
                <button
                  type="button"
                  onClick={() => setRightOpen(false)}
                  className="flex h-7 w-7 items-center justify-center rounded-md text-[#AAB5D0] transition-colors hover:bg-white/5 hover:text-white"
                >
                  <ChevronsRight className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-4 px-4 pb-4">
                <PickSlip />
                <WalletCard />
                <LiveOdds />
                <SquadCard />
              </div>
            </div>
          </aside>

          {/* Right expand tab */}
          {!rightOpen && (
            <button
              type="button"
              onClick={() => setRightOpen(true)}
              className="fixed right-0 top-20 z-40 hidden h-8 w-6 items-center justify-center rounded-l-lg bg-[#0F1A36] text-[#AAB5D0] transition-colors hover:bg-[#162042] hover:text-white lg:flex"
            >
              <ChevronsLeft className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Full-width footer — fixed at bottom, spans across both sidebars */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 hidden border-t border-[#23315A] bg-[#070D25] lg:block">
        <div className="flex items-center justify-between px-8 py-4">
          {/* Logo */}
          <div className="flex shrink-0 items-center gap-2.5">
            <Image
              src="/icons/logo-icon.jpeg"
              alt="Predict"
              width={28}
              height={28}
              className="rounded-lg"
            />
            <div>
              <span className="text-sm font-bold text-white">Predict</span>
              <p className="text-[11px] text-[#AAB5D0]">Pick. Play. Climb.</p>
            </div>
          </div>

          {/* Highlight items */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#101A3A]">
                <Zap className="h-4 w-4 text-[#603BFF]" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Free to play</p>
                <p className="text-[11px] text-[#AAB5D0]">Tokens have no cash value</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#101A3A]">
                <span className="text-sm font-extrabold text-[#603BFF]">15+</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Age 15+</p>
                <p className="text-[11px] text-[#AAB5D0]">Ghana Card verification</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#101A3A]">
                <Gamepad2 className="h-4 w-4 text-[#603BFF]" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">NSMQ + Football + More</p>
                <p className="text-[11px] text-[#AAB5D0]">Complete, earn XP, climb</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#101A3A]">
                <UsersRound className="h-4 w-4 text-[#603BFF]" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Community Driven</p>
                <p className="text-[11px] text-[#AAB5D0]">Friends, squads, schools</p>
              </div>
            </div>
          </div>

          {/* Tagline */}
          <p
            className="shrink-0 bg-gradient-to-r from-[#F43F5E] to-[#9B5CFF] bg-clip-text text-base italic text-transparent"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            Your picks.<br />Your journey.
          </p>
        </div>
      </footer>

      {/* Bottom nav — mobile only */}
      <div className="lg:hidden">
        <Suspense>
          <BottomNav />
        </Suspense>
      </div>
    </div>
  );
}
