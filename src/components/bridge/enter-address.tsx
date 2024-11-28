import { type InputHTMLAttributes, type FC } from "react";
import { useActiveAccount } from "thirdweb/react";
import { Wallet } from "lucide-react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";

import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "~/components/ui/tooltip";

export interface EnterAddressProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value?: string;
  onChange: (value: string) => void;
}

export const EnterAddress: FC<EnterAddressProps> = ({
  value,
  onChange,
  ...props
}) => {
  const account = useActiveAccount();

  return (
    <div className="flex gap-2">
      <Input
        className="h-fit p-2 text-sm"
        type="text"
        placeholder="Enter recipient address."
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />
      <div className="flex items-center justify-end gap-1 text-xs">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className=""
                size="icon"
                variant="link"
                onClick={() => onChange(account?.address ?? "")}
              >
                <Wallet />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>USE CONNECTED WALLET</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};
