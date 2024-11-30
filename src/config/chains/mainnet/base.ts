import { EndpointId } from "@layerzerolabs/lz-definitions";

import { defineLZChain, type LayerZeroChain } from "../types";

export const base: LayerZeroChain = defineLZChain({
  id: 8453,
  name: "Base",
  icon: "https://icons-ckg.pages.dev/lz-scan/networks/base.svg",
  endpoint: EndpointId.BASE_V2_MAINNET,
  rpc: "https://8453.rpc.thirdweb.com",
});
