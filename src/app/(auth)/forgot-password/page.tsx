"use client";

import { Suspense, useRef, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Mail, Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { passwordResetRequest, passwordResetConfirm } from "@/lib/auth";
import { parseApiError } from "@/lib/errors";
import { toast } from "@/stores/toast-store";

function ForgotPasswordContent() {
  const searchParams = useSearchParams();
  const step = searchParams.get("step");

  if (step === "confirm") {
    return <ConfirmStep />;
  }

  return <RequestStep />;
}

function RequestStep() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const challenge = await passwordResetRequest({ identifier });
      toast("success", `Reset code sent to ${challenge.destination_masked}`);
      const params = new URLSearchParams({
        step: "confirm",
        identifier,
        destination: challenge.destination_masked,
        seconds: String(challenge.seconds_until_resend),
      });
      router.push(`/forgot-password?${params.toString()}`);
    } catch (err) {
      toast("error", parseApiError(err, "Failed to send reset code. Please try again."));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="text-center text-2xl font-bold text-white">Forgot password?</h1>
      <p className="mt-2 text-center text-sm text-[#AAB5D0]">
        No worries. Enter your email or phone and we&apos;ll send you a reset code.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#AAB5D0]">
            Email or phone number
          </label>
          <Input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="Enter your email or phone number"
            required
            className="h-11 border-[#23315A] bg-[#0C1532] text-white placeholder:text-[#AAB5D0]/40"
          />
        </div>

        <Button type="submit" className="!mt-6 h-11 w-full" disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {loading ? "Sending..." : "Send reset code"}
          {!loading && <ArrowRight className="ml-1 h-4 w-4" />}
        </Button>
      </form>

      <p className="mt-6 text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#603BFF] hover:underline"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to login
        </Link>
      </p>
    </div>
  );
}

function ConfirmStep() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const identifier = searchParams.get("identifier") ?? "";
  const destination = searchParams.get("destination") ?? identifier;
  const initialSeconds = Number(searchParams.get("seconds") ?? 45);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [countdown, setCountdown] = useState(initialSeconds);
  const [loading, setLoading] = useState(false);
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

  async function handleResend() {
    try {
      const challenge = await passwordResetRequest({ identifier });
      setCountdown(challenge.seconds_until_resend);
      toast("success", "New code sent!");
    } catch (err) {
      toast("error", parseApiError(err, "Failed to resend code. Please try again."));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== 6 || !newPassword) return;

    setLoading(true);
    try {
      await passwordResetConfirm({ identifier, code, new_password: newPassword });
      toast("success", "Password reset successfully! Redirecting to login...");
      setTimeout(() => router.push("/login"), 1500);
    } catch (err) {
      toast("error", parseApiError(err, "Failed to reset password. Please try again."));
    } finally {
      setLoading(false);
    }
  }

  const formattedCountdown = `${Math.floor(countdown / 60).toString().padStart(2, "0")}:${(countdown % 60).toString().padStart(2, "0")}`;

  return (
    <div>
      <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#603BFF]/15">
        <Mail className="h-7 w-7 text-[#603BFF]" />
      </div>

      <h1 className="text-center text-2xl font-bold text-white">Reset your password</h1>
      <p className="mt-2 text-center text-sm text-[#AAB5D0]">
        Enter the code sent to{" "}
        <span className="font-medium text-white">{destination}</span> and your new password.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#AAB5D0]">
            Verification code
          </label>
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
          <div className="mt-2 text-center text-sm text-[#AAB5D0]">
            {countdown > 0 ? (
              <p>
                Resend code in{" "}
                <span className="font-medium text-white">{formattedCountdown}</span>
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="font-medium text-[#603BFF] hover:underline"
              >
                Resend code
              </button>
            )}
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#AAB5D0]">
            New password
          </label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
              required
              minLength={8}
              className="h-11 border-[#23315A] bg-[#0C1532] pr-10 text-white placeholder:text-[#AAB5D0]/40"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#AAB5D0]/60 hover:text-[#AAB5D0]"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <Button type="submit" className="!mt-6 h-11 w-full" disabled={loading || otp.join("").length !== 6}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {loading ? "Resetting..." : "Reset password"}
          {!loading && <ArrowRight className="ml-1 h-4 w-4" />}
        </Button>
      </form>

      <p className="mt-6 text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#603BFF] hover:underline"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to login
        </Link>
      </p>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <ForgotPasswordContent />
    </Suspense>
  );
}
