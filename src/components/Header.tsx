import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/../public/logo.svg";
import { Pages } from "@/presentation/enums/pages";
import { useSetRecoilState } from "recoil";
import { quickSelectAtom } from "@/presentation/atoms/quickSelectAtom";
import Image from "next/image";

export default function Header() {
  const pathname = usePathname();
  const setQuickSelectState = useSetRecoilState(quickSelectAtom);

  const menuLinks = [
    {
      link: Pages.MAP,
      text: 'Map'
    },
    {
      link: null,
      text: 'Locations',
      onClick: () => setQuickSelectState({ open: true })
    },
    {
      link: Pages.LEADERBOARD,
      text: 'Leaderboard'
    },
    {
      link: Pages.PROFILE,
      text: 'Profile'
    },
    {
      link: Pages.INVENTORY,
      text: 'Inventory'
    },
  ];

  return (
    <header className="py-2 bg-main">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href={Pages.HOME}>
          <Image src={Logo} width={60} height={20} alt="Seternia Realms" />
        </Link>
        <div>
          <ul className="flex items-center gap-3">
            {menuLinks.map((item, index) => (
              <li key={index}>
                {item.link ? (
                  <Link
                    href={item.link}
                    className={` 
                      hover:underline
                      ${pathname === item.link ? 'text-secondary' : ''}`
                    }
                  >
                    {item.text}
                  </Link>
                ) : (
                  <button
                    onClick={item.onClick}
                    className="hover:underline"
                  >
                    {item.text}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
        <WalletMultiButton />
      </div>
    </header>
  );
}
