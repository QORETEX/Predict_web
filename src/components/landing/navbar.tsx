"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth-store";

export function Navbar() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isLoading = useAuthStore((s) => s.isLoading);
  const user = useAuthStore((s) => s.user);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="absolute left-0 right-0 top-0 z-50">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/icons/logo-icon.jpeg"
            alt="Predict"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="text-xl font-bold text-white">Predict</span>
        </Link>

        {/* Desktop auth buttons */}
        <div className="hidden items-center gap-3 sm:flex">
          {isLoading ? (
            <>
              <Button variant="outline" size="sm" disabled>Log in</Button>
              <Button size="sm" disabled>Sign up</Button>
            </>
          ) : isAuthenticated ? (
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-lg bg-[#603BFF] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#5030CC]"
            >
              <User className="h-4 w-4" />
              {user?.username || user?.full_name?.split(" ")[0] || "Dashboard"}
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline" size="sm">Log in</Button>
              </Link>
              <Link href="/signup">
                <Button size="sm">Sign up</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-white sm:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-[#23315A] bg-[#070D25]/95 backdrop-blur-md sm:hidden">
          <div className="flex flex-col gap-3 px-4 py-4">
            {isLoading ? null : isAuthenticated ? (
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 rounded-lg bg-[#603BFF] px-4 py-3 text-sm font-medium text-white"
              >
                <User className="h-4 w-4" />
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" className="h-11 w-full">Log in</Button>
                </Link>
                <Link href="/signup" onClick={() => setMobileOpen(false)}>
                  <Button className="h-11 w-full">Sign up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
