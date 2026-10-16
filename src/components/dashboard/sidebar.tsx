"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Home,
  Radio,
  Clock,
  GraduationCap,
  Goal,
  CircleDot,
  Target,
  Gamepad2,
  Ticket,
  Wallet,
  Medal,
  Users,
  User,
  MoreHorizontal,
  X,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const mainNavItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/live", label: "Live", icon: Radio, badge: "LIVE" },
  { href: "/upcoming", label: "Upcoming", icon: Clock },
  { href: "/nsmq", label: "NSMQ", icon: GraduationCap },
  { href: "/football", label: "Football", icon: Goal },
  { href: "/basketball", label: "Basketball", icon: CircleDot },
  { href: "/tennis", label: "Tennis", icon: Target },
  { href: "/other-sports", label: "Other Sports", icon: Gamepad2 },
];

const secondaryNavItems = [
  { href: "/picks", label: "My Picks", icon: Ticket },
  { href: "/wallet", label: "Wallet", icon: Wallet },
  { href: "/leaderboards", label: "Leaderboard", icon: Medal },
  { href: "/squads", label: "Squads", icon: Users },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/more", label: "More", icon: MoreHorizontal },
];

function NavItem({
  href,
  label,
  icon: Icon,
  badge,
  isActive,
  collapsed,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  isActive: boolean;
  collapsed: boolean;
}) {
  return (
    <Link
      href={href}
      title={collapsed ? label : undefined}
      className={cn(
        "flex items-center rounded-lg text-sm font-medium transition-colors",
        collapsed ? "justify-center px-0 py-2.5" : "gap-3 px-3 py-2.5",
        isActive
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-accent/10 hover:text-foreground"
      )}
    >
      <Icon className="h-5 w-5 shrink-0" />
      {!collapsed && <span className="truncate">{label}</span>}
      {!collapsed && badge === "LIVE" && (
        <span className="ml-auto flex items-center gap-1 rounded-full bg-red-500/15 px-2 py-0.5 text-[10px] font-bold uppercase text-red-500">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
          Live
        </span>
      )}
      {collapsed && badge === "LIVE" && (
        <span className="absolute right-1.5 top-1 h-2 w-2 rounded-full bg-red-500" />
      )}
    </Link>
  );
}

export function Sidebar({
  open,
  onToggle,
  mobileOpen,
  onMobileClose,
}: {
  open: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}) {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  }

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Mobile sidebar — always full width */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-dvh w-[240px] flex-col border-r bg-card transition-transform duration-300 lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <Link href="/dashboard" className="flex items-center gap-3">
            <Image
              src="/icons/logo-icon.jpeg"
              alt="Predict logo"
              width={36}
              height={36}
              className="rounded-lg"
            />
            <div>
              <h1 className="text-lg font-bold leading-tight text-foreground">Predict</h1>
              <p className="text-[11px] text-muted-foreground">Pick. Play. Climb.</p>
            </div>
          </Link>
          <button
            type="button"
            onClick={onMobileClose}
            className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-accent/10 hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 pt-2">
          {mainNavItems.map((item) => (
            <NavItem key={item.href} {...item} isActive={isActive(item.href)} collapsed={false} />
          ))}
          <div className="my-3 border-t border-border" />
          {secondaryNavItems.map((item) => (
            <NavItem key={item.href} {...item} isActive={isActive(item.href)} collapsed={false} />
          ))}
        </nav>

      </aside>

      {/* Desktop sidebar — expanded or icon rail */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 hidden h-dvh flex-col border-r bg-card transition-[width] duration-300 lg:flex",
          open ? "w-[240px]" : "w-[68px]"
        )}
      >
        {/* Logo row */}
        <div className={cn("flex items-center py-5", open ? "justify-between px-5" : "justify-center px-2")}>
          <Link href="/dashboard" className="flex items-center gap-3">
            <Image
              src="/icons/logo-icon.jpeg"
              alt="Predict logo"
              width={36}
              height={36}
              className="rounded-lg"
            />
            {open && (
              <div>
                <h1 className="text-lg font-bold leading-tight text-white">Predict</h1>
                <p className="text-[11px] text-[#AAB5D0]">Pick. Play. Climb.</p>
              </div>
            )}
          </Link>
          {open && (
            <button
              type="button"
              onClick={onToggle}
              className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent/10 hover:text-foreground"
            >
              <ChevronsLeft className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Nav items */}
        <nav className={cn("flex-1 space-y-1 overflow-y-auto pb-20 pt-2", open ? "px-3" : "px-2")}>
          {mainNavItems.map((item) => (
            <div key={item.href} className={cn(!open && "relative")}>
              <NavItem {...item} isActive={isActive(item.href)} collapsed={!open} />
            </div>
          ))}

          <div className="my-3 border-t border-border" />

          {secondaryNavItems.map((item) => (
            <NavItem key={item.href} {...item} isActive={isActive(item.href)} collapsed={!open} />
          ))}
        </nav>

        {/* Expand button when collapsed */}
        {!open && (
          <div className="border-t border-[#23315A] px-2 py-4">
            <button
              type="button"
              onClick={onToggle}
              className="flex w-full items-center justify-center rounded-md py-2 text-muted-foreground transition-colors hover:bg-accent/10 hover:text-foreground"
            >
              <ChevronsRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
