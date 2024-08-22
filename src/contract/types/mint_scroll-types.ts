import BN from "bn.js";
import { PublicKey } from '@solana/web3.js';

export type ScrollMintNFTArgs = {
  id: string | number | BN | Uint8Array | number[] | Buffer;
  bump:number
}

export interface Position {
  admin: PublicKey; 
  name:String; 
  play:BN,
  startTimestamp:BN, 
  stopTimestamp:BN, 
  times:BN, 
  record:number
}

export interface MintScrollNFTAccount {
  payer: PublicKey;
  admin: PublicKey;
  treasure: PublicKey;
  mint: PublicKey;
  collectionMint: PublicKey;
  tokenAccount: PublicKey;
  masterEditionAccount: PublicKey;
  collectionMasterEdition: PublicKey;
  nftMetadata: PublicKey;
  collectionMetadata: PublicKey;
  delegate: PublicKey;
  associatedTokenProgram: PublicKey;
  rent: PublicKey;
  systemProgram: PublicKey;
  tokenProgram: PublicKey;
  metadataProgram: PublicKey;
}
