import { type ReactNode, type FC } from "react";
import { formatUnits, parseEther } from "ethers";

import { useBridgeStore } from "./bridge-store";

export const Fees: FC = () => {
  const { slippage, amountFrom, tokenFrom } = useBridgeStore();

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
      />
      <Item label="Bridge Fee" value="100 gwei" />
      <Item label="Slippage" value={`${slippage.toFixed(2)}%`} />
    </div>
  );
};

const Item: FC<{ label: string; value: ReactNode }> = ({ label, value }) => {
  return (
    <div className="flex justify-between font-mono text-xs text-muted-foreground">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
};
