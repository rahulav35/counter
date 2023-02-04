import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { AppProps } from "next/app";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { goerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import "@rainbow-me/rainbowkit/styles.css";

const { chains, provider } = configureChains([goerli], [publicProvider()]);

const { connectors, wallets } = getDefaultWallets({
  chains,
  appName: "prediction",
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export { provider, wallets };

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
