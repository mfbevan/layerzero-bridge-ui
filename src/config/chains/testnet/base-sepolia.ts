import { EndpointId } from "@layerzerolabs/lz-definitions";

import { defineLZChain, type LayerZeroChain } from "../types";

export const baseSepolia: LayerZeroChain = defineLZChain({
  id: 84532,
  name: "Base Sepolia",
  icon: "https://icons-ckg.pages.dev/lz-scan/networks/base.svg",
  endpoint: EndpointId.BASESEP_V2_TESTNET,
  rpc: "https://84532.rpc.thirdweb.com",
  testnet: true,
});
