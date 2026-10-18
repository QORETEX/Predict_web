"use client";

import { Suspense, useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronsLeft, ChevronsRight, Zap, Gamepad2, UsersRound } from "lucide-react";
import { BottomNav } from "@/components/bottom-nav";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { PickSlip } from "@/components/dashboard/pick-slip";
import { WalletCard } from "@/components/dashboard/wallet-card";
import { LiveOdds } from "@/components/dashboard/live-odds";
import { SquadCard } from "@/components/dashboard/squad-card";
import { cn } from "@/lib/utils";
import { PickSlipProvider, usePickSlip } from "@/contexts/pick-slip-context";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isOpen: pickSlipOpen } = usePickSlip();
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Auto-open right sidebar when pick is made
  useEffect(() => {
    if (pickSlipOpen) {
      setRightOpen(true);
    }
  }, [pickSlipOpen]);

  // Pages where right sidebar should be shown
  const showRightSidebar =
    pathname === "/dashboard" ||
    pathname === "/live" ||
    pathname === "/upcoming" ||
    pathname === "/nsmq" ||
    pathname === "/football" ||
    pathname === "/basketball" ||
    pathname === "/tennis" ||
    pathname === "/other-sports" ||
    pathname?.startsWith("/events/");

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

          {/* Right sidebar - only on certain pages */}
          {showRightSidebar && (
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
          )}

          {/* Right expand tab */}
          {showRightSidebar && !rightOpen && (
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
      <footer className={cn(
        "fixed bottom-0 right-0 z-50 hidden border-t border-[#23315A] bg-[#070D25] transition-[left] duration-300 lg:block",
        leftOpen ? "left-[240px]" : "left-[68px]"
      )}>
        <div className="flex items-center justify-between px-6 py-2">
          {/* Logo */}
          <div className="flex shrink-0 items-center gap-2">
            <Image
              src="/icons/logo-icon.jpeg"
              alt="Predict"
              width={22}
              height={22}
              className="rounded-md"
            />
            <div>
              <span className="text-xs font-bold text-white">Predict</span>
              <p className="text-[9px] leading-tight text-[#AAB5D0]">Pick. Play. Climb.</p>
            </div>
          </div>

          {/* Highlight items */}
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1.5">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#101A3A]">
                <Zap className="h-3 w-3 text-[#FBBF24]" />
              </div>
              <div>
                <p className="text-[10px] font-semibold leading-tight text-white">Free to play</p>
                <p className="text-[9px] leading-tight text-[#AAB5D0]">No cash value</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#101A3A]">
                <span className="text-[9px] font-extrabold text-[#FBBF24]">15+</span>
              </div>
              <div>
                <p className="text-[10px] font-semibold leading-tight text-white">Age 15+</p>
                <p className="text-[9px] leading-tight text-[#AAB5D0]">Ghana Card KYC</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#101A3A]">
                <Gamepad2 className="h-3 w-3 text-[#FBBF24]" />
              </div>
              <div>
                <p className="text-[10px] font-semibold leading-tight text-white">NSMQ + More</p>
                <p className="text-[9px] leading-tight text-[#AAB5D0]">Earn XP, climb</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#101A3A]">
                <UsersRound className="h-3 w-3 text-[#FBBF24]" />
              </div>
              <div>
                <p className="text-[10px] font-semibold leading-tight text-white">Community</p>
                <p className="text-[9px] leading-tight text-[#AAB5D0]">Squads & schools</p>
              </div>
            </div>
          </div>

          {/* Tagline */}
          <p
            className="shrink-0 bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] bg-clip-text text-xs italic text-transparent"
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

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PickSlipProvider>
      <Suspense fallback={<div className="min-h-dvh bg-[#070D25]" />}>
        <LayoutContent>{children}</LayoutContent>
      </Suspense>
    </PickSlipProvider>
  );
}
