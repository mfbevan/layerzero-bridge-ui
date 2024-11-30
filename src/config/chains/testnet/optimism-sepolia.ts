import { EndpointId } from "@layerzerolabs/lz-definitions";

import { defineLZChain, type LayerZeroChain } from "../types";

export const optimismSepolia: LayerZeroChain = defineLZChain({
  id: 11155420,
  name: "Optimism Sepolia",
  icon: "https://icons-ckg.pages.dev/lz-scan/networks/optimism.svg",
  endpoint: EndpointId.OPTSEP_V2_TESTNET,
  rpc: "https://11155420.rpc.thirdweb.com",
  testnet: true,
});
