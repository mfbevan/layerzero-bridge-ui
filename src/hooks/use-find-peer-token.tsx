import { bytes32ToEthAddress } from "@layerzerolabs/lz-v2-utilities";
import { useQuery } from "@tanstack/react-query";

import { type LayerZeroChain } from "~/config/chains";
import { createOft } from "~/contracts";

export const USE_FIND_PEER_TOKEN_KEY = "find-peer-token";

export interface UseFindPeerTokenProps {
  chainFrom?: LayerZeroChain;
  chainTo?: LayerZeroChain;
  addressFrom?: string;
}

export interface UseFindPeerTokenData {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
}

export const useFindPeerToken = ({
  chainFrom,
  chainTo,
  addressFrom,
}: UseFindPeerTokenProps) => {
  return useQuery({
    queryKey: [
      USE_FIND_PEER_TOKEN_KEY,
      chainFrom?.id,
      chainTo?.id,
      addressFrom,
    ],
    queryFn: async (): Promise<UseFindPeerTokenData> => {
      if (!chainFrom || !chainTo || !addressFrom)
        throw new Error("Missing chain or address");
      const oft = createOft({ chain: chainFrom, address: addressFrom });

      const address = await oft
        .peers(chainTo.endpoint)
        .then(bytes32ToEthAddress);

      const destinationOft = createOft({
        chain: chainTo,
        address: address,
      });
      const [name, symbol, decimals] = await Promise.all([
        destinationOft.name(),
        destinationOft.symbol(),
        destinationOft.decimals().then(Number),
      ]);

      return {
        address,
        name,
        symbol,
        decimals,
      };
    },
    enabled: !!chainFrom && !!chainTo && !!addressFrom,
    retry: false,
  });
};
