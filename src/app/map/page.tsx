import MapSection from "@/components/Map/MapSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Seternia Map',
}
export default function Map() {
  return (
    <main className=" flex-1 bg-gradient-to-b from-dark1 to-dark2">
      <MapSection />
    </main>
  );
}
