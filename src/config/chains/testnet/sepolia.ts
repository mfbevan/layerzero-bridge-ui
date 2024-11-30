import { EndpointId } from "@layerzerolabs/lz-definitions";

import { defineLZChain, type LayerZeroChain } from "../types";

export const sepolia: LayerZeroChain = defineLZChain({
  id: 11155111,
  name: "Sepolia",
  icon: "https://icons-ckg.pages.dev/lz-scan/networks/sepolia.svg",
  endpoint: EndpointId.SEPOLIA_V2_TESTNET,
  rpc: "https://11155111.rpc.thirdweb.com",
  testnet: true,
});
