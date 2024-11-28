import { type Chain } from "thirdweb";
import { create } from "zustand";

import { type Token } from "~/config/tokens";

export interface BridgeStore {
  tokenFrom?: Token;
  tokenTo?: Token;
  setTokenFrom: (token: Token) => void;
  setTokenTo: (token: Token) => void;
  amountFrom?: string;
  amountTo?: string;
  setAmountFrom: (amount: string) => void;
  setAmountTo: (amount: string) => void;
  chainFrom?: Chain;
  chainTo?: Chain;
  setChainFrom: (chain: Chain) => void;
  setChainTo: (chain: Chain) => void;
  slippage: number;
  setSlippage: (slippage: number) => void;
  flip: () => void;
}

export const useBridgeStore = create<BridgeStore>()((set) => ({
  setTokenFrom: (token) => set({ tokenFrom: token }),
  setTokenTo: (token) => set({ tokenTo: token }),
  setAmountFrom: (amount) => set({ amountFrom: amount }),
  setAmountTo: (amount) => set({ amountTo: amount }),
  setChainFrom: (chain) => set({ chainFrom: chain }),
  setChainTo: (chain) => set({ chainTo: chain }),
  slippage: 0.5,
  setSlippage: (slippage) => set({ slippage }),
  flip: () =>
    set((state) => ({
      tokenFrom: state.tokenTo,
      tokenTo: state.tokenFrom,
      chainFrom: state.chainTo,
      chainTo: state.chainFrom,
      amountFrom: state.amountTo,
      amountTo: state.amountFrom,
    })),
}));
