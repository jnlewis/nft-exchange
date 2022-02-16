import Big from "big.js";

export interface AppConfig {
  nftContractName: string;
  gasFee: string;
}

export const Config: AppConfig = {
  nftContractName: 'nft.jeffreylewis.testnet',
  gasFee: Big(3).times(10 ** 13).toFixed(),
};
