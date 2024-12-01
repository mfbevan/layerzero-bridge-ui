"use client";

import { useMemo, useState, type FC } from "react";
import { useMutation } from "@tanstack/react-query";
import { Contract, parseEther } from "ethers";
import {
  useActiveAccount,
  useActiveWalletChain,
  useSwitchActiveWalletChain,
} from "thirdweb/react";

import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { EnterAmount } from "../bridge/enter-amount";
import { SelectChain } from "../bridge/select-chain";
import { Button } from "../ui/button";

import {
  type LayerZeroChain,
  testnets,
  toThirdwebChain,
} from "~/config/chains";
import { baseSepolia, optimismSepolia, sepolia } from "~/config/chains/testnet";
import {
  baseSepoliaToken,
  optimismSepoliaToken,
  sepoliaToken,
} from "~/config/tokens";
import { useSigner } from "~/hooks/use-signer";
import { submitTransaction } from "~/lib/submit-transaction";

export const Faucet: FC = () => {
  const account = useActiveAccount();
  const currentChain = useActiveWalletChain();
  const switchChain = useSwitchActiveWalletChain();
  const signer = useSigner();

  const [amount, setAmount] = useState<string>("100");
  const [chain, setChain] = useState<LayerZeroChain>();
  const token = useMemo(() => {
    if (!chain) return;
    return {
      [sepolia.id]: sepoliaToken,
      [optimismSepolia.id]: optimismSepoliaToken,
      [baseSepolia.id]: baseSepoliaToken,
    }[chain.id];
  }, [chain]);

  const { mutateAsync: mint, isPending } = useMutation({
    mutationFn: async () => {
      if (!account?.address || !token || !chain || !signer) return;

      if (currentChain?.id !== chain.id) {
        await switchChain(toThirdwebChain(chain));
      }

      const contract = new Contract(
        token.address,
        ["function mint(address to, uint256 amount) public"],
        signer,
      );

      if (!contract.mint) throw new Error("No mint function");

      await submitTransaction(
        contract.mint?.(account.address, parseEther(amount)),
      );
    },
  });

  return (
    <Card className="flex w-full max-w-md flex-col gap-4 border-input p-4">
      <div className="flex flex-col gap-4">
        <Label className="font-mono font-bold uppercase">Faucet</Label>
        <p className="text-xs text-muted-foreground">
          The TestOFT contract has been deployed to Sepolia, OP Sepolia and Base
          Sepolia and provides open minting to test the bridge
        </p>

        <SelectChain
          chains={testnets}
          value={chain}
          onChangeValue={setChain}
          forceSwitch
        />
        <EnterAmount
          amount={amount}
          onChange={setAmount}
          showMax={false}
          showBalance={false}
        />

        <Button
          onClick={() => mint()}
          isLoading={isPending}
          disabled={
            !account?.address || !token || !chain || !signer || amount === "0"
          }
        >
          Mint
        </Button>
      </div>
    </Card>
  );
};
