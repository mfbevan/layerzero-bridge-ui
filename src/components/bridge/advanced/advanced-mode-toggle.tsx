"use client";

import { type FC } from "react";
import { Settings } from "lucide-react";

import { useBridgeStore } from "../bridge-store";

export const AdvancedModeToggle: FC = () => {
  const { setMode } = useBridgeStore();

  const onOpen = () => {
    setMode("advanced");
  };

  return (
    <div className="flex cursor-pointer items-center gap-2" onClick={onOpen}>
      <p className="select-none font-mono text-xs font-medium text-muted-foreground">
        Advanced Settings
      </p>
      <Settings className="size-4 text-muted-foreground" />
    </div>
  );
};
