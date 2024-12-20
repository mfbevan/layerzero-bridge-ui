import { EndpointId } from "@layerzerolabs/lz-definitions";

import { defineLZChain, type LayerZeroChain } from "../types";

export const avalanche: LayerZeroChain = defineLZChain({
  id: 43114,
  name: "Avalanche",
  icon: "https://icons-ckg.pages.dev/lz-scan/networks/avalanche.svg",
  endpoint: EndpointId.AVALANCHE_V2_MAINNET,
  rpc: "https://43114.rpc.thirdweb.com",
});
