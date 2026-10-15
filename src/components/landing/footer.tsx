import Image from "next/image";
import Link from "next/link";
import { Zap, Trophy, Users } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[#23315A] bg-[#070D25]">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Highlights bar */}
        <div className="grid grid-cols-2 gap-6 border-b border-[#23315A] py-8 sm:grid-cols-4">
          <Highlight
            icon={<Zap className="h-4 w-4 text-[#603BFF]" />}
            title="Free to play"
            description="Tokens have no cash value"
          />
          <Highlight
            icon={
              <span className="text-sm font-extrabold text-[#603BFF]">15</span>
            }
            title="Age 15+"
            description="Ghana Card verification"
          />
          <Highlight
            icon={<Trophy className="h-4 w-4 text-[#603BFF]" />}
            title="NSMQ + Football + More"
            description="Compete, earn XP, climb"
          />
          <Highlight
            icon={<Users className="h-4 w-4 text-[#603BFF]" />}
            title="Community Driven"
            description="Friends, squads, schools"
          />
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <Image
              src="/icons/logo-icon.jpeg"
              alt="Predict"
              width={28}
              height={28}
              className="rounded-lg"
            />
            <span className="text-base font-bold text-white">Predict</span>
            <span className="text-sm text-[#AAB5D0]">Pick. Play. Climb.</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-[#AAB5D0]">
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms
            </Link>
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy
            </Link>
            <Link href="/responsible-play" className="transition-colors hover:text-white">
              Responsible Play
            </Link>
            <Link href="/support" className="transition-colors hover:text-white">
              Support
            </Link>
          </div>

          <p className="bg-gradient-to-r from-[#F43F5E] to-[#9B5CFF] bg-clip-text text-base italic text-transparent"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            Your picks. Your journey.
          </p>
        </div>
      </div>
    </footer>
  );
}

function Highlight({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#101A3A] ring-1 ring-[#23315A]">
        {icon}
      </div>
      <div>
        <span className="text-sm font-semibold text-white">{title}</span>
        <p className="text-xs text-[#AAB5D0]">{description}</p>
      </div>
    </div>
  );
}
