import { mainnet } from "thirdweb/chains";

export interface Token {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
}

export const tokenByNetwork: Record<number, Token[]> = {
  [mainnet.id]: [],
};
