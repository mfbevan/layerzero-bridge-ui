import { create } from "zustand";

export interface BridgeStore {
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
  amountOut: string;
}

export const useBridgeStore = create<BridgeStore>()((set) => ({
  tokenIn: "",
  tokenOut: "",
  amountIn: "",
  amountOut: "",
}));
