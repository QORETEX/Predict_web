import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[#23315A] bg-[#070D25]">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col items-center gap-4 py-6 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2.5">
            <Image
              src="/icons/logo-icon.jpeg"
              alt="Predict"
              width={28}
              height={28}
              className="rounded-lg"
            />
            <span className="text-base font-bold text-white">Predict</span>
            <span className="hidden text-sm text-[#AAB5D0] sm:inline">Pick. Play. Climb.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-[#AAB5D0] sm:gap-6">
            <Link href="/support" className="transition-colors hover:text-white">
              Support
            </Link>
            <Link href="/feedback" className="transition-colors hover:text-white">
              Feedback
            </Link>
            <Link href="/community" className="transition-colors hover:text-white">
              Community
            </Link>
          </div>

          <p className="bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] bg-clip-text text-sm italic text-transparent sm:text-base"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            Your picks. Your journey.
          </p>
        </div>
      </div>
    </footer>
  );
}
