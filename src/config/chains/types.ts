import { type EndpointId } from "@layerzerolabs/lz-definitions";

export type LayerZeroChainType = "evm";

export interface LayerZeroChain {
  id: number;
  name: string;
  icon: string;
  endpoint: EndpointId;
  rpc: string;
  testnet: boolean;
  chainType: LayerZeroChainType;
}

/**
 * Define an instance of a supported LayerZero chain. Defaults to EVM Mainnet configuration unless overridden.
 * @param chain The chain configuration object.
 * @returns A fully configured LayerZero chain object.
 */
export const defineLZChain = (
  chain: Omit<LayerZeroChain, "chainType" | "rpc" | "testnet"> &
    Partial<Pick<LayerZeroChain, "rpc" | "testnet">>,
): LayerZeroChain => {
  return {
    ...chain,
    rpc: `https://${chain.id}.rpc.thirdweb.com`,
    testnet: false,
    chainType: "evm",
  };
};
