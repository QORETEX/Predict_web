"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Shield,
  CheckCircle,
  Clock,
  Mail,
  Phone,
  FileText,
  TrendingUp,
  Zap,
  Star,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Mock data                                                          */
/* ------------------------------------------------------------------ */

const verificationSteps = [
  {
    id: 1,
    title: "Email Verification",
    description: "Verify your email address to secure your account and receive important notifications.",
    icon: Mail,
    status: "verified" as const,
  },
  {
    id: 2,
    title: "Phone Verification",
    description: "Add and verify your phone number for two-factor authentication and account recovery.",
    icon: Phone,
    status: "pending" as const,
    action: "Verify Phone",
  },
  {
    id: 3,
    title: "ID Verification",
    description: "Upload a valid government-issued ID to complete identity verification and unlock full features.",
    icon: FileText,
    status: "pending" as const,
    action: "Upload ID",
  },
];

const benefits = [
  {
    icon: TrendingUp,
    title: "Higher Limits",
    description: "Increase your deposit and withdrawal limits with full verification.",
  },
  {
    icon: Zap,
    title: "Faster Withdrawals",
    description: "Verified accounts enjoy priority processing on all withdrawals.",
  },
  {
    icon: Star,
    title: "Exclusive Features",
    description: "Access premium prediction markets and exclusive community features.",
  },
  {
    icon: Lock,
    title: "Account Security",
    description: "Enhanced protection with multi-factor authentication and recovery options.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function VerificationPage() {
  const [steps, setSteps] = useState(verificationSteps);

  return (
    <div className="space-y-5">
      {/* Hero banner */}
      <div className="relative overflow-hidden rounded-lg bg-[#0F1A36]">
        <div className="absolute right-0 top-0 h-full w-1/2">
          <Image src="/images/hero.jpg" alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1A36] via-[#0F1A36]/80 to-transparent" />
        </div>
        <div className="relative px-6 py-7 sm:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#FBBF24]/15">
              <Shield className="h-6 w-6 text-[#FBBF24]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white sm:text-3xl">Verification</h1>
              <p className="mt-1 text-sm text-[#AAB5D0]">Complete KYC and verify your account.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Verification status */}
      <div className="rounded-lg bg-[#0F1A36] p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Account Status</h2>
            <p className="mt-1 text-sm text-[#AAB5D0]">
              Your account is not yet fully verified. Complete the steps below to unlock all features.
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center rounded-full bg-[#F43F5E]/15 px-3 py-1 text-xs font-medium text-[#F43F5E]">
            Unverified
          </span>
        </div>
      </div>

      {/* Verification steps */}
      <div className="space-y-3">
        {steps.map((step) => {
          const Icon = step.icon;
          const isVerified = step.status === "verified";
          const StatusIcon = isVerified ? CheckCircle : Clock;
          const statusColor = isVerified ? "#22C55E" : "#FBBF24";

          return (
            <div
              key={step.id}
              className="rounded-lg bg-[#0F1A36] p-5 sm:p-6"
            >
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                    isVerified ? "bg-[#22C55E]/15" : "bg-[#FBBF24]/15"
                  )}
                >
                  <StatusIcon
                    className="h-5 w-5"
                    style={{ color: statusColor }}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-sm font-semibold text-white">
                      Step {step.id}: {step.title}
                    </h3>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                        isVerified
                          ? "bg-[#22C55E]/15 text-[#22C55E]"
                          : "bg-[#FBBF24]/15 text-[#FBBF24]"
                      )}
                    >
                      {isVerified ? "Verified" : "Pending"}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-[#AAB5D0]">{step.description}</p>
                </div>

                {step.action && (
                  <Button
                    className="shrink-0 bg-[#603BFF] text-white hover:bg-[#603BFF]/90"
                    size="sm"
                  >
                    {step.action}
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Why Verify? */}
      <div className="rounded-lg bg-[#0F1A36] p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-white">Why Verify?</h2>
        <p className="mt-1 text-sm text-[#AAB5D0]">
          Completing verification unlocks the full Predict experience.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="rounded-lg bg-[#0C1532] p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#603BFF]/15">
                    <Icon className="h-4.5 w-4.5 text-[#603BFF]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{benefit.title}</h3>
                    <p className="mt-0.5 text-xs text-[#AAB5D0]">{benefit.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
