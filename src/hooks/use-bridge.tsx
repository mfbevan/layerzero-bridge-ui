import { useMutation, useQuery } from "@tanstack/react-query";
import { Options } from "@layerzerolabs/lz-v2-utilities";
import { useActiveAccount } from "thirdweb/react";
import { parseEther, zeroPadBytes } from "ethers";
import { useMemo } from "react";

import { useBridgeStore } from "../components/bridge/bridge-store";

import { createOft } from "~/contracts";
import { type SendParamStruct } from "~/contracts/typechain/Oft";

export const ESTIMATE_QUERY_KEY = "bridge-estimate";

interface EstimateResponse {
  nativeFee?: bigint;
  lzTokenFee?: bigint;
  error?: string;
  destinationToken?: string;
}

export const useBridge = () => {
  const account = useActiveAccount();
  const { tokenFrom, addressTo, chainFrom, chainTo, amountFrom, slippage } =
    useBridgeStore();

  const isConfigurationValid = useMemo(
    () => tokenFrom?.address && chainFrom && chainTo && amountFrom,
    [tokenFrom?.address, chainFrom, chainTo, amountFrom],
  );

  const estimate = useQuery({
    queryKey: [
      ESTIMATE_QUERY_KEY,
      amountFrom,
      tokenFrom?.address,
      chainFrom?.id,
      chainTo?.id,
    ],
    queryFn: async (): Promise<EstimateResponse> => {
      console.log("QUERY QUERY QUERY QUERY QUERY QUERY");
      if (!tokenFrom?.address || !chainFrom || !chainTo || !amountFrom) {
        console.log("no data");
        return {};
      }

      const to = addressTo ?? account?.address;

      if (!to) return { error: "No recipient address" };

      // TODO: allow advanced configuration of options
      const extraOptions = Options.newOptions()
        .addExecutorLzReceiveOption(200000, 0)
        .toHex()
        .toString();

      const amountToSend = parseEther(amountFrom ?? "0");
      const minAmountLD = (amountToSend * (100n - BigInt(slippage))) / 100n;

      const sendParams: SendParamStruct = {
        dstEid: chainTo.endpoint,
        to: zeroPadBytes(to, 32),
        amountLD: amountToSend,
        minAmountLD,
        extraOptions,
        composeMsg: "0x",
        oftCmd: "0x",
      };

      console.log("sendParams", sendParams);

      const oft = createOft({ chain: chainFrom, address: tokenFrom.address });

      const [nativeFee, lzTokenFee] = await oft.quoteSend(sendParams, false);

      return {
        nativeFee,
        lzTokenFee,
      };
    },
    staleTime: 1000,
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
    isConfigurationValid,
  };
};
