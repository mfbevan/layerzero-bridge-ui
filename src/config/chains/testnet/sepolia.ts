import { EndpointId } from "@layerzerolabs/lz-definitions";

import { type LayerZeroChain } from "../types";

export const sepolia: LayerZeroChain = {
  id: 11155111,
  name: "Sepolia",
  icon: "https://icons-ckg.pages.dev/lz-scan/networks/sepolia.svg",
  endpoint: EndpointId.SEPOLIA_V2_MAINNET,
  rpc: "https://11155111.rpc.thirdweb.com",
  testnet: true,
};
