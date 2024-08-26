"use client";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSetRecoilState } from "recoil";
import Image from "next/image";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import { Pages } from "@/presentation/enums/pages";
import { quickSelectAtom } from "@/presentation/atoms/quickSelectAtom";
import Logo from "@/../public/logo.svg";
import ScrollIcon from "@/../public/icons/scroll-icon.png";

export default function Header() {
  const pathname = usePathname();
  const setQuickSelectState = useSetRecoilState(quickSelectAtom);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuLinks = [
    {
      link: Pages.MAP,
      text: "Map",
    },
    {
      link: null,
      text: "Locations",
      onClick: () => setQuickSelectState({ open: true }),
    },
    {
      link: Pages.LEADERBOARD,
      text: "Leaderboard",
    },
    {
      link: Pages.REWARDS,
      text: "Rewards",
    },
    {
      link: Pages.PROFILE,
      text: "Profile",
    },
    {
      link: Pages.INVENTORY,
      text: "Inventory",
    },
  ];

  return (
    <header className="min-h-[78px] bg-main flex items-center">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href={Pages.HOME}>
          <Image src={Logo} width={80} height={40} alt="Seternia Realms" />
        </Link>


        <div
          className={`fixed top-0 right-0 h-full w-3/4 bg-main z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"
            } md:static md:transform-none md:w-auto md:flex md:flex-row items-center gap-3`}
        >
          <ul className="flex flex-col md:flex-row items-center gap-3 mt-20 md:mt-0">
            {menuLinks.map((item, index) => (
              <li key={index}>
                {item.link ? (
                  <Link
                    href={item.link}
                    className={`hover:underline ${pathname === item.link ? "text-yell" : ""
                      }`}
                  >
                    {item.text}
                  </Link>
                ) : (
                  <button onClick={item.onClick} className="hover:underline">
                    {item.text}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-4">
          <Link href={Pages.SCROLLS} className="relative rounded-sm p-1 bg-brown border-gradient scroll-button">
            <Image src={ScrollIcon} width={20} height={20} alt="Scrolls" loading="lazy" />
          </Link>


          <div className="hidden md:block">
            <WalletMultiButton />
          </div>
        </div>

        <div className="md:hidden z-[100]">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <XMarkIcon width={24} /> : <Bars3Icon width={24} />}
          </button>
        </div>

      </div>
    </header>
  );
}
