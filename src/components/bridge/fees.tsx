import { type ReactNode, type FC } from "react";
import { formatUnits, parseEther } from "ethers";

import { Skeleton } from "../ui/skeleton";

import { useBridgeStore } from "./bridge-store";
import { useBridge } from "./use-bridge";

export const Fees: FC = () => {
  const { slippage, amountFrom, tokenFrom } = useBridgeStore();
  const { estimate } = useBridge();
  // const estimate = { isLoading: true };

  return (
    <div className="flex flex-col gap-2">
      <Item
        label="Receive on Destination"
        value={
          amountFrom
            ? formatUnits(
                parseEther(amountFrom ?? "0"),
                tokenFrom?.decimals ?? 18,
              )
            : "0"
        }
        isLoading={estimate.isLoading}
      />
      <Item
        label="Bridge Fee"
        value="100 gwei"
        isLoading={estimate.isLoading}
      />
      <Item
        label="Slippage"
        value={`${slippage.toFixed(2)}%`}
        isLoading={estimate.isLoading}
      />
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
