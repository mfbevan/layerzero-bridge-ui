"use client";

import { useEffect, type FC } from "react";
import { ArrowDown, ArrowUpDown } from "lucide-react";

import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

import { useBridgeStore, type BridgeStore } from "./bridge-store";
import { SelectChain } from "./select-chain";
import { EnterAmount } from "./enter-amount";
import { SelectToken } from "./select-token";
import { Fees } from "./fees";

import { useConfig } from "~/config/environment";

export interface BridgeWidgetProps {
  initialState?: BridgeStore;
}

export const BridgeWidget: FC<BridgeWidgetProps> = ({ initialState }) => {
  const {
    flip,
    chainFrom,
    chainTo,
    setChainFrom,
    setChainTo,
    amountFrom,
    amountTo,
    setAmountFrom,
    setAmountTo,
    tokenFrom,
    tokenTo,
    setTokenFrom,
    setTokenTo,
  } = useBridgeStore();
  const { chains } = useConfig();

  useEffect(() => {
    if (!initialState) return;
    useBridgeStore.setState(initialState);
  }, [initialState]);

  return (
    <Card className="flex w-full max-w-md flex-col gap-4 p-4">
      <div className="flex flex-col gap-4">
        <Label className="font-sans uppercase">Bridge From</Label>
        <div className="flex items-center gap-4">
          <SelectToken
            chain={chainFrom}
            value={tokenFrom}
            onChangeValue={setTokenFrom}
          />
          <SelectChain
            chains={chains}
            value={chainFrom}
            onChangeValue={setChainFrom}
          />
        </div>
        <EnterAmount amount={amountFrom} onChange={setAmountFrom} />
      </div>

      <div
        className="flex w-full cursor-pointer items-center justify-center gap-2"
        onClick={flip}
      >
        <Separator className="flex-1" />
        <ArrowUpDown className="size-4" />
        <Separator className="flex-1" />
      </div>

      <div className="flex flex-col gap-4">
        <Label className="font-sans uppercase">Bridge To</Label>

        <SelectChain
          chains={chains}
          value={chainTo}
          onChangeValue={setChainTo}
        />
      </div>

      <Fees />

      <Button>Bridge</Button>
    </Card>
  );
};
