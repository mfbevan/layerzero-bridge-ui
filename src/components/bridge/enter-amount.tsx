import { type InputHTMLAttributes, type FC } from "react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";

export interface EnterAmountProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  amount?: string;
  onChange: (amount: string) => void;
  maxDecimals?: number;
}

export const EnterAmount: FC<EnterAmountProps> = ({
  amount,
  onChange,
  maxDecimals = 18, // Default to 18 decimals for most ERC20 tokens
  ...props
}) => {
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
      <div className="flex items-center justify-end gap-1 text-xs">
        <span className="text-muted-foreground">Available: 0.00</span>
        <Button className="p-2" variant="link" size="sm">
          Max
        </Button>
      </div>
    </div>
  );
};
