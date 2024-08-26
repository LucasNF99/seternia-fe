import { Idl, Program, Provider } from "@coral-xyz/anchor";
import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { ScrollIdl, type ScrollMint } from '../../program';
import * as instructions from "../types/scroll-types";

const programId = new PublicKey('EQtJRtAHKJRNUGRUnxvqwBARLw7ktrFuZxAQmmXaPkZm');

export const getScrollMintProgram = (provider: Provider) => new Program(
  ScrollIdl as Idl,
  programId,
  provider
) as unknown as Program<ScrollMint>;


export const getScrollBurnProgram = (provider: Provider) => new Program(
  ScrollIdl as Idl,
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


export async function BurnScroll(
    accounts: instructions.BurnScrollNFTAccount,
    provider: Provider
): Promise<TransactionInstruction> {
    const scrollProgram = getScrollBurnProgram(provider);
    const ix = await scrollProgram.methods.ticket().accounts(
      {
      payer: accounts.payer,
      treasure: accounts.treasure,
      position: accounts.position,
      mint: accounts.mint,
      associated: accounts.associated,
      metadata: accounts.metadata,
      associatedTokenProgram: accounts.associatedTokenProgram,
      rent: accounts.rent,
      systemProgram: accounts.systemProgram,
      tokenProgram: accounts.tokenProgram,
      metadataProgram: accounts.metadataProgram
    }
    ).instruction();
    return ix;
}