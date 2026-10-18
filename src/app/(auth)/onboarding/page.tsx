"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ArrowLeft,
  Phone,
  Calendar,
  Heart,
  ChevronDown,
  Loader2,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { addPhone, setDateOfBirth, setInterests, completeOnboarding } from "@/lib/services/me";
import { verifyOtp } from "@/lib/auth";
import { useAuthStore } from "@/stores/auth-store";
import { useSports } from "@/hooks/use-competitions";
import { toast } from "@/stores/toast-store";
import { parseApiError } from "@/lib/errors";

const COUNTRY_CODES = [
  { code: "+233", flag: "\u{1F1EC}\u{1F1ED}", name: "Ghana" },
  { code: "+234", flag: "\u{1F1F3}\u{1F1EC}", name: "Nigeria" },
  { code: "+254", flag: "\u{1F1F0}\u{1F1EA}", name: "Kenya" },
  { code: "+256", flag: "\u{1F1FA}\u{1F1EC}", name: "Uganda" },
  { code: "+255", flag: "\u{1F1F9}\u{1F1FF}", name: "Tanzania" },
  { code: "+27", flag: "\u{1F1FF}\u{1F1E6}", name: "South Africa" },
  { code: "+1", flag: "\u{1F1FA}\u{1F1F8}", name: "United States" },
  { code: "+44", flag: "\u{1F1EC}\u{1F1E7}", name: "United Kingdom" },
];

const STEPS = [
  { key: "phone", label: "Phone", icon: Phone },
  { key: "dob", label: "Birthday", icon: Calendar },
  { key: "interests", label: "Interests", icon: Heart },
] as const;

type Step = (typeof STEPS)[number]["key"];

const SPORT_ICONS: Record<string, string> = {
  football: "⚽",
  basketball: "\u{1F3C0}",
  tennis: "\u{1F3BE}",
  cricket: "\u{1F3CF}",
  esports: "\u{1F3AE}",
  nsmq: "\u{1F9EA}",
};

export default function OnboardingPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const [step, setStep] = useState<Step>("phone");
  const stepIndex = STEPS.findIndex((s) => s.key === step);

  const [phone, setPhone] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [phoneLoading, setPhoneLoading] = useState(false);

  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpLoading, setOtpLoading] = useState(false);
  const [challengeDestination, setChallengeDestination] = useState("");
  const [countdown, setCountdown] = useState(0);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [dob, setDob] = useState({ day: "", month: "", year: "" });
  const [dobLoading, setDobLoading] = useState(false);

  const { data: sports = [] } = useSports();
  const [selectedSports, setSelectedSports] = useState<Set<number>>(new Set());
  const [interestsLoading, setInterestsLoading] = useState(false);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handlePhoneSubmit() {
    const fullPhone = selectedCountry.code + phone.replace(/\D/g, "");
    if (phone.replace(/\D/g, "").length < 6) {
      toast("error", "Please enter a valid phone number.");
      return;
    }
    setPhoneLoading(true);
    try {
      const challenge = await addPhone(fullPhone);
      setChallengeDestination(challenge.destination_masked);
      setCountdown(challenge.seconds_until_resend);
      setShowOtp(true);
      toast("success", `Code sent to ${challenge.destination_masked}`);
    } catch (err) {
      toast("error", parseApiError(err, "Failed to add phone number."));
    } finally {
      setPhoneLoading(false);
    }
  }

  function handleOtpChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return;
    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  }

  function handleOtpKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  }

  function handleOtpPaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const next = [...otp];
    for (let i = 0; i < pasted.length; i++) {
      next[i] = pasted[i];
    }
    setOtp(next);
    otpRefs.current[Math.min(pasted.length, 5)]?.focus();
  }

  const handleVerifyOtp = useCallback(async (code: string) => {
    const fullPhone = selectedCountry.code + phone.replace(/\D/g, "");
    setOtpLoading(true);
    try {
      await verifyOtp({ identifier: fullPhone, code, purpose: "verify_phone" });
      toast("success", "Phone verified!");
      setStep("dob");
    } catch (err) {
      toast("error", parseApiError(err, "Invalid code. Please try again."));
      setOtp(["", "", "", "", "", ""]);
      otpRefs.current[0]?.focus();
    } finally {
      setOtpLoading(false);
    }
  }, [selectedCountry.code, phone]);

  useEffect(() => {
    const code = otp.join("");
    if (code.length === 6) {
      handleVerifyOtp(code);
    }
  }, [otp, handleVerifyOtp]);

  async function handleResendOtp() {
    const fullPhone = selectedCountry.code + phone.replace(/\D/g, "");
    try {
      const challenge = await addPhone(fullPhone);
      setCountdown(challenge.seconds_until_resend);
      toast("success", `New code sent to ${challenge.destination_masked}`);
    } catch (err) {
      toast("error", parseApiError(err, "Failed to resend code."));
    }
  }

  async function handleDobSubmit() {
    const { day, month, year } = dob;
    if (!day || !month || !year || year.length !== 4) {
      toast("error", "Please enter a valid date of birth.");
      return;
    }
    const dateStr = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    setDobLoading(true);
    try {
      await setDateOfBirth(dateStr);
      setStep("interests");
    } catch (err) {
      toast("error", parseApiError(err, "Failed to save date of birth."));
    } finally {
      setDobLoading(false);
    }
  }

  function toggleSport(id: number) {
    setSelectedSports((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function handleInterestsSubmit() {
    if (selectedSports.size === 0) {
      toast("error", "Pick at least one interest.");
      return;
    }
    setInterestsLoading(true);
    try {
      await setInterests(Array.from(selectedSports));
      await completeOnboarding();
      router.push("/welcome");
    } catch (err) {
      toast("error", parseApiError(err, "Failed to save interests."));
    } finally {
      setInterestsLoading(false);
    }
  }

  function handleSkip() {
    if (step === "phone") setStep("dob");
    else if (step === "dob") setStep("interests");
    else router.push("/welcome");
  }

  const displayName = user?.username || user?.full_name?.split(" ")[0] || "there";

  return (
    <div>
      {/* Header */}
      <div className="text-center">
        <p className="text-sm font-medium tracking-wide text-[#603BFF]">
          STEP {stepIndex + 1} OF {STEPS.length}
        </p>
        <h1 className="mt-2 text-2xl font-bold text-white">
          {step === "phone" && "Add your phone number"}
          {step === "dob" && "When's your birthday?"}
          {step === "interests" && "What are you into?"}
        </h1>
        <p className="mt-1.5 text-sm text-[#AAB5D0]">
          {step === "phone" && "We'll use this to secure your account."}
          {step === "dob" && "This helps us personalize your experience."}
          {step === "interests" && `Pick the sports you love, ${displayName}.`}
        </p>
      </div>

      {/* Progress bar */}
      <div className="mt-6 flex gap-2">
        {STEPS.map((s, i) => (
          <div
            key={s.key}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors",
              i <= stepIndex ? "bg-[#603BFF]" : "bg-[#23315A]"
            )}
          />
        ))}
      </div>

      {/* Step content */}
      <div className="mt-7">
        {/* ── Phone Step ── */}
        {step === "phone" && !showOtp && (
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#AAB5D0]">
                Phone number
              </label>
              <div className="flex">
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex h-11 items-center gap-1 rounded-l-lg border border-r-0 border-[#23315A] bg-[#0C1532] px-2.5 text-sm text-white hover:bg-[#0C1532]/80"
                  >
                    <span>{selectedCountry.flag}</span>
                    <span className="text-[#AAB5D0]">{selectedCountry.code}</span>
                    <ChevronDown className="h-3 w-3 text-[#AAB5D0]/60" />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute left-0 top-full z-50 mt-1 max-h-52 w-56 overflow-y-auto rounded-lg border border-[#23315A] bg-[#0A1128] py-1 shadow-xl">
                      {COUNTRY_CODES.map((country) => (
                        <button
                          key={country.code}
                          type="button"
                          onClick={() => {
                            setSelectedCountry(country);
                            setDropdownOpen(false);
                          }}
                          className={cn(
                            "flex w-full items-center gap-2.5 px-3 py-2 text-sm hover:bg-[#1A2747]",
                            country.code === selectedCountry.code
                              ? "bg-[#1A2747] text-white"
                              : "text-[#AAB5D0]"
                          )}
                        >
                          <span>{country.flag}</span>
                          <span className="flex-1 text-left">{country.name}</span>
                          <span className="text-[#AAB5D0]/60">{country.code}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <input
                  type="text"
                  inputMode="numeric"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^\d\s-]/g, ""))}
                  placeholder="24 123 4567"
                  className="h-11 w-full rounded-r-lg border border-[#23315A] bg-[#0C1532] px-3 text-sm text-white placeholder:text-[#AAB5D0]/40 focus:border-[#603BFF] focus:outline-none focus:ring-1 focus:ring-[#603BFF]"
                />
              </div>
            </div>

            <Button
              onClick={handlePhoneSubmit}
              className="h-11 w-full"
              disabled={phoneLoading || phone.replace(/\D/g, "").length < 6}
            >
              {phoneLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {phoneLoading ? "Sending code..." : "Continue"}
              {!phoneLoading && <ArrowRight className="ml-1 h-4 w-4" />}
            </Button>
          </div>
        )}

        {/* ── Phone OTP ── */}
        {step === "phone" && showOtp && (
          <div className="space-y-4">
            <p className="text-center text-sm text-[#AAB5D0]">
              Enter the 6-digit code sent to{" "}
              <span className="font-medium text-white">{challengeDestination}</span>
            </p>

            <div className="flex justify-center gap-2.5">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { otpRefs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  onPaste={i === 0 ? handleOtpPaste : undefined}
                  disabled={otpLoading}
                  className="h-12 w-12 rounded-lg border border-[#23315A] bg-[#0C1532] text-center text-lg font-bold text-white focus:border-[#603BFF] focus:outline-none focus:ring-1 focus:ring-[#603BFF] disabled:opacity-50"
                />
              ))}
            </div>

            <div className="text-center text-sm text-[#AAB5D0]">
              {countdown > 0 ? (
                <p>
                  Resend in{" "}
                  <span className="font-medium text-white">
                    {`${Math.floor(countdown / 60).toString().padStart(2, "0")}:${(countdown % 60).toString().padStart(2, "0")}`}
                  </span>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="font-medium text-[#603BFF] hover:underline"
                >
                  Resend code
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => { setShowOtp(false); setOtp(["", "", "", "", "", ""]); }}
              className="flex w-full items-center justify-center gap-1.5 text-sm text-[#AAB5D0] hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Change number
            </button>
          </div>
        )}

        {/* ── Date of Birth Step ── */}
        {step === "dob" && (
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#AAB5D0]">
                Date of birth
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={2}
                    value={dob.day}
                    onChange={(e) => setDob({ ...dob, day: e.target.value.replace(/\D/g, "") })}
                    placeholder="DD"
                    className="h-11 w-full rounded-lg border border-[#23315A] bg-[#0C1532] px-3 text-center text-sm text-white placeholder:text-[#AAB5D0]/40 focus:border-[#603BFF] focus:outline-none focus:ring-1 focus:ring-[#603BFF]"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={2}
                    value={dob.month}
                    onChange={(e) => setDob({ ...dob, month: e.target.value.replace(/\D/g, "") })}
                    placeholder="MM"
                    className="h-11 w-full rounded-lg border border-[#23315A] bg-[#0C1532] px-3 text-center text-sm text-white placeholder:text-[#AAB5D0]/40 focus:border-[#603BFF] focus:outline-none focus:ring-1 focus:ring-[#603BFF]"
                  />
                </div>
                <div className="flex-[1.5]">
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={4}
                    value={dob.year}
                    onChange={(e) => setDob({ ...dob, year: e.target.value.replace(/\D/g, "") })}
                    placeholder="YYYY"
                    className="h-11 w-full rounded-lg border border-[#23315A] bg-[#0C1532] px-3 text-center text-sm text-white placeholder:text-[#AAB5D0]/40 focus:border-[#603BFF] focus:outline-none focus:ring-1 focus:ring-[#603BFF]"
                  />
                </div>
              </div>
              <p className="mt-2 text-xs text-[#AAB5D0]/60">
                You must be at least 13 years old to use Predict.
              </p>
            </div>

            <Button
              onClick={handleDobSubmit}
              className="h-11 w-full"
              disabled={dobLoading || !dob.day || !dob.month || dob.year.length !== 4}
            >
              {dobLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {dobLoading ? "Saving..." : "Continue"}
              {!dobLoading && <ArrowRight className="ml-1 h-4 w-4" />}
            </Button>
          </div>
        )}

        {/* ── Interests Step ── */}
        {step === "interests" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {sports.map((sport) => {
                const isSelected = selectedSports.has(sport.id);
                const icon = SPORT_ICONS[sport.slug] ?? "\u{1F3C6}";
                return (
                  <button
                    key={sport.id}
                    type="button"
                    onClick={() => toggleSport(sport.id)}
                    className={cn(
                      "relative flex flex-col items-center gap-2 rounded-xl p-5 transition-all",
                      isSelected
                        ? "bg-[#603BFF]/15 ring-1 ring-[#603BFF]"
                        : "bg-[#0C1532] hover:bg-[#0C1532]/80"
                    )}
                  >
                    {isSelected && (
                      <div className="absolute right-2.5 top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#603BFF]">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    )}
                    <span className="text-2xl">{icon}</span>
                    <span className={cn(
                      "text-sm font-medium",
                      isSelected ? "text-white" : "text-[#AAB5D0]"
                    )}>
                      {sport.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {selectedSports.size > 0 && (
              <p className="text-center text-xs text-[#AAB5D0]">
                {selectedSports.size} selected
              </p>
            )}

            <Button
              onClick={handleInterestsSubmit}
              className="h-11 w-full"
              disabled={interestsLoading || selectedSports.size === 0}
            >
              {interestsLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {interestsLoading ? "Finishing up..." : "Finish Setup"}
              {!interestsLoading && <ArrowRight className="ml-1 h-4 w-4" />}
            </Button>
          </div>
        )}
      </div>

      {/* Skip link */}
      <div className="mt-5 text-center">
        <button
          type="button"
          onClick={handleSkip}
          className="text-sm text-[#AAB5D0]/60 transition-colors hover:text-[#AAB5D0]"
        >
          Skip for now
        </button>
      </div>

      {/* Step indicators */}
      <div className="mt-6 flex items-center justify-center gap-6">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          const isDone = i < stepIndex;
          const isCurrent = i === stepIndex;
          return (
            <div key={s.key} className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full transition-colors",
                  isDone && "bg-[#22C55E]/15 text-[#22C55E]",
                  isCurrent && "bg-[#603BFF]/15 text-[#603BFF]",
                  !isDone && !isCurrent && "bg-[#0C1532] text-[#AAB5D0]/40"
                )}
              >
                {isDone ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
              </div>
              <span
                className={cn(
                  "text-[10px] font-medium",
                  isCurrent ? "text-white" : isDone ? "text-[#22C55E]" : "text-[#AAB5D0]/40"
                )}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
