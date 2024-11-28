import { type Chain } from "thirdweb";

import { Oft__factory, OftAdapter__factory } from "./typechain";
import { createProvider } from "./provider";

interface CreateContractOptions {
  address: string;
  chain: Chain;
}

export const createOft = ({ address, chain }: CreateContractOptions) => {
  return Oft__factory.connect(address, createProvider({ chain }));
};

export const createOftAdapter = ({ address, chain }: CreateContractOptions) => {
  return OftAdapter__factory.connect(address, createProvider({ chain }));
};
