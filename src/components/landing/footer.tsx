import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[#23315A] bg-[#070D25]">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
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

          <p className="bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] bg-clip-text text-base italic text-transparent"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            Your picks. Your journey.
          </p>
        </div>
      </div>
    </footer>
  );
}
