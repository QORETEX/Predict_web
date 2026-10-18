"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const COUNTRY_CODES = [
  { code: "+233", flag: "\u{1F1EC}\u{1F1ED}", name: "Ghana" },
  { code: "+234", flag: "\u{1F1F3}\u{1F1EC}", name: "Nigeria" },
  { code: "+254", flag: "\u{1F1F0}\u{1F1EA}", name: "Kenya" },
  { code: "+256", flag: "\u{1F1FA}\u{1F1EC}", name: "Uganda" },
  { code: "+255", flag: "\u{1F1F9}\u{1F1FF}", name: "Tanzania" },
  { code: "+27", flag: "\u{1F1FF}\u{1F1E6}", name: "South Africa" },
  { code: "+225", flag: "\u{1F1E8}\u{1F1EE}", name: "Côte d'Ivoire" },
  { code: "+237", flag: "\u{1F1E8}\u{1F1F2}", name: "Cameroon" },
  { code: "+1", flag: "\u{1F1FA}\u{1F1F8}", name: "United States" },
  { code: "+44", flag: "\u{1F1EC}\u{1F1E7}", name: "United Kingdom" },
];

type CountryCode = (typeof COUNTRY_CODES)[number];

function isPhoneInput(value: string): boolean {
  return /^\d/.test(value) || value === "";
}

interface IdentifierInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export function IdentifierInput({
  value,
  onChange,
  placeholder = "Email or phone number",
  required,
  className,
}: IdentifierInputProps) {
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mode, setMode] = useState<"undecided" | "phone" | "email">("undecided");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleInputChange(raw: string) {
    if (raw === "") {
      setMode("undecided");
      onChange("");
      return;
    }

    if (mode === "undecided") {
      if (/^\d/.test(raw)) {
        setMode("phone");
        onChange(selectedCountry.code + raw);
      } else {
        setMode("email");
        onChange(raw);
      }
      return;
    }

    if (mode === "phone") {
      const digits = raw.replace(/\D/g, "");
      onChange(selectedCountry.code + digits);
    } else {
      onChange(raw);
    }
  }

  function getDisplayValue(): string {
    if (mode === "phone" && value.startsWith(selectedCountry.code)) {
      return value.slice(selectedCountry.code.length);
    }
    return value;
  }

  function handleCountrySelect(country: CountryCode) {
    const oldCode = selectedCountry.code;
    setSelectedCountry(country);
    setDropdownOpen(false);
    if (mode === "phone" && value.startsWith(oldCode)) {
      onChange(country.code + value.slice(oldCode.length));
    }
  }

  const showPhoneMode = mode === "phone" || (mode === "undecided" && isPhoneInput(value));

  return (
    <div className={cn("relative flex", className)}>
      {showPhoneMode && (
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
                  onClick={() => handleCountrySelect(country)}
                  className={cn(
                    "flex w-full items-center gap-2.5 px-3 py-2 text-sm hover:bg-[#1A2747]",
                    country.code === selectedCountry.code
                      ? "bg-[#1A2747] text-white"
                      : "text-[#AAB5D0]",
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
      )}

      <input
        type={mode === "email" ? "email" : "text"}
        inputMode={mode === "phone" ? "numeric" : undefined}
        value={getDisplayValue()}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className={cn(
          "flex h-11 w-full border border-[#23315A] bg-[#0C1532] px-3 py-2 text-sm text-white ring-offset-background placeholder:text-[#AAB5D0]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          showPhoneMode ? "rounded-l-none rounded-r-lg" : "rounded-lg",
        )}
      />
    </div>
  );
}
