import { type EndpointId } from "@layerzerolabs/lz-definitions";

export interface LayerZeroChain {
  id: number;
  name: string;
  icon: string;
  endpoint: EndpointId;
  rpc: string;
  testnet?: boolean;
}
