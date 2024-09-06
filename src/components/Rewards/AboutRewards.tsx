import Image from "next/image";
import key from "@/../public/rewards/reward-key.png";

export default function AboutRewards() {

  return (
    <article className="bg-brown border-gradient flex items-center justify-between rounded-xl px-6 py-10 max-w-5xl w-full my-20 flex-col lg:flex-row gap-2">
      <div>
        <h2 className="font-bold text-4xl">
          How to open chests?
        </h2>
        <p className="text-2xl my-10">
          Play Endless Tower and find keys in the dungeon. Return with the keys and mint them, this way they will become NFTs, and then you will be able to open the chests.
        </p>
        <p className="text-2xl">
          Each key can open a specific chest, each one has a different rarity and rewards of different amounts.
        </p>
      </div>
      <div className="rounded-xl bg-gradient-to-b flex justify-center items-center from-dark1 to-dark2 p-10 w-[300px] h-[300px] min-w-[300px] min-h-[300px]">
        <Image src={key} alt="Key" width={190} />
      </div>
    </article>

  );
}
