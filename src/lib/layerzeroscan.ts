const BASE_URL = "https://layerzeroscan.com";

export const createLayerZeroScanUrl = (txHash: string) =>
  `${BASE_URL}/tx/${txHash}`;
