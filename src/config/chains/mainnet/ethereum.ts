import { EndpointId } from "@layerzerolabs/lz-definitions";

import { defineLZChain, type LayerZeroChain } from "../types";

export const ethereum: LayerZeroChain = defineLZChain({
  id: 1,
  name: "Ethereum",
  icon: "https://icons-ckg.pages.dev/lz-scan/networks/ethereum.svg",
  endpoint: EndpointId.ETHEREUM_V2_MAINNET,
  rpc: "https://1.rpc.thirdweb.com",
});
