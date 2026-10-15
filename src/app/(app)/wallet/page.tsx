import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wallet",
};

export default function WalletPage() {
  return (
    <div className="mx-auto max-w-lg px-4 pt-6">
      <h1 className="text-xl font-bold">Wallet</h1>
    </div>
  );
}
