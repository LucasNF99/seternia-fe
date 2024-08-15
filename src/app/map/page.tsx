import MapSection from "@/components/Map/MapSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Seternia Map',
}
export default function Map() {
  return (
    <main className="container mx-auto flex-1">
      <MapSection />
    </main>
  );
}
