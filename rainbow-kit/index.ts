import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { arbitrum, polygon } from "viem/chains";

export const rainbowKitConfig = getDefaultConfig({
  appName: "Web3 Feeds",
  projectId: "922270fdc2b7bf90c5d38fd0bd37f45f", //TODO: add project id later once everything gets functional
  chains: [arbitrum,polygon],
  ssr: true
});