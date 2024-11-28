import { type Chain } from "thirdweb";
import { create } from "zustand";
import { mainnet } from "thirdweb/chains";

import { mainnets, testnets } from "./chains";
import { tokenByNetwork } from "./tokens";

export const environments = ["mainnet", "testnet"] as const;
export type Environment = (typeof environments)[number];

export interface ConfigStore {
  environment: Environment;
  chains: Chain[];
  changeEnvironment: (environment: Environment) => void;
}

export const useConfig = create<ConfigStore>((set) => ({
  environment: "mainnet",
  chains: mainnets,
  tokens: tokenByNetwork[mainnet.id] ?? [],
  changeEnvironment: (environment: Environment) => {
    const chains = environment === "mainnet" ? mainnets : testnets;
    set({ environment, chains });
  },
}));
