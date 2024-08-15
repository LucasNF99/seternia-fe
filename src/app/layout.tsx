"use client";
import { Spectral } from "next/font/google";
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  WalletModalProvider
} from '@solana/wallet-adapter-react-ui';
import React, { useMemo } from "react";
import { RecoilRoot } from "recoil";
import { clusterApiUrl } from '@solana/web3.js';
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
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(
    () => [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );
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
