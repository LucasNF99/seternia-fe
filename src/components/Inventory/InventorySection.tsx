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
  const [nftData, setNftData] = useState<{ image: string; name: string; category: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState(false);

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
        const response = await fetch(nft.uri);
        const metadata = await response.json();
        return {
          image: metadata.image,
          name: metadata.name,
          category: metadata.attributes?.find((attr: { trait_type: string; }) => attr.trait_type === 'Category')?.value || 'Items',
        };
      })
    );

    setNftData(data);
    setLoading(false);
  }

  useEffect(() => {
    getAllNfts();
  }, [publicKey]);

  const filteredNfts = nftData.filter(nft =>
    currentTab ? nft.category === 'Items' : nft.category === 'Heros'
  );

  return (
    <section className="h-full w-full flex flex-col justify-center items-center">
      <div className="flex gap-20 mb-6">
        <button
          className={'text-2xl w-20 h-9'}
          type="button"
          onClick={() => setCurrentTab(true)}
        >
          <span className={`${currentTab ? '' : 'hidden'} animate-ping text-secondary`}>&bull;</span>
          <span className={`${currentTab ? 'underline' : ''}`}>Items</span>
        </button>
        <button
          className={'text-2xl w-20 h-9'}
          type="button"
          onClick={() => setCurrentTab(false)}
        >
          <span className={`${!currentTab ? '' : 'hidden'} animate-ping text-secondary`}>&bull;</span>
          <span className={`${!currentTab ? 'underline' : ''}`}>
            Heros
          </span>
        </button>
      </div>
      {loading ? (
        <div className="mx-auto h-full w-full flex items-center justify-center max-w-3xl">
          <Image src={LoadingIcon} width={25} height={25} alt="loading" />
          <span className="ml-2">Loading...</span>
        </div>
      ) : (
        <div className="mx-auto grid grid-cols-3 lg:grid-cols-5 gap-4 p-4 rounded-sm h-full bg-brown max-w-6xl max-h-[500px] overflow-x-auto">
          {filteredNfts.map((nft, index) => (
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
