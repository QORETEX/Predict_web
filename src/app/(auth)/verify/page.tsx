"use client";

import { Suspense, useRef, useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Mail, ShieldCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { verifyOtp, requestOtp, setTokens } from "@/lib/auth";
import { parseApiError } from "@/lib/errors";
import { useAuthStore } from "@/stores/auth-store";
import { toast } from "@/stores/toast-store";
import type { OtpPurpose } from "@/types";

function VerifyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  const purpose = (searchParams.get("purpose") ?? "signup") as OtpPurpose;
  const identifier = searchParams.get("identifier") ?? "";
  const destination = searchParams.get("destination") ?? identifier;
  const initialSeconds = Number(searchParams.get("seconds") ?? 45);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(initialSeconds);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

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

  const handleVerify = useCallback(async (code: string) => {
    setLoading(true);
    try {
      const res = await verifyOtp({ identifier, code, purpose });
      setTokens(res);
      setUser(res.user);
      toast("success", "Account verified successfully!");
      router.push(res.is_new_user ? "/onboarding" : "/dashboard");
    } catch (err) {
      toast("error", parseApiError(err, "Invalid verification code. Please try again."));
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  }, [identifier, purpose, router, setUser]);

  useEffect(() => {
    const code = otp.join("");
    if (code.length === 6) {
      handleVerify(code);
    }
  }, [otp, handleVerify]);

  async function handleResend() {
    setResending(true);
    try {
      const challenge = await requestOtp({ identifier, purpose });
      setCountdown(challenge.seconds_until_resend);
      toast("success", `New code sent to ${challenge.destination_masked}`);
    } catch (err) {
      toast("error", parseApiError(err, "Failed to resend code. Please try again."));
    } finally {
      setResending(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== 6) return;
    await handleVerify(code);
  }

  const formattedCountdown = `${Math.floor(countdown / 60).toString().padStart(2, "0")}:${(countdown % 60).toString().padStart(2, "0")}`;

  return (
    <div>
      <h1 className="text-center text-2xl font-bold text-white">Verify your account</h1>
      <p className="mt-2 text-center text-sm text-[#AAB5D0]">
        We&apos;ve sent a 6-digit verification code to{" "}
        <span className="font-medium text-white">{destination}</span>.
      </p>

      <form onSubmit={handleSubmit} className="mt-6">
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
              disabled={loading}
              className="h-12 w-12 rounded-lg border border-[#23315A] bg-[#0C1532] text-center text-lg font-bold text-white focus:border-[#603BFF] focus:outline-none focus:ring-1 focus:ring-[#603BFF] disabled:opacity-50"
            />
          ))}
        </div>

        <div className="mt-4 text-center text-sm text-[#AAB5D0]">
          {countdown > 0 ? (
            <p>
              Resend code in{" "}
              <span className="font-medium text-white">{formattedCountdown}</span>
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="font-medium text-[#603BFF] hover:underline disabled:opacity-50"
            >
              {resending ? "Sending..." : "Resend code"}
            </button>
          )}
        </div>

        <Button type="submit" className="mt-6 h-11 w-full" disabled={loading || otp.join("").length !== 6}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {loading ? "Verifying..." : "Verify"}
          {!loading && <ArrowRight className="ml-1 h-4 w-4" />}
        </Button>
      </form>

      <p className="mt-6 text-center">
        <Link
          href="/login"
          className="text-sm font-medium text-[#603BFF] hover:underline"
        >
          Try a different method
        </Link>
      </p>

      <div className="mt-6 flex items-start gap-3 rounded-lg border border-[#23315A] bg-[#0C1532] p-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#603BFF]/15">
          <ShieldCheck className="h-4 w-4 text-[#603BFF]" />
        </div>
        <div>
          <p className="text-sm font-medium text-white">Your info is safe with us.</p>
          <p className="mt-0.5 text-xs text-[#AAB5D0]">
            We only use it for account verification and important updates.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <VerifyContent />
    </Suspense>
  );
}
