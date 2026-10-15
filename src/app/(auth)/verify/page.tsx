"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VerifyPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(45);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  function handleChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return;
    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const next = [...otp];
    for (let i = 0; i < pasted.length; i++) {
      next[i] = pasted[i];
    }
    setOtp(next);
    const focusIndex = Math.min(pasted.length, 5);
    inputRefs.current[focusIndex]?.focus();
  }

  const formattedCountdown = `${Math.floor(countdown / 60).toString().padStart(2, "0")}:${(countdown % 60).toString().padStart(2, "0")}`;

  return (
    <div>
      {/* Icon */}
      <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#603BFF]/15">
        <Mail className="h-7 w-7 text-[#603BFF]" />
      </div>

      {/* Header */}
      <h1 className="text-center text-2xl font-bold text-white">Verify your email</h1>
      <p className="mt-2 text-center text-sm text-[#AAB5D0]">
        We&apos;ve sent a 6-digit verification code to your email address.
      </p>

      {/* OTP form */}
      <form className="mt-6">
        <div className="flex justify-center gap-2.5">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={i === 0 ? handlePaste : undefined}
              className="h-12 w-12 rounded-lg border border-[#23315A] bg-[#0C1532] text-center text-lg font-bold text-white focus:border-[#603BFF] focus:outline-none focus:ring-1 focus:ring-[#603BFF]"
            />
          ))}
        </div>

        <p className="mt-4 text-center text-sm text-[#AAB5D0]">
          Resend code in{" "}
          <span className="font-medium text-white">{formattedCountdown}</span>
        </p>

        <Button type="submit" className="mt-6 h-11 w-full">
          Verify
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </form>

      {/* Footer link */}
      <p className="mt-6 text-center">
        <Link
          href="/login"
          className="text-sm font-medium text-[#603BFF] hover:underline"
        >
          Try a different method
        </Link>
      </p>

      {/* Security note */}
      <div className="mt-6 flex items-start gap-3 rounded-lg border border-[#23315A] bg-[#0C1532] p-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#603BFF]/15">
          <ShieldCheck className="h-4 w-4 text-[#603BFF]" />
        </div>
        <div>
          <p className="text-sm font-medium text-white">Your email is safe with us.</p>
          <p className="mt-0.5 text-xs text-[#AAB5D0]">
            We only use it for account verification and important updates.
          </p>
        </div>
      </div>
    </div>
  );
}
