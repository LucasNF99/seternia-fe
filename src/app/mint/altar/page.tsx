import MintSection from "@/components/MintForms/MintSection";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: 'Mint Your Hero'
}
export default function MintPage() {

  return (
    <div className="flex flex-col flex-1 justify-center items-center bg-mint bg-center bg-cover py-4">
      <MintSection />
    </div>
  );
}
