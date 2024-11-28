import {
  base,
  baseSepolia,
  mainnet,
  optimism,
  optimismSepolia,
  sepolia,
} from "thirdweb/chains";

export const mainnets = [mainnet, optimism, base];
export const testnets = [sepolia, optimismSepolia, baseSepolia];

export const getChainIcon = (chainId: number) => {
  const lzBaseUrl = "https://icons-ckg.pages.dev/lz-scan/networks";

  return (
    {
      // mainnets
      [mainnet.id]: `${lzBaseUrl}/ethereum.svg`,
      [optimism.id]: `${lzBaseUrl}/optimism.svg`,
      [base.id]: `${lzBaseUrl}/base.svg`,
      // testnets
      [sepolia.id]: `${lzBaseUrl}/sepolia.svg`,
      [optimismSepolia.id]: `${lzBaseUrl}/optimism.svg`,
      [baseSepolia.id]: `${lzBaseUrl}/base.svg`,
    }[chainId] ?? "/icon_gray.jpeg"
  );
};
