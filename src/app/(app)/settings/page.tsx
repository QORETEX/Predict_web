"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Settings,
  Bell,
  Mail,
  MessageSquare,
  Smartphone,
  Eye,
  BarChart3,
  Target,
  Moon,
  Globe,
  ChevronRight,
  Lock,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Toggle component                                                    */
/* ------------------------------------------------------------------ */

function Toggle({
  enabled,
  onToggle,
  disabled,
}: {
  enabled: boolean;
  onToggle: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors",
        enabled ? "bg-[#22C55E]" : "bg-[#23315A]",
        disabled && "cursor-not-allowed opacity-60"
      )}
    >
      <span
        className={cn(
          "inline-block h-4 w-4 rounded-full bg-white transition-transform",
          enabled ? "translate-x-6" : "translate-x-1"
        )}
      />
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    push: true,
    email: true,
    sms: false,
    inApp: true,
  });

  const [privacy, setPrivacy] = useState({
    publicProfile: true,
    showPicks: true,
    showStats: false,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const togglePrivacy = (key: keyof typeof privacy) => {
    setPrivacy((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-5">
      {/* Hero banner */}
      <div className="relative overflow-hidden rounded-lg bg-card">
        <div className="absolute right-0 top-0 h-full w-1/2">
          <Image src="/images/hero.jpg" alt="" fill className="object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-r from-card via-card/80 to-transparent" />
        </div>
        <div className="relative px-6 py-7 sm:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-warning/15">
              <Settings className="h-6 w-6 text-warning" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Settings</h1>
              <p className="mt-1 text-sm text-muted-foreground">Notifications, language, privacy and more.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="rounded-lg bg-card">
        <div className="flex items-center gap-2 border-b border-border px-5 py-4">
          <Bell className="h-4 w-4 text-warning" />
          <h2 className="text-base font-semibold text-foreground">Notifications</h2>
        </div>
        <div className="divide-y divide-border/30">
          {[
            { key: "push" as const, label: "Push Notifications", desc: "Receive push alerts on your device", Icon: Smartphone },
            { key: "email" as const, label: "Email Notifications", desc: "Get updates sent to your email", Icon: Mail },
            { key: "sms" as const, label: "SMS Alerts", desc: "Receive text message notifications", Icon: MessageSquare },
            { key: "inApp" as const, label: "In-App Alerts", desc: "Show notifications inside the app", Icon: Bell },
          ].map((item) => (
            <div key={item.key} className="flex items-center gap-4 px-5 py-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                <item.Icon className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <Toggle
                enabled={notifications[item.key]}
                onToggle={() => toggleNotification(item.key)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Privacy */}
      <div className="rounded-lg bg-card">
        <div className="flex items-center gap-2 border-b border-border px-5 py-4">
          <Eye className="h-4 w-4 text-warning" />
          <h2 className="text-base font-semibold text-foreground">Privacy</h2>
        </div>
        <div className="divide-y divide-border/30">
          {[
            { key: "publicProfile" as const, label: "Public Profile", desc: "Allow others to see your profile", Icon: Eye },
            { key: "showPicks" as const, label: "Show Picks", desc: "Display your predictions publicly", Icon: Target },
            { key: "showStats" as const, label: "Show Stats", desc: "Share your statistics with others", Icon: BarChart3 },
          ].map((item) => (
            <div key={item.key} className="flex items-center gap-4 px-5 py-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                <item.Icon className="h-4 w-4 text-success" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{item.label}</p>
                <p className="text-xs text-[#AAB5D0]">{item.desc}</p>
              </div>
              <Toggle
                enabled={privacy[item.key]}
                onToggle={() => togglePrivacy(item.key)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Appearance */}
      <div className="rounded-lg bg-card">
        <div className="flex items-center gap-2 border-b border-border px-5 py-4">
          <Moon className="h-4 w-4 text-warning" />
          <h2 className="text-base font-semibold text-foreground">Appearance</h2>
        </div>
        <div className="flex items-center gap-4 px-5 py-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
            <Moon className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Dark Mode</p>
            <p className="text-xs text-muted-foreground">Use dark theme across the app</p>
          </div>
          <Toggle enabled={true} onToggle={() => {}} disabled />
        </div>
      </div>

      {/* Language */}
      <div className="rounded-lg bg-card">
        <div className="flex items-center gap-2 border-b border-border px-5 py-4">
          <Globe className="h-4 w-4 text-warning" />
          <h2 className="text-base font-semibold text-foreground">Language</h2>
        </div>
        <div className="flex items-center gap-4 px-5 py-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
            <Globe className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Language</p>
            <p className="text-xs text-muted-foreground">English</p>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground/40" />
        </div>
      </div>

      {/* Account */}
      <div className="rounded-lg bg-[#0F1A36]">
        <div className="flex items-center gap-2 border-b border-[#23315A]/40 px-5 py-4">
          <Lock className="h-4 w-4 text-[#FBBF24]" />
          <h2 className="text-base font-semibold text-white">Account</h2>
        </div>
        <div className="space-y-3 p-5">
          <Button
            variant="outline"
            className="w-full border-[#23315A] bg-transparent text-white hover:bg-[#0C1532]"
          >
            <Lock className="mr-2 h-4 w-4" />
            Change Password
          </Button>
          <Button
            variant="outline"
            className="w-full border-[#F43F5E]/30 bg-transparent text-[#F43F5E] hover:bg-[#F43F5E]/10"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
}
