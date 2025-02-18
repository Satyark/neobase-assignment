import "@rainbow-me/rainbowkit/styles.css"; 
import "@/styles/globals.css";
import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { WagmiProvider } from "wagmi";
import { rainbowKitConfig } from "@/rainbow-kit";
import { Anybody } from "next/font/google";

const anybody = Anybody({ subsets: ["latin"], weight: ["400", "700"] });
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return( 
    <WagmiProvider config={rainbowKitConfig}>
      <QueryClientProvider client={queryClient}>
        <div className={anybody.className}>
        <RainbowKitProvider theme={darkTheme({
          accentColor: '#2c2ab6',
          accentColorForeground: 'black',
          borderRadius: 'small',
          fontStack: 'system',
          overlayBlur: 'small',
        })}
        modalSize="compact">
         <Component {...pageProps} />
        </RainbowKitProvider>
        </div>
      </QueryClientProvider>
    </WagmiProvider>);
};