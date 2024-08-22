import { AnchorProvider, Program, web3 } from "@coral-xyz/anchor";
import { Connection, PublicKey, Transaction, ComputeBudgetProgram } from "@solana/web3.js";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import BN from "bn.js";
import { getAssociatedTokenAddress, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { getScrollMintProgram } from "./instructions";
const info = {
  TOKEN_METADATA_PROGRAM_ID: new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"),
}

export const MintScrollTransaction = async (
  wallet: AnchorWallet,
  connection: Connection,
) => {
  // Verifica se a carteira e a conexão estão configuradas
  if (!wallet.publicKey || !connection) {
    console.log("Warning: Wallet not connected");
    return;
  }

  // Configura o Provider
  const provider = new AnchorProvider(connection, wallet, {});
  const program = await getScrollMintProgram(provider);

  // Deriva várias chaves públicas usadas no processo
  const [TreasuryKey, bump] = await PublicKey.findProgramAddressSync(
    [Buffer.from("TRESURE_SEED")],
    program.programId
  );
  const treasury_data = await program.account.treasure.fetch(TreasuryKey);

  const mints = treasury_data.mints.add(new BN(1));
  const [MintKey] = await PublicKey.findProgramAddressSync(
    [Buffer.from("mint"), Buffer.from(mints.toArray("le", 8))],
    program.programId
  );

  const MintTokenAccount = await getAssociatedTokenAddress(
    MintKey,
    wallet.publicKey
  );

  // Deriva as chaves públicas de Collection, Metadata, e Master Edition
  const [CollectionKey] = await PublicKey.findProgramAddressSync(
    [Buffer.from("collection")],
    program.programId
  );
  const [CmetadataAddress] = await PublicKey.findProgramAddressSync(
    [Buffer.from("metadata"), info.TOKEN_METADATA_PROGRAM_ID.toBuffer(), CollectionKey.toBuffer()],
    info.TOKEN_METADATA_PROGRAM_ID
  );
  const [CmasterEdition] = await PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      info.TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      CollectionKey.toBuffer(),
      Buffer.from("edition")
    ],
    info.TOKEN_METADATA_PROGRAM_ID
  );
  const [metadataAddress] = await PublicKey.findProgramAddressSync(
    [Buffer.from("metadata"), info.TOKEN_METADATA_PROGRAM_ID.toBuffer(), MintKey.toBuffer()],
    info.TOKEN_METADATA_PROGRAM_ID
  );
  const [masterEdition] = await PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      info.TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      MintKey.toBuffer(),
      Buffer.from("edition")
    ],
    info.TOKEN_METADATA_PROGRAM_ID
  );
  const [delegate] = await PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      info.TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      CollectionKey.toBuffer(),
      Buffer.from("collection_authority"),
      TreasuryKey.toBuffer()
    ],
    info.TOKEN_METADATA_PROGRAM_ID
  );

  // Cria uma nova transação
  const transaction = new Transaction();
  const computeLimit = ComputeBudgetProgram.setComputeUnitLimit({ units: 800_000 });

  // Adiciona as instruções de mint à transação
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
    // Configura a transação para assinatura e envio
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
