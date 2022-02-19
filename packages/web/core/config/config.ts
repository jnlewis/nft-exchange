import Big from "big.js";

export interface AppConfig {
  nftContractName: string;
  gasFee: string;
}

export const Config: AppConfig = {
  nftContractName: 'nft.jeffreylewis.testnet',
  // gasFee: Big(3).times(10 ** 14).toFixed(), // 300TGas
  gasFee: Big(1).times(10 ** 14).toFixed(), // 100TGas
};
