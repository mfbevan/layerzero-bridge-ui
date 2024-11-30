import { type Chain, defineChain } from "thirdweb";

import { mainnets } from "./mainnet";
import { testnets } from "./testnet";
import { type LayerZeroChain } from "./types";

const getChainById = (chainId: number): LayerZeroChain => {
  return [...mainnets, ...testnets].find((chain) => chain.id === chainId)!;
};

const getChainByName = (chainName: string): LayerZeroChain => {
  return [...mainnets, ...testnets].find((chain) => chain.name === chainName)!;
};

const toThirdwebChain = (chain: LayerZeroChain): Chain => {
  return defineChain({
    id: chain.id,
    name: chain.name,
    rpc: chain.rpc,
    ...(chain.testnet ? { testnet: true } : {}),
  });
};

export type { LayerZeroChain };
export { getChainById, getChainByName, toThirdwebChain, mainnets, testnets };
