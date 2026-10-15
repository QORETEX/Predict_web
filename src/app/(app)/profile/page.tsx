import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
};

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-lg px-4 pt-6">
      <h1 className="text-xl font-bold">Profile</h1>
    </div>
  );
}
