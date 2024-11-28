import { type ReactNode, type FC } from "react";
import { formatUnits, parseEther } from "ethers";

import { Skeleton } from "../ui/skeleton";
import { useBridge } from "../../hooks/use-bridge";

import { useBridgeStore } from "./bridge-store";

export const Fees: FC = () => {
  const { slippage, amountFrom, tokenFrom, native } = useBridgeStore();
  const { estimate, isConfigurationValid } = useBridge();

  return (
    <div className="flex flex-col gap-2">
      <Item
        label="Receive on Destination"
        value={
          isConfigurationValid
            ? formatUnits(
                parseEther(amountFrom ?? "0"),
                tokenFrom?.decimals ?? 18,
              )
            : "--"
        }
        isLoading={estimate.isLoading}
      />
      <Item
        label={`Bridge Fee (${native ? "Native" : "LZ Token"})`}
        value={
          isConfigurationValid
            ? native
              ? formatUnits(estimate.data?.nativeFee ?? 0n, 18)
              : formatUnits(estimate.data?.lzTokenFee ?? 0n, 18)
            : "--"
        }
        isLoading={estimate.isLoading}
      />
      <Item label="Slippage" value={`${(slippage / 100).toFixed(2)}%`} />
    </div>
  );
};

const Item: FC<{ label: string; value: ReactNode; isLoading?: boolean }> = ({
  label,
  value,
  isLoading = false,
}) => {
  return (
    <div className="flex justify-between font-mono text-xs text-muted-foreground">
      <span>{label}</span>
      {isLoading ? <Skeleton className="h-4 w-16" /> : <span>{value}</span>}
    </div>
  );
};
