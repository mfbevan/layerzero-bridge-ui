import { useMutation, useQuery } from "@tanstack/react-query";

import { useBridgeStore } from "./bridge-store";

export const ESTIMATE_QUERY_KEY = "bridge-estimate";

export const useBridge = () => {
  const { tokenFrom, tokenTo, amountFrom, amountTo, chainFrom, chainTo } =
    useBridgeStore();

  const estimate = useQuery({
    queryKey: [ESTIMATE_QUERY_KEY],
    queryFn: () => {
      return {
        fee: "100 gwei",
      };
    },
  });

  const bridge = useMutation({
    mutationFn: async () => {
      return {
        tx: "0x123",
      };
    },
  });

  return {
    estimate,
    bridge,
  };
};
