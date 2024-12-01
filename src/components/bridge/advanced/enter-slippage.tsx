import { type FC, type InputHTMLAttributes } from "react";

import { Input } from "../../ui/input";

export interface EnterSlippageProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: number;
  onChange: (value: number) => void;
}

export const EnterSlippage: FC<EnterSlippageProps> = ({
  value,
  onChange,
  ...props
}) => {
  const displayValue = value;

  const handleChange = (value: string) => {
    const sanitizedValue = Math.max(0, Math.min(10000, Number(value)));
    onChange(sanitizedValue);
  };

  return (
    <div className="flex items-center justify-between font-mono text-xs">
      <p className="text-muted-foreground">Slippage</p>

      <div className="flex items-center gap-2">
        <Input
          className="h-fit w-[100px] p-2 text-right text-xs"
          type="text" // Changed from "number" to "text" to hide the updown ticker
          placeholder="50"
          value={displayValue}
          onChange={(e) => handleChange(e.target.value)}
          {...props}
        />
        <span>bps</span>
      </div>
    </div>
  );
};
