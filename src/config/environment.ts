import { create } from "zustand";

import { type LayerZeroChain, mainnets, testnets } from "./chains";
import { tokensByNetwork } from "./tokens";
import { ethereum } from "./chains/mainnet";

export const environments = ["mainnet", "testnet"] as const;
export type Environment = (typeof environments)[number];

export interface ConfigStore {
  environment: Environment;
  chains: LayerZeroChain[];
  changeEnvironment: (environment: Environment) => void;
}

export const useConfig = create<ConfigStore>((set) => ({
  environment: "testnet",
  chains: testnets,
  tokens: tokensByNetwork[ethereum.id] ?? [],
  changeEnvironment: (environment: Environment) => {
    const chains = environment === "mainnet" ? mainnets : testnets;
    set({ environment, chains });
  },
}));
