"use client";

import { type FC } from "react";

import { useBridgeStore } from "../bridge-store";
import { Fees } from "../fees";

import { EnterSlippage } from "./enter-slippage";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";

export const AdvancedSettings: FC = () => {
  const { mode, setMode, slippage, setSlippage } = useBridgeStore();

  const onToggle = () => {
    setMode(mode === "advanced" ? "simple" : "advanced");
  };

  return (
    <Dialog open={mode === "advanced"} onOpenChange={onToggle}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-mono font-bold uppercase">
            Advanced Settings
          </DialogTitle>
          <DialogDescription className="text-xs">
            Configure advanced bridge settings. Ensure you understand the
            implications of the settings you choose.
          </DialogDescription>
        </DialogHeader>

        <EnterSlippage value={slippage} onChange={setSlippage} />

        <Separator />

        <Fees />

        <DialogFooter>
          <Button onClick={onToggle}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
