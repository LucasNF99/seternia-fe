import { Pages } from "@/presentation/enums/pages";
import { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: 'Town Hall'
}
export default function TownHall() {
  return (

    <main className="flex flex-1 justify-center items-center bg-center bg-cover bg-town-hall">
      <ul className="flex flex-col gap-10">
        <li>
          <Link className="bg-brown text-center hover:scale-105 block transition-all rounded-md border-gradient w-[344px] py-4 px-1" href={Pages.SWAP}>Coin Merchant</Link>
        </li>
        <li>
          <Link className="bg-brown text-center hover:scale-105 block transition-all rounded-md border-gradient w-[344px] py-4 px-1" href="#">Farmer</Link>
        </li>
        <li>
          <Link className="bg-brown text-center hover:scale-105 block transition-all rounded-md border-gradient w-[344px] py-4 px-1" href="#">Quest Master</Link>
        </li>
      </ul>
    </main>

  );
}