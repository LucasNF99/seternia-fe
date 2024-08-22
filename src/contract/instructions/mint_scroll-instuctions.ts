import { Idl, Program, Provider } from "@coral-xyz/anchor";
import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { MintScrollIdl, type ScrollMint } from '../../program';
import * as instructions from "../types/mint_scroll-types";

const programId = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');

export const getScrollMintProgram = (provider: Provider) => new Program(
  MintScrollIdl as Idl,
  programId,
  provider
) as unknown as Program<ScrollMint>;


export async function MintScroll(
    args: instructions.ScrollMintNFTArgs,
    accounts: instructions.MintScrollNFTAccount,
    provider: Provider
): Promise<TransactionInstruction> {
    const scrollProgram = getScrollMintProgram(provider);
    const ix = await scrollProgram.methods.mint(
      // @ts-ignore
        args.bump
    ).accountsStrict({
      payer: accounts.payer,
      admin: accounts.admin,
      treasure: accounts.treasure,
      mint:accounts.mint,
      collectionMint:accounts.collectionMint,
      tokenAccount: accounts.tokenAccount,
      masterEditionAccount: accounts.masterEditionAccount,
      collectionMasterEdition:accounts.collectionMasterEdition,
      nftMetadata:accounts.nftMetadata,
      collectionMetadata:accounts.collectionMetadata,
      delegate:accounts.delegate,
      associatedTokenProgram: accounts.associatedTokenProgram,
      rent: accounts.rent,
      systemProgram: accounts.systemProgram,
      tokenProgram: accounts.tokenAccount,
      metadataProgram: accounts.metadataProgram
    }).instruction();
    return ix;
}