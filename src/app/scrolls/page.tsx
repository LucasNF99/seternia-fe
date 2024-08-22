import ScrollsSection from "@/components/Scrolls/ScrollsSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Scrolls',
}
export default function Scrolls() {
  return (
    <main className="flex-1  bg-brown">
      <ScrollsSection />
    </main>
  );
}
