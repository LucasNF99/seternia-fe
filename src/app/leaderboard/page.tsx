import LeaderboardSection from "@/components/Leaderboard/LeaderboardSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Leaderboard',
}
export default function LeaderBoard() {
  return (
    <main className="flex-1   bg-gradient-to-b from-dark1 to-dark2 flex flex-col justify-center items-center">
      <LeaderboardSection />
    </main>
  );
}
