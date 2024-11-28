import { useQuery } from "@tanstack/react-query";
import { formatUnits } from "ethers";

import { type LayerZeroChain } from "~/config/chains";
import { createErc20 } from "~/contracts";

export interface UseBalanceOptions {
  address: string;
  chain: LayerZeroChain;
}

export interface UseBalanceData {
  balance: bigint;
  balanceFormatted: string;
}

export const USE_BALANCE_KEY = "token-balance";

export const useBalance = (options: UseBalanceOptions) => {
  return useQuery({
    queryKey: [USE_BALANCE_KEY, options.address, options.chain.id],
    queryFn: async () => {
      const erc20 = createErc20({
        address: options.address,
        chain: options.chain,
      });

      const [balance, decimals] = await Promise.all([
        erc20.balanceOf(options.address),
        erc20.decimals(),
      ]);

      return {
        balance,
        balanceFormatted: formatUnits(balance, decimals),
      };
    },
    enabled: !!options.address && !!options.chain,
  });
};
