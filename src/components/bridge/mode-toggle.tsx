"use client";

import { type FC } from "react";

import { Switch } from "../ui/switch";

import { useBridgeStore } from "./bridge-store";

import { cn } from "~/lib/utils";

export const AdvancedModeToggle: FC = () => {
  const { mode, setMode } = useBridgeStore();

  const onToggle = () => {
    setMode(mode === "simple" ? "advanced" : "simple");
  };

  return (
    <div className="flex items-center gap-2">
      <p
        className={cn(
          "font-mono text-xs font-medium text-muted-foreground",
          mode === "advanced" && "text-foreground",
        )}
      >
        Advanced Mode
      </p>
      <Switch checked={mode === "advanced"} onCheckedChange={onToggle} />
    </div>
  );
};
