import { useMemo } from "react";

import { Skeleton } from "../ui/skeleton";

import { useBridgeStore } from "./bridge-store";

import { useFindPeerToken } from "~/hooks/use-find-peer-token";

export const DestinationToken = () => {
  const { chainFrom, chainTo, tokenFrom } = useBridgeStore();
  const { data, isLoading } = useFindPeerToken({
    chainFrom,
    chainTo,
    addressFrom: tokenFrom?.address,
  });

  const value = useMemo(() => {
    if (!data?.address) return "No Token Found";

    if (!data.name && !data.symbol) return data.address;

    return `${data.name} (${data.symbol})`;
  }, [data]);

  if (isLoading) return <Skeleton className="h-9 w-full" />;

  return (
    <div className="flex h-9 w-full items-center border p-2 text-sm">
      {value ?? "--"}
    </div>
  );
};
