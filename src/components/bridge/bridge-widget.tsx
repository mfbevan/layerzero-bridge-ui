"use client";

import { useEffect, type FC } from "react";
import { ArrowUpDown } from "lucide-react";

import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

import { useBridgeStore, type BridgeStore } from "./bridge-store";
import { SelectChain } from "./select-chain";
import { EnterAmount } from "./enter-amount";
import { SelectToken } from "./select-token";
import { Fees } from "./fees";
import { EnterAddress } from "./enter-address";
import { DestinationToken } from "./destination-token";
import { BridgeButton } from "./bridge-button";
import { BridgeTx } from "./bridge-tx";
import { AdvancedModeToggle } from "./mode-toggle";

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
    setAmountFrom,
    tokenFrom,
    setTokenFrom,
    addressTo,
    setAddressTo,
    tx,
    receipt,
  } = useBridgeStore();
  const { chains } = useConfig();

  useEffect(() => {
    if (!initialState) return;
    useBridgeStore.setState(initialState);
  }, [initialState]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-end">
        <AdvancedModeToggle />
      </div>

      <Card className="flex w-full max-w-md flex-col gap-4 border-input p-4">
        <div className="flex flex-col gap-4">
          <Label className="font-mono font-bold uppercase">Bridge From</Label>

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
              forceSwitch
            />
          </div>
          <EnterAmount
            amount={amountFrom}
            onChange={setAmountFrom}
            token={tokenFrom}
            chain={chainFrom}
          />
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
          <Label className="font-mono font-bold uppercase">Bridge To</Label>

          <div className="flex items-center gap-4">
            <DestinationToken />

            <SelectChain
              chains={chains}
              value={chainTo}
              onChangeValue={setChainTo}
            />
          </div>

          <EnterAddress value={addressTo} onChange={setAddressTo} />
        </div>

        <Fees />

        <BridgeButton />

        <BridgeTx tx={tx} receipt={receipt} />
      </Card>
    </div>
  );
};
