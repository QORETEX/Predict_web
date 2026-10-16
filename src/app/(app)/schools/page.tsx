"use client";

import { useState } from "react";
import Image from "next/image";
import { School, Search, Users, MapPin, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function SchoolsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [joinedSchools, setJoinedSchools] = useState<Set<string>>(new Set());

  const schools = [
    {
      id: "prempeh",
      name: "Prempeh College",
      members: 245,
      region: "Ashanti",
      color: "bg-green-600",
    },
    {
      id: "achimota",
      name: "Achimota School",
      members: 198,
      region: "Greater Accra",
      color: "bg-blue-600",
    },
    {
      id: "wesley",
      name: "Wesley Girls",
      members: 176,
      region: "Central",
      color: "bg-purple-600",
    },
    {
      id: "mfantsipim",
      name: "Mfantsipim School",
      members: 165,
      region: "Central",
      color: "bg-red-600",
    },
    {
      id: "opoku-ware",
      name: "Opoku Ware School",
      members: 152,
      region: "Ashanti",
      color: "bg-yellow-600",
    },
    {
      id: "st-roses",
      name: "St. Roses School",
      members: 143,
      region: "Central",
      color: "bg-pink-600",
    },
  ];

  const toggleJoin = (schoolId: string) => {
    setJoinedSchools((prev) => {
      const next = new Set(prev);
      if (next.has(schoolId)) {
        next.delete(schoolId);
      } else {
        next.add(schoolId);
      }
      return next;
    });
  };

  return (
    <div className="space-y-5">
      {/* Hero banner */}
      <div className="relative overflow-hidden rounded-lg bg-[#0F1A36]">
        <div className="absolute right-0 top-0 h-full w-1/2">
          <Image
            src="/images/hero.jpg"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1A36] via-[#0F1A36]/80 to-transparent" />
        </div>
        <div className="relative px-6 py-7 sm:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#FBBF24]/15">
              <School className="h-6 w-6 text-[#FBBF24]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                School Groups
              </h1>
              <p className="mt-1 text-sm text-[#AAB5D0]">
                Connect with your school community.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for your school..."
          className="h-11 w-full rounded-lg border border-[#23315A] bg-[#0C1532] px-4 pl-10 text-sm text-white outline-none transition-colors focus:border-[#603BFF]"
        />
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#AAB5D0]" />
      </div>

      {/* School cards grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {schools.map((school) => {
          const isJoined = joinedSchools.has(school.id);
          return (
            <div key={school.id} className="rounded-lg bg-[#0F1A36] p-5">
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white",
                    school.color
                  )}
                >
                  {school.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-white">
                    {school.name}
                  </h3>
                  <div className="mt-1 flex items-center gap-1 text-xs text-[#AAB5D0]">
                    <MapPin className="h-3 w-3" />
                    {school.region}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs text-[#AAB5D0]">
                <Users className="h-3 w-3" />
                <span>{school.members} members</span>
              </div>
              <Button
                onClick={() => toggleJoin(school.id)}
                className={cn(
                  "mt-4 h-9 w-full text-sm",
                  isJoined &&
                    "border border-[#22C55E] bg-[#22C55E]/15 text-[#22C55E] hover:bg-[#22C55E]/25"
                )}
                variant={isJoined ? "outline" : "default"}
              >
                {isJoined ? (
                  <>
                    <CheckCircle className="mr-1 h-4 w-4" />
                    Joined
                  </>
                ) : (
                  "Join Group"
                )}
              </Button>
            </div>
          );
        })}
      </div>

      {/* Stats Section */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg bg-[#0F1A36] p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FBBF24]/15">
              <School className="h-5 w-5 text-[#FBBF24]" />
            </div>
            <div>
              <p className="text-xs text-[#AAB5D0]">Total Schools</p>
              <p className="text-xl font-bold text-white">124</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-[#0F1A36] p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#603BFF]/15">
              <Users className="h-5 w-5 text-[#603BFF]" />
            </div>
            <div>
              <p className="text-xs text-[#AAB5D0]">Total Members</p>
              <p className="text-xl font-bold text-white">12,450</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-[#0F1A36] p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#22C55E]/15">
              <CheckCircle className="h-5 w-5 text-[#22C55E]" />
            </div>
            <div>
              <p className="text-xs text-[#AAB5D0]">Your Groups</p>
              <p className="text-xl font-bold text-white">
                {joinedSchools.size}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
