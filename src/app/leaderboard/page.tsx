import LeaderboardSection from "@/components/Leaderboard/LeaderboardSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Leaderboard',
}
export default function LeaderBoard() {
  return (
    <main className="container mx-auto flex flex-1 items-center justify-center">
      <LeaderboardSection />
    </main>
  );
}
