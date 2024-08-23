"use client";
import ScrollIcon from "@/../public/icons/scroll-icon.png";
import { MintScrollTransaction } from "@/contract/scroll-transactions";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import Image from "next/image";
import { toast } from "react-toastify";

export default function MintScrollButton() {
  const wallet = useAnchorWallet();
  const { connection } = useConnection();

  async function handleScrollMint() {
    if (!wallet || !connection) {
      console.error("Wallet is not connected");
      return;
    }

    try {
      const tx = await MintScrollTransaction(
        wallet,
        connection,
      );

      const explorerUrl = `https://explorer.sonic.game/tx/${tx}?cluster=custom&customUrl=https%3A%2F%2Fdevnet.sonic.game`;

      toast.success(
        <a href={explorerUrl} className="underline" target="_blank" rel="noopener noreferrer">
          View transaction
        </a>
      );
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="flex justify-center mt-2">
      <button onClick={() => handleScrollMint()} className="transition-all flex flex-col items-center gap-2 hover:scale-105">
        <Image src={ScrollIcon} alt="scroll" />
        Mint now!
      </button>
    </div>
  );
}
