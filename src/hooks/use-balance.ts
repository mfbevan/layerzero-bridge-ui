import { useWalletBalance } from "thirdweb/react";

export interface UseBalanceData {
  balance: bigint;
  balanceFormatted: string;
}
