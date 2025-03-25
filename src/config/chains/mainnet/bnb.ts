import { EndpointId } from "@layerzerolabs/lz-definitions";

import { defineLZChain, type LayerZeroChain } from "../types";

export const bnb: LayerZeroChain = defineLZChain({
  id: 56,
  name: "BNB",
  icon: "https://icons-ckg.pages.dev/lz-scan/networks/bnb.svg",
  endpoint: EndpointId.BSC_MAINNET,
  rpc: "https://binance.llamarpc.com",
  testnet: false,
});
