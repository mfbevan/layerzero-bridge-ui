import { type Chain, defineChain } from "thirdweb";

import { mainnets } from "./mainnet";
import { testnets } from "./testnet";
import { type LayerZeroChain } from "./types";

const getChain = (chainId: number): LayerZeroChain => {
  return [...mainnets, ...testnets].find((chain) => chain.id === chainId)!;
};

const toThirdwebChain = (chain: LayerZeroChain): Chain => {
  // @ts-expect-error -- testnet param breaks typing
  return defineChain({
    id: chain.id,
    name: chain.name,
    rpc: chain.rpc,
    testnet: chain.testnet ?? false,
  });
};

export type { LayerZeroChain };
export { getChain, toThirdwebChain, mainnets, testnets };
