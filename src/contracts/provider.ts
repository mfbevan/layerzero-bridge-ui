import { JsonRpcProvider } from "ethers";
import { type Chain } from "thirdweb";

interface CreateProviderOptions {
  chain: Chain;
}

const providerCache = new Map<number, JsonRpcProvider>();

export const createProvider = ({
  chain,
}: CreateProviderOptions): JsonRpcProvider => {
  const chainId = chain.id;
  if (!providerCache.has(chainId)) {
    providerCache.set(chainId, new JsonRpcProvider(chain.rpc));
  }
  return providerCache.get(chainId)!;
};
