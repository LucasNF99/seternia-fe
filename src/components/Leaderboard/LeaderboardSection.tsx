"use client";

import { PlayerInfo } from "@/models/PlayerInfo";
import { PlayerInfoCoordinator } from "@/scripts/GetPlayers";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { useConnection } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";

export default function LeaderboardSection() {
  const { connection } = useConnection();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [playersInfo, setPlayersInfo] = useState<PlayerInfo[]>([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    PlayerInfoCoordinator.fetchPage(
      connection,
      page,
      20,
      search,
      search !== ''
    ).then((fetchedPlayersInfo) => {
      setPlayersInfo(fetchedPlayersInfo)
    });
  }, [connection, page, search]);
  console.log(playersInfo[0])

  return (
    <section className="flex container mx-auto flex-col items-center flex-1 w-full px-2">
      <div className="w-full mt-10">
        <label htmlFor="Search" className='flex items-center gap-2'>
          <div className='relative w-full'>
            <MagnifyingGlassIcon className='absolute left-2 top-1/2 transform -translate-y-1/2' width={20} />
            <input
              required
              className='bg-transparent outline-none bg-violet-950 rounded-lg    pl-10 pr-2 py-2 w-full'
              type="search"
              name="Search"
              id="Search"
              placeholder='Search'
              onChange={(evt) => setSearchInput(evt.target.value)}
              value={searchInput}
            />
          </div>
          <button
            onClick={() => {
              setSearch(searchInput);
              setPage(1);
            }}
            className="bg-purple-950 p-2 rounded-xl"
            type="button">
            Search
          </button>
        </label>
      </div>
      <div className="mt-8 w-full p-2">
        <div className="grid font-bold grid-cols-3 justify-items-center p-2 rounded-lg">
          <p>Name</p>
          <p>Position</p>
          <p>Wallet</p>
        </div>
        <ul className="flex flex-col gap-1 bg-purple-[#161128]  rounded-lg ">
          {/* {playersInfo.map((info: PlayerInfo, index: number) => (
            
            (info.name && info.position) &&
            <li key={index} className="grid  grid-cols-3 justify-items-center border-violet-950 border-2 p-2 rounded-lg">

              <p className="bg-violet-950 self-center bg-opacity-70 px-2 rounded-lg"> {info.name}</p>
              <p className="bg-violet-950 bg-opacity-70 px-2 rounded-lg">
                20
              </p>
              <p className="bg-violet-950 bg-opacity-70 px-2 rounded-lg">
                {info.position}
              </p>
            </li>
          ))} */}
        </ul>
      </div>
    </section>
  );
}
