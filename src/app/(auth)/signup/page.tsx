"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSignUp } from "@clerk/nextjs";
import { ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignUpPage() {
  const { signUp, errors } = useSignUp();
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!signUp) return;
    setError("");
    setLoading(true);

    const [firstName, ...lastParts] = fullName.trim().split(" ");
    const lastName = lastParts.join(" ");
    const isEmail = emailOrPhone.includes("@");

    try {
      const { error: pwError } = await signUp.password({
        firstName,
        lastName: lastName || undefined,
        password,
        ...(isEmail
          ? { emailAddress: emailOrPhone }
          : { phoneNumber: emailOrPhone }),
      });

      if (pwError) {
        setError(pwError.message || "Something went wrong");
        setLoading(false);
        return;
      }

      if (signUp.status === "complete") {
        await signUp.finalize();
        window.location.href = "/welcome";
      } else {
        window.location.href = "/verify";
      }
    } catch (err: unknown) {
      const clerkErr = err as { errors?: { message: string }[] };
      setError(clerkErr.errors?.[0]?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleOAuth(strategy: "oauth_google" | "oauth_apple") {
    if (!signUp) return;
    setError("");
    setOauthLoading(strategy);
    try {
      await signUp.sso({
        strategy,
        redirectUrl: "/signup/sso-callback",
        redirectCallbackUrl: "/welcome",
      });
    } catch (err: unknown) {
      console.error("OAuth error:", err);
      setOauthLoading(null);
      const clerkErr = err as { errors?: { message: string }[] };
      setError(clerkErr.errors?.[0]?.message || "Something went wrong");
    }
  }

  return (
    <div>
      {/* Header */}
      <h1 className="text-center text-2xl font-bold text-white">Create your account</h1>
      <p className="mt-2 text-center text-sm text-[#AAB5D0]">
        Join the prediction game today.
      </p>

      {(error || errors?.global) && (
        <div className="mt-4 rounded-lg bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
          {error || errors?.global?.[0]?.message}
        </div>
      )}

      {/* Form */}
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
            className="h-11 border-[#23315A] bg-[#0C1532] text-white placeholder:text-[#AAB5D0]/40"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#AAB5D0]">
            Email or phone number
          </label>
          <Input
            type="text"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            placeholder="Enter your email or phone number"
            className="h-11 border-[#23315A] bg-[#0C1532] text-white placeholder:text-[#AAB5D0]/40"
          />
          {errors?.fields?.emailAddress && (
            <p className="mt-1 text-xs text-red-400">{errors.fields.emailAddress.message}</p>
          )}
          {errors?.fields?.phoneNumber && (
            <p className="mt-1 text-xs text-red-400">{errors.fields.phoneNumber.message}</p>
          )}
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
          {errors?.fields?.password && (
            <p className="mt-1 text-xs text-red-400">{errors.fields.password.message}</p>
          )}
        </div>

        <Button type="submit" className="!mt-6 h-11 w-full" disabled={loading}>
          {loading ? "Creating account..." : "Create account"}
          {!loading && <ArrowRight className="ml-1 h-4 w-4" />}
        </Button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-[#23315A]" />
        <span className="text-xs text-[#AAB5D0]/60">or sign up with</span>
        <div className="h-px flex-1 bg-[#23315A]" />
      </div>

      {/* Social buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          className="h-11 gap-2 border-[#23315A]"
          disabled={!!oauthLoading}
          onClick={() => handleOAuth("oauth_google")}
        >
          {oauthLoading === "oauth_google" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Image src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width={18} height={18} />
          )}
          Google
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-11 gap-2 border-[#23315A]"
          disabled={!!oauthLoading}
          onClick={() => handleOAuth("oauth_apple")}
        >
          {oauthLoading === "oauth_apple" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 21.99 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 21.99C7.79 22.03 6.8 20.68 5.96 19.47C4.25 16.99 2.97 12.5 4.7 9.49C5.57 7.99 7.13 7.01 8.82 6.99C10.1 6.97 11.32 7.87 12.11 7.87C12.89 7.87 14.37 6.78 15.92 6.95C16.57 6.98 18.39 7.21 19.56 8.91C19.47 8.97 17.39 10.15 17.41 12.68C17.44 15.73 20.06 16.73 20.09 16.74C20.06 16.81 19.67 18.17 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
            </svg>
          )}
          Apple
        </Button>
      </div>

      {/* Footer */}
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
