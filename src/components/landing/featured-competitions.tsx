import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const competitions = [
  {
    name: "NSMQ 2027",
    subtitle: "Regional Championships",
    meta: "Academic | Ghana",
    status: "LIVE" as const,
    cta: "View Events",
    href: "/events?competition=nsmq",
    icon: "N",
    image: "/illustrations/NSMQ 2027_ Champions of Tomorrow.png",
  },
  {
    name: "Premier League",
    subtitle: "Top clubs. Bigger rivalries.",
    meta: "Football | Global",
    status: "UPCOMING" as const,
    cta: "View Matches",
    href: "/events?competition=premier-league",
    icon: "PL",
    image: "/illustrations/Premier League Manchester City Celebration-2.png",
  },
  {
    name: "UEFA Champions League",
    subtitle: "Europe's biggest stage.",
    meta: "Football | Europe",
    status: "UPCOMING" as const,
    cta: "View Matches",
    href: "/events?competition=ucl",
    icon: "UCL",
    image: null,
  },
  {
    name: "Other Sports",
    subtitle: "More sports. More action.",
    meta: "Basketball, Tennis, Cricket & more",
    status: "UPCOMING" as const,
    cta: "Explore",
    href: "/events",
    icon: "OS",
    image: null,
  },
];

export function FeaturedCompetitions() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <div className="mb-10 flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">Featured Competitions</h2>
        <Link
          href="/live"
          className="flex items-center gap-1 text-sm font-medium text-[#603BFF] hover:underline"
        >
          View all
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {competitions.map((comp) => (
          <div
            key={comp.name}
            className="group relative flex min-h-[200px] flex-col justify-between overflow-hidden rounded-2xl border border-[#23315A] bg-[#101A3A] p-5 transition-all duration-300 hover:border-[#603BFF]/40 hover:shadow-[0_0_24px_-4px_rgba(96,59,255,0.25)]"
          >
            {comp.image && (
              <>
                <Image
                  src={comp.image}
                  alt={comp.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover object-right transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#101A3A] via-[#101A3A]/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101A3A] via-transparent to-transparent" />
              </>
            )}

            {/* Top row — icon + status badge */}
            <div className="relative z-10 flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white backdrop-blur-sm">
                {comp.icon}
              </div>
              {comp.status === "LIVE" ? (
                <span className="flex items-center gap-1.5 rounded-full bg-[#F43F5E]/15 px-2.5 py-1 text-[11px] font-semibold text-[#F43F5E] backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#F43F5E]" />
                  LIVE
                </span>
              ) : (
                <span className="rounded-full bg-[#FBBF24]/20 px-2.5 py-1 text-[11px] font-semibold text-[#FBBF24] backdrop-blur-sm">
                  UPCOMING
                </span>
              )}
            </div>

            {/* Bottom — text + CTA */}
            <div className="relative z-10 mt-auto pt-6">
              <h3 className="text-base font-bold text-white">{comp.name}</h3>
              <p className="text-sm text-white/60">{comp.subtitle}</p>
              <p className="mt-0.5 text-xs text-white/40">{comp.meta}</p>

              <Link href={comp.href} className="mt-3 block">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/15 bg-white/5 text-xs hover:bg-white/10"
                >
                  {comp.cta}
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
