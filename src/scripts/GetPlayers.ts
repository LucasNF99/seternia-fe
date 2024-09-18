import bs58 from 'bs58'
import * as web3 from '@solana/web3.js'
import { PlayerInfo } from '@/models/PlayerInfo';


// const RANKING_PROGRAM = 'GkUZfjXK2DuQLx5oSn6q3gsqHoWCGGru5eQbZgQyogLe';
const RANKING_PROGRAM = 'GkUZfjXK2DuQLx5oSn6q3gsqHoWCGGru5eQbZgQyogLe';

export class PlayerInfoCoordinator {
  static accounts: web3.PublicKey[] = [];

  static async prefetchAccounts(connection: web3.Connection, search: string) {
    const accounts = await connection.getProgramAccounts(
      new web3.PublicKey(RANKING_PROGRAM),
      {
        dataSlice: { offset: 1, length: 12 },
        filters: search == '' ? [] : [
          {
            memcmp:
            {
              offset: 5,
              bytes: bs58.encode(Buffer.from(search))
            }
          }
        ]
      }
    );
    // @ts-ignore
    accounts.sort((a, b) => {
      const lengthA = a.account.data.readUInt32LE(0);
      const lengthB = b.account.data.readUInt32LE(0);

      const dataA = a.account.data.slice(4, 4 + lengthA);
      const dataB = b.account.data.slice(4, 4 + lengthB);

      return dataA.compare(dataB);
    });

    this.accounts = accounts.map(account => account.pubkey);
  };

  static async fetchPage(connection: web3.Connection, page: number, perPage: number, search: string, reload: boolean = false): Promise<PlayerInfo[]> {
    if (this.accounts.length === 0 || reload) {
      await this.prefetchAccounts(connection, search);
    };

    const paginatedPublicKeys = this.accounts.slice(
      (page - 1) * perPage,
      page * perPage
    );

    if (!paginatedPublicKeys.length) {
      return [];
    }

    const accounts = await connection.getMultipleAccountsInfo(paginatedPublicKeys);
    const playerInfos = accounts.reduce((accum: PlayerInfo[], account) => {
      const playerInfo = PlayerInfo.deserialize(account?.data);
      if (!playerInfo) {
        return accum;
      }
      return [...accum, playerInfo];
    }, []);

    return playerInfos;
  }
}