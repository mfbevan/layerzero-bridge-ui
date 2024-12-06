import { EndpointId } from "@layerzerolabs/lz-definitions";

import { defineLZChain, type LayerZeroChain } from "../types";

export const avalancheFuji: LayerZeroChain = defineLZChain({
  id: 43113,
  name: "Avalanche Fuji",
  icon: "https://icons-ckg.pages.dev/lz-scan/networks/avalanche.svg",
  endpoint: EndpointId.AVALANCHE_V2_TESTNET,
  rpc: "https://43113.rpc.thirdweb.com",
  testnet: true,
});

