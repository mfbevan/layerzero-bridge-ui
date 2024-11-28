import { optimismSepolia, sepolia } from "./chains/testnet";

export interface Token {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
}

export const sepoliaToken = {
  address: "0xa4088E28EF4Dc09739093C8B7cFCd868382C3A37",
  name: "Sepolia Coin",
  symbol: "SEP",
  decimals: 18,
};

export const optimismSepoliaToken = {
  address: "0xa4088E28EF4Dc09739093C8B7cFCd868382C3A37",
  name: "Optimism Sepolia Coin",
  symbol: "OPSEP",
  decimals: 18,
};

export const tokenByNetwork: Record<number, Token[]> = {
  [sepolia.id]: [sepoliaToken],
  [optimismSepolia.id]: [optimismSepoliaToken],
};
