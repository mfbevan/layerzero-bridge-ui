import { useMutation, useQuery } from "@tanstack/react-query";
import { Options } from "@layerzerolabs/lz-v2-utilities";
import { useActiveAccount } from "thirdweb/react";
import { parseEther, zeroPadBytes } from "ethers";
import { useMemo } from "react";

import { useBridgeStore } from "../components/bridge/bridge-store";

import { useSigner } from "./use-signer";

import { createOft } from "~/contracts";
import {
  type MessagingFeeStruct,
  type SendParamStruct,
} from "~/contracts/typechain/Oft";

export const ESTIMATE_QUERY_KEY = "bridge-estimate";

interface EstimateResponse {
  nativeFee?: bigint;
  lzTokenFee?: bigint;
  sendParams?: SendParamStruct;
  messagingFee?: MessagingFeeStruct;
}

export const useBridge = () => {
  const account = useActiveAccount();
  const signer = useSigner();

  const {
    tokenFrom,
    addressTo,
    chainFrom,
    chainTo,
    amountFrom,
    slippage,
    setTx,
    setReceipt,
  } = useBridgeStore();

  const isConfigurationValid = useMemo(
    (): boolean =>
      !!tokenFrom?.address &&
      !!chainFrom &&
      !!chainTo &&
      !!amountFrom &&
      !!addressTo,
    [tokenFrom?.address, chainFrom, chainTo, amountFrom, addressTo],
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
      if (!tokenFrom?.address || !chainFrom || !chainTo || !amountFrom)
        throw new Error("Invalid configuration");

      const to = addressTo ?? account?.address;

      if (!to) throw new Error("No recipient address");

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

      const oft = createOft({ chain: chainFrom, address: tokenFrom.address });

      // TODO: configure allowing send with LZ token fee (set to true)
      const [nativeFee, lzTokenFee] = await oft.quoteSend(sendParams, false);

      return {
        nativeFee,
        lzTokenFee,
        sendParams,
        messagingFee: { nativeFee, lzTokenFee } as MessagingFeeStruct,
      };
    },
    enabled: isConfigurationValid,
    staleTime: 1000,
  });

  const bridge = useMutation({
    mutationFn: async () => {
      if (
        !tokenFrom?.address ||
        !chainFrom ||
        !chainTo ||
        !amountFrom ||
        !account?.address
      )
        throw new Error("Invalid configuration");

      if (!estimate.data?.sendParams) throw new Error("No send params");
      const oft = createOft({
        chain: chainFrom,
        address: tokenFrom.address,
      }).connect(signer);

      const { sendParams, messagingFee } = estimate.data;
      if (!sendParams || !messagingFee) throw new Error("No send quote");

      const tx = await oft.send(sendParams, messagingFee, account.address, {
        value: messagingFee.nativeFee,
      });
      setTx(tx);
      const receipt = await tx.wait();
      setReceipt(receipt!);
    },
  });

  return {
    estimate,
    bridge,
    isConfigurationValid,
  };
};
