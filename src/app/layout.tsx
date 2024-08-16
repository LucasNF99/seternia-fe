"use client";
import { Spectral } from "next/font/google";
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  WalletModalProvider
} from '@solana/wallet-adapter-react-ui';
import React, { useMemo } from "react";
import { RecoilRoot } from "recoil";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";
import * as web3 from "@solana/web3.js";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CustomToast } from "@/components/CustomToast";
import { QuickSelectModal } from "@/components/QuickSelect/QuickSelectModal";

const spectral = Spectral({
  subsets: ["latin"],
  weight: "400",

});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const endpoint = web3.clusterApiUrl("devnet");
  const wallets = useMemo(() => [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter()
  ], []);
  return (
    <html lang="en">
      <RecoilRoot>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
              <body className={`${spectral.className} bg-black text-white flex flex-1 flex-grow flex-col transition-all h-screen`}>
                <Header />
                {children}
                <Footer />
                <CustomToast />
                <QuickSelectModal />
              </body>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </RecoilRoot>
    </html>
  );
}
