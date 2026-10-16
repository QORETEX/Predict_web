"use client";

import { useState } from "react";
import Image from "next/image";
import {
  HelpCircle,
  ChevronDown,
  Mail,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Seed data                                                          */
/* ------------------------------------------------------------------ */

const faqs = [
  {
    question: "How do I make a prediction?",
    answer:
      "Navigate to any event page, select your prediction option, choose your stake amount, and confirm. Your prediction will be recorded and you can track it from your profile or picks page.",
  },
  {
    question: "How do tokens work?",
    answer:
      "Tokens are the in-app currency used to make predictions. You earn tokens through daily rewards, referrals, challenges, and winning predictions. You can also purchase additional tokens from the wallet page.",
  },
  {
    question: "Can I withdraw my earnings?",
    answer:
      "Yes, verified users can withdraw their token earnings. Complete the KYC verification process to unlock withdrawals. Processing times vary depending on your withdrawal method, typically 1-3 business days.",
  },
  {
    question: "How does the XP system work?",
    answer:
      "XP (Experience Points) are earned by making predictions, completing challenges, and participating in quizzes. As you accumulate XP, you level up and unlock new features, badges, and rewards in the XP Store.",
  },
  {
    question: "What is the NSMQ quiz?",
    answer:
      "The NSMQ (National Science and Maths Quiz) section lets you test your knowledge in Science, Mathematics, and General Knowledge. Earn XP and tokens by answering questions correctly and compete on the leaderboard.",
  },
];

const contacts = [
  {
    Icon: Mail,
    title: "Email",
    detail: "support@predict.app",
    description: "We respond within 24 hours",
  },
  {
    Icon: MessageCircle,
    title: "Live Chat",
    detail: "Available 24/7",
    description: "Get instant help from our team",
  },
  {
    Icon: Phone,
    title: "Phone",
    detail: "+233 XX XXX XXXX",
    description: "Mon-Fri, 9am-5pm GMT",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="space-y-5">
      {/* Hero banner */}
      <div className="relative overflow-hidden rounded-lg bg-[#0F1A36]">
        <div className="absolute right-0 top-0 h-full w-1/2">
          <Image src="/images/hero.jpg" alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1A36] via-[#0F1A36]/80 to-transparent" />
        </div>
        <div className="relative px-6 py-7 sm:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#FBBF24]/15">
              <HelpCircle className="h-6 w-6 text-[#FBBF24]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white sm:text-3xl">Help & Support</h1>
              <p className="mt-1 text-sm text-[#AAB5D0]">Get help or contact our support team.</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="rounded-lg bg-[#0F1A36]">
        <div className="flex items-center gap-2 border-b border-[#23315A]/40 px-5 py-4">
          <HelpCircle className="h-4 w-4 text-[#FBBF24]" />
          <h2 className="text-base font-semibold text-white">Frequently Asked Questions</h2>
        </div>
        <div className="divide-y divide-[#23315A]/10">
          {faqs.map((faq, idx) => (
            <div key={idx}>
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-[#0C1532]/60"
              >
                <span className="flex-1 text-sm font-medium text-white">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 text-[#AAB5D0]/60 transition-transform",
                    openFaq === idx && "rotate-180"
                  )}
                />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-4">
                  <p className="text-sm leading-relaxed text-[#AAB5D0]">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div>
        <h2 className="mb-3 text-base font-semibold text-white">Contact Us</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {contacts.map((contact) => (
            <div
              key={contact.title}
              className="rounded-lg bg-[#0F1A36] p-5 transition-colors hover:bg-[#162042]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FBBF24]/15">
                <contact.Icon className="h-5 w-5 text-[#FBBF24]" />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-white">{contact.title}</h3>
              <p className="mt-1 text-sm text-[#603BFF]">{contact.detail}</p>
              <p className="mt-0.5 text-xs text-[#AAB5D0]">{contact.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Submit a Ticket */}
      <div className="rounded-lg bg-[#0F1A36] p-6">
        <h2 className="flex items-center gap-2 text-base font-semibold text-white">
          <Send className="h-4 w-4 text-[#FBBF24]" />
          Submit a Ticket
        </h2>
        <p className="mt-1 text-sm text-[#AAB5D0]">
          Can&apos;t find what you need? Send us a message and we&apos;ll get back to you.
        </p>
        <div className="mt-4 space-y-3">
          <input
            type="text"
            placeholder="Subject"
            className="w-full rounded-lg border border-[#23315A] bg-[#0C1532] px-4 py-2.5 text-sm text-white placeholder-[#AAB5D0]/40 outline-none focus:border-[#603BFF]"
          />
          <textarea
            rows={5}
            placeholder="Describe your issue..."
            className="w-full rounded-lg border border-[#23315A] bg-[#0C1532] px-4 py-2.5 text-sm text-white placeholder-[#AAB5D0]/40 outline-none focus:border-[#603BFF]"
          />
          <Button>
            <Send className="mr-2 h-4 w-4" />
            Submit Ticket
          </Button>
        </div>
      </div>
    </div>
  );
}
