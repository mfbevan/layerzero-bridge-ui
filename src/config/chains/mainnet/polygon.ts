import { EndpointId } from "@layerzerolabs/lz-definitions";

import { defineLZChain, type LayerZeroChain } from "../types";

export const polygon: LayerZeroChain = defineLZChain({
  id: 137,
  name: "Polygon",
  icon: "https://icons-ckg.pages.dev/lz-scan/networks/polygon.svg",
  endpoint: EndpointId.POLYGON_V2_MAINNET,
  rpc: "https://137.rpc.thirdweb.com",
});
