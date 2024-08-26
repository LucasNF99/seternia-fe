import ChestSection from "@/components/Rewards/ChestSection";
import ScrollsSection from "@/components/Scrolls/ScrollsSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Rewards',
}
export default function Rewards() {
  return (
    <main className="flex-1  bg-gradient-to-b from-dark1 to-dark2">
      <h1 className="text-4xl mb-6 text-center mt-8">Open chests and find great rewards</h1>
      <ChestSection />
    </main>
  );
}
