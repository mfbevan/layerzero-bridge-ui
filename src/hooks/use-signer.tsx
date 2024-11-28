import { useMemo } from "react";
import { useActiveAccount, useActiveWalletChain } from "thirdweb/react";
import { ethers6Adapter } from "thirdweb/adapters/ethers6";

import { client } from "~/config/thirdweb";

export const useSigner = () => {
  const chain = useActiveWalletChain();
  const account = useActiveAccount();

  const signer = useMemo(() => {
    if (!chain || !account) return undefined;

    return ethers6Adapter.signer.toEthers({
      client,
      chain,
      account,
    });
  }, [chain, account]);

  return signer;
};
