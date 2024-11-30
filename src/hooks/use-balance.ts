import { useQuery } from "@tanstack/react-query";
import { formatUnits } from "ethers";

import { type LayerZeroChain } from "~/config/chains";
import { type Token } from "~/config/tokens";
import { createErc20 } from "~/contracts";

export interface UseBalanceOptions {
  token?: Partial<Token>;
  address?: string;
  chain?: LayerZeroChain;
}

export interface UseBalanceData {
  balance: bigint;
  balanceFormatted: string;
}

export const USE_BALANCE_KEY = "token-balance";

export const useBalance = (options: UseBalanceOptions) => {
  return useQuery({
    queryKey: [
      USE_BALANCE_KEY,
      options?.token?.address,
      options?.chain?.id,
      options.address,
    ],
    queryFn: async () => {
      if (!options.token?.address || !options.chain || !options.address)
        throw new Error("Invalid options");

      const erc20 = createErc20({
        address: options.token.address,
        chain: options.chain,
      });

      const [balance] = await Promise.all([erc20.balanceOf(options.address)]);

      if (!balance) return { balance: 0n, balanceFormatted: "0" };

      return {
        balance,
        balanceFormatted: formatUnits(balance, 18),
      };
    },
    throwOnError: true,
    enabled: !!options.address && !!options.chain,
  });
};
