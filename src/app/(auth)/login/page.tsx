"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IdentifierInput } from "@/components/auth/phone-input";
import { login, setTokens, requestOtp } from "@/lib/auth";
import { ApiError } from "@/lib/api";
import { parseApiError } from "@/lib/errors";
import { useAuthStore } from "@/stores/auth-store";
import { toast } from "@/stores/toast-store";
import { SocialAuthButtons } from "@/components/auth/social-auth-buttons";

export default function LoginPage() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login({ identifier, password });
      setTokens(res);
      setUser(res.user);
      toast("success", "Welcome back!");
      router.push("/dashboard");
    } catch (err) {
      if (
        err instanceof ApiError &&
        typeof err.data === "object" &&
        err.data !== null &&
        ((err.data as Record<string, unknown>).error as Record<string, unknown>)?.code === "identifier_not_verified"
      ) {
        try {
          const challenge = await requestOtp({ identifier, purpose: "signup" });
          toast("success", `Please verify your account. Code sent to ${challenge.destination_masked}`);
          const params = new URLSearchParams({
            purpose: "signup",
            identifier,
            destination: challenge.destination_masked,
            seconds: String(challenge.seconds_until_resend),
          });
          router.push(`/verify?${params.toString()}`);
          return;
        } catch {
          toast("error", "Account not verified. Please try signing up again.");
          return;
        }
      }
      toast("error", parseApiError(err, "Invalid email/phone or password."));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="text-center text-2xl font-bold text-white">Welcome back</h1>
      <p className="mt-2 text-center text-sm text-[#AAB5D0]">
        Log in to continue with your picks, squads and rewards.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#AAB5D0]">
            Email or Phone number
          </label>
          <IdentifierInput
            value={identifier}
            onChange={setIdentifier}
            placeholder="Email or phone number"
            required
          />
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-sm font-medium text-[#AAB5D0]">Password</label>
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-[#603BFF] hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
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

        <Button type="submit" className="!mt-6 h-11 w-full" disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {loading ? "Signing in..." : "Log in"}
          {!loading && <ArrowRight className="ml-1 h-4 w-4" />}
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-[#23315A]" />
        <span className="text-xs text-[#AAB5D0]/60">or continue with</span>
        <div className="h-px flex-1 bg-[#23315A]" />
      </div>

      <SocialAuthButtons />

      <p className="mt-6 text-center text-sm text-[#AAB5D0]">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-semibold text-[#603BFF] hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
