import Link from "next/link";
import Image from "next/image";
import DocumentationIcon from "@/../public/icons/book.svg";
import DiscordIcon from "@/../public/icons/discord.svg";
import XIcon from "@/../public/icons/xicon.svg";


export default function Footer() {
  return (
    <footer className=" sticky bg-main ">
      <div className="container px-4 mx-auto flex items-center justify-between py-6">

        <p className=" flex items-center gap-1 text-green-500">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Alpha is live
        </p>
        <ul className="flex gap-2">
          <li>
            <Link href="https://docs.seternia.com/seternia-realms" target="_blank">
              <Image
                width={24}
                height={24}
                alt="Documentation"
                src={DocumentationIcon}
                loading='lazy'
              />
            </Link>
          </li>
          <li>
            <Link href="#" target="_blank">
              <Image
                width={24}
                height={24}
                alt="Discord"
                src={DiscordIcon}
                loading='lazy'
              />
            </Link>
          </li>
          <li>
            <Link href="https://x.com/SeterniaRealms" target="_blank">
              <Image
                width={24}
                height={24}
                alt="Twitter"
                src={XIcon}
                loading='lazy'
              />
            </Link>
          </li>
        </ul>

      </div>
    </footer>
  )
}