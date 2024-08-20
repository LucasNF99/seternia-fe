import InventorySection from "@/components/Inventory/InventorySection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Inventory',
}
export default function Inventory() {
  return (
    <main className="flex flex-1 w-full flex-col items-center py-6 bg-brown">
      <h1 className="text-4xl mb-2 underline decoration-secondary">Inventory</h1>
      <InventorySection />
    </main>
  );
}
