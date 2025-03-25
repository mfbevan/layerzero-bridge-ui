import { EndpointId } from "@layerzerolabs/lz-definitions";

import { defineLZChain, type LayerZeroChain } from "../types";

export const bscTestnet: LayerZeroChain = defineLZChain({
  id: 97,
  name: "BNB Testnet",
  icon: "https://icons-ckg.pages.dev/lz-scan/networks/bnb.svg",
  endpoint: EndpointId.BSC_TESTNET,
  rpc: "https://bsc-testnet-rpc.publicnode.com",
  testnet: true,
});
