import { useQuery } from "@tanstack/react-query";

import { type LayerZeroChain } from "~/config/chains";
import { createErc20 } from "~/contracts";

export interface UseAllowanceOptions {
  address: string;
  chain: LayerZeroChain;
  spender: string;
}

export interface UseAllowanceData {
  allowance: bigint;
}

export const USE_ALLOWANCE_KEY = "token-allowance";

export const useAllowance = (options: UseAllowanceOptions) => {
  return useQuery({
    queryKey: [USE_ALLOWANCE_KEY, options.address, options.chain.id],
    queryFn: async () => {
      const erc20 = createErc20({
        address: options.address,
        chain: options.chain,
      });

      const allowance = await erc20.allowance(options.address, options.spender);

      return {
        allowance,
      };
    },
    enabled: !!options.address && !!options.chain,
  });
};
