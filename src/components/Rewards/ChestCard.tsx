'use client';
import Image from "next/image";
import ChestIcon from "@/../public/rewards/chest.png";
type IChestCardProps = {
  title: string;
  image: string;
  transaction: () => void;
};
export default function ChestCard({
  title,
  image,
  transaction
}: IChestCardProps) {

  return (
    <article className="bg-brown flex rounded-xl flex-col justify-center items-center px-6 py-3 max-w-[426px] w-full">
      <h3 className="text-3xl py-2 text-center">{title}</h3>
      <div className="rounded-xl  bg-gradient-to-b flex justify-center items-center from-dark1 to-dark2 w-full max-w-64 h-[360px]">
        <Image src={ChestIcon} alt={title} width={170} />
      </div>
      <button className="text-3xl bg-main mt-3 py-2 px-4 rounded-xl" type="button" onClick={transaction}>
        Open Chest
      </button>
    </article>
  );
}
