import { type FC } from "react";

import { Button } from "../ui/button";

import { useBridge } from "~/hooks/use-bridge";
import { cn } from "~/lib/utils";

export const BridgeButton: FC = () => {
  const { isConfigurationValid, bridge } = useBridge();

  return (
    <Button
      className={cn()}
      disabled={!isConfigurationValid}
      isLoading={bridge.isPending}
      onClick={() => bridge.mutateAsync()}
    >
      Bridge
    </Button>
  );
};
