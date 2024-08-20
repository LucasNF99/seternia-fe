"use client";
import { Keypair } from "@solana/web3.js";
import { keypairIdentity, Metaplex, Nft, Sft, Metadata } from "@metaplex-foundation/js";
import { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { toast } from "react-toastify";
import Image from "next/image";
import InventoryItem from "./InventoryItem";
import LoadingIcon from "@/../public/icons/loading.svg";


export default function InventorySection() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [nfts, setNfts] = useState<(Nft | Sft | Metadata)[]>([]);
  const [nftData, setNftData] = useState<{ image: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);  // Estado de carregamento

  async function getAllNfts() {
    if (!connection || !publicKey) {
      toast.error('Please connect your wallet.');
      return;
    }

    setLoading(true);  // Inicia o carregamento
    const keypair = Keypair.generate();

    const metaplex = new Metaplex(connection);
    metaplex.use(keypairIdentity(keypair));

    const owner = publicKey;
    const allNFTs = await metaplex.nfts().findAllByOwner({ owner });

    setNfts(allNFTs);

    // Fetch images and names
    const data = await Promise.all(
      allNFTs.map(async (nft) => {
        const response = await fetch(nft.uri);
        const metadata = await response.json();
        return {
          image: metadata.image, // Get the image URL from the JSON
          name: metadata.name,   // Get the name from the JSON
        };
      })
    );

    setNftData(data);
    setLoading(false);  // Termina o carregamento
  }

  useEffect(() => {
    getAllNfts();
  }, [publicKey]);

  return (
    <section className="h-full w-full">
      {loading ? (
        <div className=" mx-auto  h-full w-full flex items-center justify-center max-w-3xl">
          <Image src={LoadingIcon} width={25} height={25} alt="loading" />
          <span className="ml-2">Loading...</span>
        </div>
      ) : (
        <div className=" mx-auto grid grid-cols-5 gap-4 p-4 rounded-sm h-full bg-brown max-w-6xl max-h-[500px] overflow-x-auto">
          {nftData.map((nft, index) => (
            <InventoryItem
              key={index}
              itemImage={nft.image}
              alt={nft.name}
            />
          ))}
        </div>
      )}
    </section>
  );
}
