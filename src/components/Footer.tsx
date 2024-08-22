import Link from "next/link";
import Image from "next/image";
import DocumentationIcon from "@/../public/icons/book.png";
import DiscordIcon from "@/../public/icons/discord.png";
import XIcon from "@/../public/icons/x.png";


export default function Footer() {
  return (
    <footer className=" sticky bg-main ">
      <div className="container px-4 mx-auto flex items-center justify-between py-1">

        <p className="relative flex items-start text-green-500">
          <span className=" absolute flex h-1 w-1 -left-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1 w-1 bg-green-500"></span>
          </span>
          Alpha is live
        </p>
        <ul className="flex gap-2">
          <li>
            <Link href="https://docs.seternia.com/seternia-realms" target="_blank">
              <Image
                width={16}
                height={16}
                alt="Documentation"
                src={DocumentationIcon}
                loading='lazy'
              />
            </Link>
          </li>
          <li>
            <Link href="#" target="_blank">
              <Image
                width={16}
                height={16}
                alt="Discord"
                src={DiscordIcon}
                loading='lazy'
              />
            </Link>
          </li>
          <li>
            <Link href="https://x.com/SeterniaRealms" target="_blank">
              <Image
                width={16}
                height={16}
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