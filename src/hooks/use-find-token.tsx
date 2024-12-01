import { useQuery } from "@tanstack/react-query";
import { isAddress } from "ethers";

import { type LayerZeroChain } from "~/config/chains";
import { createOft } from "~/contracts";
import { createProvider } from "~/contracts/provider";

export const USE_FIND_TOKEN_KEY = "find-token";

export interface UseFindTokenProps {
  chain?: LayerZeroChain;
  address?: string;
}

export interface UseFindTokenData {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
}

export const useFindToken = ({ chain, address }: UseFindTokenProps) => {
  return useQuery({
    queryKey: [USE_FIND_TOKEN_KEY, chain?.id, address],
    queryFn: async (): Promise<UseFindTokenData | undefined> => {
      if (!chain || !address) throw new Error("Missing chain or address");
      const oft = createOft({ chain, address });

      const provider = createProvider({ chain });
      const exists = await provider.getCode(address);

      if (exists === "0x") throw new Error("Token does not exist");

      const [name, symbol, decimals] = await Promise.all([
        oft.name().catch(() => ""),
        oft.symbol().catch(() => ""),
        oft
          .decimals()
          .then(Number)
          .catch(() => 18),
      ]);

      return {
        address,
        name,
        symbol,
        decimals,
      };
    },
    enabled: !!chain && !!address && isAddress(address),
    retry: false,
  });
};
