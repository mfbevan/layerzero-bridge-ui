import { type FC } from "react";

import { Button } from "../ui/button";

import { useBridgeStore } from "./bridge-store";

export const ResetButton: FC = () => {
  const { reset } = useBridgeStore();

  return (
    <Button
      className="font-mono text-xs font-medium uppercase text-muted-foreground"
      variant="link"
      size="sm"
      onClick={reset}
    >
      Reset
    </Button>
  );
};
