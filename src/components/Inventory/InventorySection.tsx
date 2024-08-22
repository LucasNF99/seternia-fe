"use client";
import { Keypair } from "@solana/web3.js";
import { keypairIdentity, Metaplex, Nft, Sft, Metadata } from "@metaplex-foundation/js";
import { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { toast } from "react-toastify";
import Image from "next/image";
import InventoryItem from "./InventoryItem";
import LoadingIcon from "@/../public/icons/only_rune.gif";

export default function InventorySection() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [nfts, setNfts] = useState<(Nft | Sft | Metadata)[]>([]);
  const [nftData, setNftData] = useState<{ image: string; name: string; category: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState(true);

  async function getAllNfts() {
    if (!connection || !publicKey) {
      toast.error('Please connect your wallet.');
      return;
    }

    setLoading(true);
    const keypair = Keypair.generate();

    const metaplex = new Metaplex(connection);
    metaplex.use(keypairIdentity(keypair));

    const owner = publicKey;
    const allNFTs = await metaplex.nfts().findAllByOwner({ owner });

    setNfts(allNFTs);

    const data = await Promise.all(
      allNFTs.map(async (nft) => {
        try {
          const response = await fetch(nft.uri);
          const contentType = response.headers.get("content-type");

          if (contentType && contentType.includes("application/json")) {
            const metadata = await response.json();
            return {
              image: metadata.image,
              name: metadata.name,
              category: metadata.attributes?.find((attr: { trait_type: string }) => attr.trait_type === 'Category')?.value || 'Items',
            };
          } else {
            console.warn(`NFT at ${nft.uri} is not valid JSON`);
            return null;
          }
        } catch (error) {
          console.error(`Failed to fetch metadata for NFT at ${nft.uri}:`, error);
          return null;
        }
      })
    );

    setNftData(data.filter(item => item !== null));
    setLoading(false);
  }

  useEffect(() => {
    getAllNfts();
  }, [publicKey]);

  const filteredNfts = nftData.filter(nft =>
    currentTab ? nft.category === 'Items' : nft.category === 'Heros'
  );

  return (
    <section className="w-full flex flex-col justify-center  mt-4">
      <div className="flex gap-20 mb-1 border-b-2">
        <button
          className={`text-2xl w-20 h-9 ml-10 border-b-4 ${currentTab ? 'border-b-4 border-secondary' : 'border-brown'}`}
          type="button"
          onClick={() => setCurrentTab(true)}
        >
          <span>Items</span>
        </button>
        <button
          className={`text-2xl w-20 h-9 border-b-4 ${!currentTab ? 'border-b-4 border-secondary' : 'border-brown'}`}
          type="button"
          onClick={() => setCurrentTab(false)}
        >
          Heroes
        </button>
      </div>
      {loading && (
        <div className="mx-auto h-full w-full flex items-center justify-center max-w-3xl">
          <Image src={LoadingIcon} width={25} height={25} alt="loading" unoptimized loading="lazy" />
          <span className="ml-2">Loading...</span>
        </div>
      )}
      {!loading && filteredNfts.length > 0 && (
        <div className=" mx-auto grid grid-cols-3 lg:grid-cols-5 gap-4 rounded-sm h-full max-w-6xl max-h-[500px] overflow-x-auto">
          {filteredNfts.map((nft, index) => (
            <InventoryItem
              key={index}
              itemImage={nft.image}
              alt={nft.name}
            />
          ))}
        </div>
      )}
      {!loading && filteredNfts.length == 0 && (
        <div className=" mx-auto max-w-6xl max-h-[500px] overflow-x-auto">
          <p className="mt-8">No {currentTab ? 'items' : 'heroes'} found.</p>
        </div>
      )}
    </section>
  );
}
