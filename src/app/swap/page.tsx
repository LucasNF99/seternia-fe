

import SwapCard from "@/components/Swap/SwapCard";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: 'Swap'
}
export default function Swap() {
  return (
    <main className="flex flex-1 justify-center items-center bg-center bg-cover bg-town-hall">
      <SwapCard />
    </main>
  );
}