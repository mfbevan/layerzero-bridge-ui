import { type InputHTMLAttributes, type FC } from "react";
import { useActiveAccount } from "thirdweb/react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

import { type Token } from "~/config/tokens";
import { useBalance } from "~/hooks/use-balance";
import { type LayerZeroChain } from "~/config/chains";

export interface EnterAmountProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  token?: Token;
  chain?: LayerZeroChain;
  amount?: string;
  onChange: (amount: string) => void;
  maxDecimals?: number;
  showMax?: boolean;
  showBalance?: boolean;
}

export const EnterAmount: FC<EnterAmountProps> = ({
  amount,
  onChange,
  maxDecimals = 18, // Default to 18 decimals for most ERC20 tokens
  token,
  chain,
  showMax = true,
  showBalance = true,
  ...props
}) => {
  const account = useActiveAccount();
  const { data: balance, isLoading } = useBalance({
    token,
    address: account?.address,
    chain,
  });

  const handleChange = (value: string) => {
    // Remove any non-numeric characters except decimal point
    const sanitized = value.replace(/[^0-9.]/g, "");

    // Prevent multiple decimal points
    const decimalPoints = sanitized.match(/\./g)?.length ?? 0;
    if (decimalPoints > 1) return;

    // Handle decimal precision
    const [integerPart, decimalPart] = sanitized.split(".");
    if (decimalPart?.length && decimalPart?.length > maxDecimals) return;

    // Prevent leading zeros unless it's a decimal
    if (
      integerPart?.length &&
      integerPart?.length > 1 &&
      integerPart?.startsWith("0")
    )
      return;

    onChange(sanitized);
  };

  return (
    <div className="flex flex-col">
      <Input
        className="h-fit p-2 text-right text-5xl"
        type="text"
        inputMode="decimal"
        pattern="^[0-9]*[.]?[0-9]*$"
        placeholder="0.0"
        value={amount ?? ""}
        onChange={(e) => handleChange(e.target.value)}
        {...props}
      />
      {showBalance && !!token && (
        <div className="flex items-center justify-end gap-1 text-xs">
          <span className="text-muted-foreground">Available:</span>
          {isLoading ? (
            <Skeleton className="h-4 w-16" />
          ) : (
            <span>{balance?.balanceFormatted}</span>
          )}
          {showMax && (
            <Button className="p-2" variant="link" size="sm">
              Max
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
