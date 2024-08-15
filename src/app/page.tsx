import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Home',
}
export default function Home() {
  return (
    <main className="container mx-auto flex flex-1 items-center justify-center">
      <h1>Building...</h1>
    </main>
  );
}
