import { EndpointId } from "@layerzerolabs/lz-definitions";

import { type LayerZeroChain } from "../types";

export const polygonAmoy: LayerZeroChain = {
  id: 80002,
  name: "Polygon Amoy",
  icon: "https://icons-ckg.pages.dev/lz-scan/networks/polygon.svg",
  endpoint: EndpointId.AMOY_V2_TESTNET,
  rpc: "https://80002.rpc.thirdweb.com",
  testnet: true,
};
