"use client";
import { keypairIdentity, Metadata, Metaplex, Nft, Sft, walletAdapterIdentity } from "@metaplex-foundation/js";
import { useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, PublicKey } from "@solana/web3.js";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BurnScrollTransaction, MintScrollTransaction } from "@/contract/scroll-transactions";
import ScrollIcon from "@/../public/icons/scroll-icon.png";

export default function MintScrollButton() {
  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [isLoading, setIsLoading] = useState(false)
  const [nftList, setNftList] = useState<(Nft | Sft | Metadata)[]>([]);

  async function fetchNFTsByCreatorAndOwner() {
    setIsLoading(true)
    if (!wallet || !connection || !publicKey) {
      toast.error("Wallet or connection not available");
      return;
    }
    //81wpB74ga5Hih8yZ75XzdybSeQmbXcujX4omAwq83gUJ
    //2mcKzFa5pQLc6VyUdyReduzahWspvh4sV8naAJCyyMRy
    const programId = new PublicKey("2fFgY52cJdosQ6LBtLBfXE5e4QgTHR9eXzv4mRuQzd1X");
    const metaplex = Metaplex.make(connection).use(walletAdapterIdentity(wallet));

    try {

      const nftsByCreator = await metaplex.nfts().findAllByCreator({ creator: programId });
      const nftsByOwner = await metaplex.nfts().findAllByOwner({ owner: publicKey });
      const nftsByCreatorAndOwner = nftsByCreator.filter((nft) => {
        if (!("mintAddress" in nft)) return false;
        return nftsByOwner.some((ownerNft) => {
          if ("mint" in ownerNft) {
            // @ts-ignore
            return ownerNft.mint.equals(new PublicKey(nft.mintAddress));
          } else if ("mintAddress" in ownerNft) {
            return ownerNft.mintAddress.equals(new PublicKey(nft.mintAddress));
          }
          return false;
        });
      });
      setNftList(nftsByCreatorAndOwner);
      console.log(nftList)
      setIsLoading(false)
    } catch (error) {
      console.log(nftList)

      console.error("Error fetching NFTs by creator and owner:", error);
      toast.error("Failed to fetch NFTs");
    }
  }

  async function handleScrollMint() {
    if (!wallet || !connection) {
      toast.error("Wallet is not connected");
      return;
    }

    try {
      const tx = await MintScrollTransaction(
        wallet,
        connection,
      );

      const explorerUrl = `https://explorer.sonic.game/tx/${tx}?cluster=custom&customUrl=https%3A%2F%2Fdevnet.sonic.game`;
      console.log(tx)

      toast.success(
        <a href={explorerUrl} className="underline" target="_blank" rel="noopener noreferrer">
          View transaction
        </a>
      );

    } catch (err) {
      toast.error('Transaction failed.');
      return;
    }
  }

  async function handleBurnScroll() {
    if (!wallet || !connection) {
      toast.error("Wallet is not connected");
      return;
    }

    if (nftList.length === 0) {
      toast.warn("Mint a scroll to play");
      return;
    }

    try {
      const nftName = nftList[0].name;
      console.log(nftName);

      const match = nftName.match(/#(\d+)/);
      if (!match) {
        toast.error("Invalid NFT name format");
        return;
      }
      const scrollId = match[1];
      const tx = await BurnScrollTransaction(wallet, connection, Number(scrollId));

      const explorerUrl = `https://explorer.sonic.game/tx/${tx}?cluster=custom&customUrl=https%3A%2F%2Fdevnet.sonic.game`;

      toast.success(
        <a href={explorerUrl} className="underline" target="_blank" rel="noopener noreferrer">
          View transaction
        </a>
      );
    } catch (err) {
      console.log("Error during burn transaction: ", err);
      toast.error("Failed to burn scroll");
    }
  }


  useEffect(() => {
    fetchNFTsByCreatorAndOwner();
  }, [wallet, connection, publicKey]);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      <p className="text-center">You have <strong className="underline">{nftList.length}</strong> scrolls in your wallet!</p>
      <div className="flex justify-center mt-2 gap-20">
        <button onClick={() => handleBurnScroll()} className="transition-all flex flex-col items-center gap-2 hover:scale-105">
          <Image src={ScrollIcon} alt="scroll" />
          Burn to play!
        </button>
        <button onClick={() => handleScrollMint()} className="transition-all flex flex-col items-center gap-2 hover:scale-105">
          <Image src={ScrollIcon} alt="scroll" />
          Mint now!
        </button>
      </div>
    </div>
  );
}
