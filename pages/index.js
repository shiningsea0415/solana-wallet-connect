import styles from '../styles/Home.module.css'
import { useMemo, useState, useEffect } from 'react';
import { ConnectionProvider, useWallet, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    GlowWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    TorusWalletAdapter,
    BackpackWalletAdapter
} from '@solana/wallet-adapter-wallets';
import {
  WalletConnectButton,
    WalletModalProvider,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { MetaplexProvider } from '../components/MetaplexProvider';
import { ShowNFTs } from '../components/ShowNFTs';
import '@solana/wallet-adapter-react-ui/styles.css';

export default function Home() {

  const [network, setNetwork] = useState(WalletAdapterNetwork.Testnet);

  const wallet = useWallet();

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
      () => [
          new PhantomWalletAdapter(),
          new GlowWalletAdapter(),
          new SlopeWalletAdapter(),
          new SolflareWalletAdapter({ network }),
          new TorusWalletAdapter(),
          new BackpackWalletAdapter()
    ],
      []
  );

  const handleChange = (event) => {
    console.log(event.target.value);
    switch(event.target.value){
      case "devnet":
        setNetwork(WalletAdapterNetwork.Devnet);
        break;
      case "mainnet":
        setNetwork(WalletAdapterNetwork.Mainnet);
      break;
      case "testnet":
        setNetwork(WalletAdapterNetwork.Testnet);
        break;
      default:
        setNetwork(WalletAdapterNetwork.Testnet);
        break;
    }
  };


  return (
    <div>
      <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
        <MetaplexProvider>
          <div className={styles.App}>
            <WalletMultiButton />
            <ShowNFTs onClusterChange={handleChange} />
          </div>
        </MetaplexProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  </div>
  );


}

