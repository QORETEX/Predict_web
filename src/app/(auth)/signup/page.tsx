"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IdentifierInput } from "@/components/auth/phone-input";
import { register, requestOtp } from "@/lib/auth";
import { ApiError } from "@/lib/api";
import { parseApiError } from "@/lib/errors";
import { toast } from "@/stores/toast-store";
import { SocialAuthButtons } from "@/components/auth/social-auth-buttons";

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const challenge = await register({
        full_name: fullName,
        identifier,
        password,
        ...(referralCode ? { referred_by: referralCode } : {}),
      });
      toast("success", `Verification code sent to ${challenge.destination_masked}`);
      const params = new URLSearchParams({
        purpose: "signup",
        identifier,
        destination: challenge.destination_masked,
        seconds: String(challenge.seconds_until_resend),
      });
      router.push(`/verify?${params.toString()}`);
    } catch (err) {
      if (
        err instanceof ApiError &&
        typeof err.data === "object" &&
        err.data !== null &&
        (err.data as Record<string, unknown>).error &&
        typeof (err.data as Record<string, unknown>).error === "object" &&
        ((err.data as Record<string, unknown>).error as Record<string, unknown>).code === "identifier_taken"
      ) {
        try {
          const challenge = await requestOtp({ identifier, purpose: "signup" });
          toast("success", `Verification code sent to ${challenge.destination_masked}`);
          const params = new URLSearchParams({
            purpose: "signup",
            identifier,
            destination: challenge.destination_masked,
            seconds: String(challenge.seconds_until_resend),
          });
          router.push(`/verify?${params.toString()}`);
          return;
        } catch {
          toast("error", "This account already exists. Please log in instead.");
          return;
        }
      }
      toast("error", parseApiError(err, "Registration failed. Please try again."));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="text-center text-2xl font-bold text-white">Create your account</h1>
      <p className="mt-2 text-center text-sm text-[#AAB5D0]">
        Join the prediction game today.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#AAB5D0]">
            Full name
          </label>
          <Input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
            required
            className="h-11 border-[#23315A] bg-[#0C1532] text-white placeholder:text-[#AAB5D0]/40"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#AAB5D0]">
            Email or phone number
          </label>
          <IdentifierInput
            value={identifier}
            onChange={setIdentifier}
            placeholder="Email or phone number"
            required
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#AAB5D0]">
            Password
          </label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
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

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#AAB5D0]">
            Referral code <span className="text-[#AAB5D0]/40">(optional)</span>
          </label>
          <Input
            type="text"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
            placeholder="Enter referral code"
            className="h-11 border-[#23315A] bg-[#0C1532] text-white placeholder:text-[#AAB5D0]/40"
          />
        </div>

        <Button type="submit" className="!mt-6 h-11 w-full" disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {loading ? "Creating account..." : "Create account"}
          {!loading && <ArrowRight className="ml-1 h-4 w-4" />}
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-[#23315A]" />
        <span className="text-xs text-[#AAB5D0]/60">or sign up with</span>
        <div className="h-px flex-1 bg-[#23315A]" />
      </div>

      <SocialAuthButtons />

      <p className="mt-6 text-center text-xs leading-relaxed text-[#AAB5D0]">
        By continuing, you agree to our{" "}
        <Link href="/terms" className="font-medium text-[#603BFF] hover:underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="font-medium text-[#603BFF] hover:underline">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
