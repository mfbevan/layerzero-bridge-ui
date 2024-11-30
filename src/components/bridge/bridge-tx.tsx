import {
  type ContractTransactionReceipt,
  type ContractTransactionResponse,
} from "ethers";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

import { createLayerZeroScanUrl } from "~/lib/layerzeroscan";

export interface BridgeTx {
  tx?: ContractTransactionResponse;
  receipt?: ContractTransactionReceipt;
}

export const BridgeTx = ({ tx, receipt }: BridgeTx) => {
  if (!tx || !receipt) return null;

  return (
    <Link href={createLayerZeroScanUrl(tx?.hash ?? "")} target="_blank">
      <div className="flex h-9 w-full items-center justify-between border p-2 text-sm hover:bg-muted">
        View on LayerZeroScan
        <ExternalLink className="size-4" />
      </div>
    </Link>
  );
};
