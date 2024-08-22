import InventorySection from "@/components/Inventory/InventorySection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Inventory',
}
export default function Inventory() {
  return (
    <main className="flex flex-1  bg-brown">
      <section className="container mx-auto  w-full flex-col items-start my-10 lg:px-10">
        <h1 className="text-4xl mb-2 underline decoration-secondary">Your inventory</h1>
        <InventorySection />
      </section>
    </main>
  );
}
