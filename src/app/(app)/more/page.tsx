"use client";

import Image from "next/image";
import Link from "next/link";
import {
  MoreHorizontal,
  User,
  Shield,
  Settings,
  HelpCircle,
  Gift,
  Users,
  Tag,
  Star,
  Brain,
  BookOpen,
  Trophy,
  Crown,
  Megaphone,
  MessageCircle,
  School,
  Mail,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface FeatureCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}

interface Section {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  cards: FeatureCard[];
}

/* ------------------------------------------------------------------ */
/*  Mock data                                                          */
/* ------------------------------------------------------------------ */

const sections: Section[] = [
  {
    id: "account",
    title: "Account & Profile",
    description: "Manage your account, verification and personal settings.",
    icon: <User className="h-5 w-5 text-[#FBBF24]" />,
    iconBg: "bg-[#FBBF24]/15",
    cards: [
      {
        icon: <User className="h-5 w-5 text-[#FBBF24]" />,
        title: "Profile",
        description: "View and edit your personal information.",
        href: "/profile",
      },
      {
        icon: <Shield className="h-5 w-5 text-[#FBBF24]" />,
        title: "Verification",
        description: "Complete KYC and verify your account.",
        href: "/verification",
      },
      {
        icon: <Settings className="h-5 w-5 text-[#FBBF24]" />,
        title: "Settings",
        description: "Notifications, language, privacy and more.",
        href: "/settings",
      },
      {
        icon: <HelpCircle className="h-5 w-5 text-[#FBBF24]" />,
        title: "Help & Support",
        description: "Get help or contact our support team.",
        href: "/support",
      },
    ],
  },
  {
    id: "rewards",
    title: "Rewards & Incentives",
    description: "Earn more tokens, unlock benefits and track your achievements.",
    icon: <Gift className="h-5 w-5 text-[#FBBF24]" />,
    iconBg: "bg-[#FBBF24]/15",
    cards: [
      {
        icon: <Gift className="h-5 w-5 text-[#FBBF24]" />,
        title: "Daily Rewards",
        description: "Log in daily and claim free tokens.",
        href: "/rewards/daily",
      },
      {
        icon: <Users className="h-5 w-5 text-[#FBBF24]" />,
        title: "Referral Program",
        description: "Invite friends and earn bonus tokens.",
        href: "/rewards/referral",
      },
      {
        icon: <Tag className="h-5 w-5 text-[#FBBF24]" />,
        title: "Promotions",
        description: "Check out ongoing offers and bonuses.",
        href: "/rewards/promotions",
      },
      {
        icon: <Star className="h-5 w-5 text-[#FBBF24]" />,
        title: "XP Store",
        description: "Spend XP on exclusive rewards and perks.",
        href: "/rewards/xp-store",
      },
    ],
  },
  {
    id: "learning",
    title: "Game & Learning",
    description: "Sharpen your skills, test your knowledge and have fun.",
    icon: <Brain className="h-5 w-5 text-[#FBBF24]" />,
    iconBg: "bg-[#FBBF24]/15",
    cards: [
      {
        icon: <Brain className="h-5 w-5 text-[#FBBF24]" />,
        title: "NSMQ Quiz",
        description: "Test your knowledge and earn rewards.",
        href: "/quiz/nsmq",
      },
      {
        icon: <BookOpen className="h-5 w-5 text-[#FBBF24]" />,
        title: "Predict Academy",
        description: "Learn strategies, tips and insights.",
        href: "/academy",
      },
      {
        icon: <Trophy className="h-5 w-5 text-[#FBBF24]" />,
        title: "Challenges",
        description: "Complete daily and weekly challenges.",
        href: "/challenges",
      },
      {
        icon: <Crown className="h-5 w-5 text-[#FBBF24]" />,
        title: "Leaderboards",
        description: "See how you rank across all categories.",
        href: "/leaderboards",
      },
    ],
  },
  {
    id: "community",
    title: "Community & Social",
    description: "Connect, share and be part of the Predict community.",
    icon: <Users className="h-5 w-5 text-[#FBBF24]" />,
    iconBg: "bg-[#FBBF24]/15",
    cards: [
      {
        icon: <Megaphone className="h-5 w-5 text-[#FBBF24]" />,
        title: "News & Updates",
        description: "Latest news, events and announcements.",
        href: "/news",
      },
      {
        icon: <MessageCircle className="h-5 w-5 text-[#FBBF24]" />,
        title: "Community",
        description: "Join discussions and share your picks.",
        href: "/community",
      },
      {
        icon: <School className="h-5 w-5 text-[#FBBF24]" />,
        title: "School Groups",
        description: "Connect with your school community.",
        href: "/schools",
      },
      {
        icon: <Mail className="h-5 w-5 text-[#FBBF24]" />,
        title: "Feedback",
        description: "Share your thoughts and suggestions.",
        href: "/feedback",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function MorePage() {
  return (
    <div className="space-y-5">
      {/* ============================================================ */}
      {/*  Hero banner                                                  */}
      {/* ============================================================ */}
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
              <MoreHorizontal className="h-6 w-6 text-[#FBBF24]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                More
              </h1>
              <p className="mt-1 text-sm text-[#AAB5D0]">
                Explore more features, get the most out of Predict.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  Feature sections                                            */}
      {/* ============================================================ */}
      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.id}>
            {/* Section header */}
            <div className="mb-4 flex items-center gap-3">
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                  section.iconBg
                )}
              >
                {section.icon}
              </div>
              <div>
                <h2 className="text-base font-semibold text-white">
                  {section.title}
                </h2>
                <p className="text-xs text-[#AAB5D0]">{section.description}</p>
              </div>
            </div>

            {/* Feature cards grid */}
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {section.cards.map((card, idx) => (
                <Link
                  key={idx}
                  href={card.href}
                  className="group flex flex-col gap-3 rounded-lg bg-[#0F1A36] p-4 transition-colors hover:bg-[#162042]"
                >
                  <div className="flex items-start justify-between">
                    <div
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                        section.iconBg
                      )}
                    >
                      {card.icon}
                    </div>
                    <ChevronRight className="h-4 w-4 text-[#AAB5D0]/40 transition-transform group-hover:translate-x-1 group-hover:text-[#603BFF]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      {card.title}
                    </h3>
                    <p className="mt-1 text-xs text-[#AAB5D0]">
                      {card.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ============================================================ */}
      {/*  Bottom CTA                                                  */}
      {/* ============================================================ */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-[#603BFF] via-[#7C3AED] to-[#603BFF] p-8">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-10 top-10 h-20 w-20 rounded-full bg-white blur-2xl" />
          <div className="absolute bottom-10 right-10 h-32 w-32 rounded-full bg-white blur-3xl" />
        </div>
        <div className="relative flex flex-wrap items-center justify-between gap-6">
          {/* Left: Illustrations */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-4xl">🏆</span>
              <span className="text-4xl">💰</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                Play. Earn. Climb.
              </h2>
              <p className="mt-1 text-sm text-white/80">
                More features. More rewards. More ways to win.
              </p>
            </div>
          </div>

          {/* Right: Illustrations + CTA */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-4xl">👑</span>
              <span className="text-4xl">⭐</span>
              <span className="text-4xl">💎</span>
            </div>
            <Button
              size="lg"
              className="h-12 gap-2 bg-white text-[#603BFF] hover:bg-white/90"
            >
              Explore Rewards
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
