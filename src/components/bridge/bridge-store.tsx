import {
  type ContractTransactionReceipt,
  type ContractTransactionResponse,
} from "ethers";
import { create } from "zustand";

import { type LayerZeroChain } from "~/config/chains/types";
import { type Token } from "~/config/tokens";

export const bridgeModes = ["simple", "advanced"] as const;
export type BridgeMode = (typeof bridgeModes)[number];

export const defaultSlippage = 50;

export interface BridgeStore {
  tokenFrom?: Token;
  setTokenFrom: (token: Token) => void;
  amountFrom?: string;
  amountTo?: string;
  setAmountFrom: (amount: string) => void;
  setAmountTo: (amount: string) => void;
  chainFrom?: LayerZeroChain;
  chainTo?: LayerZeroChain;
  setChainFrom: (chain: LayerZeroChain) => void;
  setChainTo: (chain: LayerZeroChain) => void;
  addressTo?: string;
  setAddressTo: (address: string) => void;
  slippage: number;
  setSlippage: (slippage: number) => void;
  native: boolean;
  setNative: (native: boolean) => void;
  flip: () => void;
  tx?: ContractTransactionResponse;
  setTx: (tx: ContractTransactionResponse) => void;
  receipt?: ContractTransactionReceipt;
  setReceipt: (receipt: ContractTransactionReceipt) => void;
  mode: BridgeMode;
  setMode: (mode: BridgeMode) => void;
  reset: () => void;
}

export const useBridgeStore = create<BridgeStore>()((set) => ({
  setTokenFrom: (token) => set({ tokenFrom: token }),
  setAmountFrom: (amount) => set({ amountFrom: amount }),
  setAmountTo: (amount) => set({ amountTo: amount }),
  setChainFrom: (chain) => set({ chainFrom: chain }),
  setChainTo: (chain) => set({ chainTo: chain }),
  setAddressTo: (address) => set({ addressTo: address }),
  slippage: defaultSlippage,
  setSlippage: (slippage) => set({ slippage }),
  native: true,
  setNative: (native) => set({ native }),
  flip: () =>
    set((state) => ({
      tokenTo: state.tokenFrom,
      chainFrom: state.chainTo,
      chainTo: state.chainFrom,
    })),
  tx: undefined,
  setTx: (tx) => set({ tx }),
  receipt: undefined,
  setReceipt: (receipt) => set({ receipt }),
  mode: "simple",
  setMode: (mode) => set({ mode }),
  reset: () =>
    set({
      tokenFrom: undefined,
      amountFrom: undefined,
      amountTo: undefined,
      chainFrom: undefined,
      chainTo: undefined,
      addressTo: undefined,
      slippage: defaultSlippage,
      native: true,
      tx: undefined,
      receipt: undefined,
      mode: "simple",
    }),
}));
