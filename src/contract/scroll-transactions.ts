import { AnchorProvider, Program, web3 } from "@coral-xyz/anchor";
import { Connection, PublicKey, Transaction, ComputeBudgetProgram } from "@solana/web3.js";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import BN from "bn.js";
import { getAssociatedTokenAddress, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { getScrollBurnProgram, getScrollMintProgram } from "./instructions";
import { TreasureScroll } from "./types";

const info = {
  TOKEN_METADATA_PROGRAM_ID: new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"),
}

export const MintScrollTransaction = async (
  wallet: AnchorWallet,
  connection: Connection,
) => {

  if (!wallet.publicKey || !connection) {
    console.log("Warning: Wallet not connected");
    return;
  }

  const provider = new AnchorProvider(connection, wallet, {});
  const program = getScrollMintProgram(provider);

  const [TreasuryKey, bump] = PublicKey.findProgramAddressSync(
    [Buffer.from("TRESURE_SEED")],
    program.programId
  );

  const treasury_data = await program.account.treasure.fetch(TreasuryKey) as TreasureScroll;

  const mints = treasury_data.mints.add(new BN(1));
  const [MintKey] = PublicKey.findProgramAddressSync(
    [Buffer.from("mint"), Buffer.from(mints.toArray("le", 8))],
    program.programId
  );

  const MintTokenAccount = await getAssociatedTokenAddress(
    MintKey,
    wallet.publicKey
  );

  // Deriva as chaves públicas de Collection, Metadata, e Master Edition
  const [CollectionKey] = PublicKey.findProgramAddressSync(
    [Buffer.from("collection")],
    program.programId
  );
  const [CmetadataAddress] = PublicKey.findProgramAddressSync(
    [Buffer.from("metadata"), info.TOKEN_METADATA_PROGRAM_ID.toBuffer(), CollectionKey.toBuffer()],
    info.TOKEN_METADATA_PROGRAM_ID
  );
  const [CmasterEdition] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      info.TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      CollectionKey.toBuffer(),
      Buffer.from("edition")
    ],
    info.TOKEN_METADATA_PROGRAM_ID
  );
  const [metadataAddress] = PublicKey.findProgramAddressSync(
    [Buffer.from("metadata"), info.TOKEN_METADATA_PROGRAM_ID.toBuffer(), MintKey.toBuffer()],
    info.TOKEN_METADATA_PROGRAM_ID
  );
  const [masterEdition] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      info.TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      MintKey.toBuffer(),
      Buffer.from("edition")
    ],
    info.TOKEN_METADATA_PROGRAM_ID
  );
  const [delegate] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      info.TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      CollectionKey.toBuffer(),
      Buffer.from("collection_authority"),
      TreasuryKey.toBuffer()
    ],
    info.TOKEN_METADATA_PROGRAM_ID
  );

  const transaction = new Transaction();
  const computeLimit = ComputeBudgetProgram.setComputeUnitLimit({ units: 800_000 });

  const mintIx = await program.methods.mint(mints, bump).accounts({
    payer: wallet.publicKey,
    admin: treasury_data.admin,
    treasure: TreasuryKey,
    mint: MintKey,
    collectionMint: CollectionKey,
    tokenAccount: MintTokenAccount,
    masterEditionAccount: masterEdition,
    collectionMasterEdition: CmasterEdition,
    nftMetadata: metadataAddress,
    collectionMetadata: CmetadataAddress,
    delegate: delegate,
    associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
    rent: web3.SYSVAR_RENT_PUBKEY,
    systemProgram: web3.SystemProgram.programId,
    tokenProgram: TOKEN_PROGRAM_ID,
    metadataProgram: info.TOKEN_METADATA_PROGRAM_ID,
  }).instruction();

  transaction.add(mintIx).add(computeLimit);

  try {
    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    transaction.feePayer = wallet.publicKey;

    if (wallet.signTransaction) {
      const signedTx = await wallet.signTransaction(transaction);
      const serializedTx = signedTx.serialize();
      const signature = await connection.sendRawTransaction(serializedTx, { skipPreflight: false });

      const blockhash = await connection.getLatestBlockhash();
      await connection.confirmTransaction({
        signature,
        blockhash: blockhash.blockhash,
        lastValidBlockHeight: blockhash.lastValidBlockHeight
      }, "processed");

      console.log("Successfully minted and activated NFT. Signature: ", signature);
      return signature;
    }
  } catch (error) {
    console.log("Error in minting and activating NFT transaction", error);
  }

  return null;
};


export const BurnScrollTransaction = async (
  wallet: AnchorWallet,
  connection: Connection,
  scrollId: number
) => {
  const id = new BN(scrollId);
  if (!wallet.publicKey || !connection) {
    console.log("Warning: Wallet not connected");
    return;
  }


  const provider = new AnchorProvider(connection, wallet, {});
  const program = getScrollBurnProgram(provider);

  const [TreasuryKey] = PublicKey.findProgramAddressSync(
    [Buffer.from("TRESURE_SEED")],
    program.programId
  );

  const [PositionKey] = PublicKey.findProgramAddressSync(
    [Buffer.from("endless"), wallet.publicKey.toBuffer()],
    program.programId
  );

  const [MintKey] = PublicKey.findProgramAddressSync(
    [Buffer.from("mint"),Buffer.from(id.toArray("le", 8))],
    program.programId
  );

  const [metadataAddress] = PublicKey.findProgramAddressSync(
    [Buffer.from("metadata"),info.TOKEN_METADATA_PROGRAM_ID.toBuffer(),MintKey.toBuffer()],
    info.TOKEN_METADATA_PROGRAM_ID
  );

  const MintTokenAccount = await getAssociatedTokenAddress(
    MintKey,
    wallet.publicKey
  );

  const transaction = new Transaction();
  const computeLimit = ComputeBudgetProgram.setComputeUnitLimit({ units: 800_000 });

  const mintIx = await program.methods.ticket().accounts({
    payer: wallet.publicKey,
    treasure: TreasuryKey,
    position: PositionKey,
    mint: MintKey,
    associated: MintTokenAccount,
    metadata: metadataAddress,
    associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
    rent: web3.SYSVAR_RENT_PUBKEY,
    systemProgram: web3.SystemProgram.programId,
    tokenProgram: TOKEN_PROGRAM_ID,
    metadataProgram:  info.TOKEN_METADATA_PROGRAM_ID

  }).instruction();

  transaction.add(mintIx).add(computeLimit);
  
  try {
    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    transaction.feePayer = wallet.publicKey;

    if (wallet.signTransaction) {
      const signedTx = await wallet.signTransaction(transaction);
      const serializedTx = signedTx.serialize();
      const signature = await connection.sendRawTransaction(serializedTx, { skipPreflight: false });

      const blockhash = await connection.getLatestBlockhash();
      await connection.confirmTransaction({
        signature,
        blockhash: blockhash.blockhash,
        lastValidBlockHeight: blockhash.lastValidBlockHeight
      }, "processed");

      console.log("Successfully burned NFT. Signature: ", signature);
      return signature;
    }
  } catch (error) {
    console.error(error)
    return error
  }
  return null
}