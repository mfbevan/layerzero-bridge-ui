// import { baseSepolia, optimismSepolia, sepolia } from "./chains/testnet";

export interface Token {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
}

export const sepoliaToken = {
  address: "0x0123494955606F83d0014C92cb3d27b590666171",
  name: "TestOFT",
  symbol: "TOFT",
  decimals: 18,
};

export const optimismSepoliaToken = {
  address: "0xD9e9018B490D25969Ea985a67C005932B346F0D4",
  name: "TestOFT",
  symbol: "TOFT",
  decimals: 18,
};

export const baseSepoliaToken = {
  address: "0xafB76B8DafB42278a331F3a797B1Bf463607490C",
  name: "TestOFT",
  symbol: "TOFT",
  decimals: 18,
};

export const tokensByNetwork: Record<number, Token[]> = {
  // [sepolia.id]: [sepoliaToken],
  // [optimismSepolia.id]: [optimismSepoliaToken],
  // [baseSepolia.id]: [baseSepoliaToken],
};
