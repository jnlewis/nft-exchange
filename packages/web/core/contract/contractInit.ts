import { getConfig } from '../../core/config/nearConfig';
import * as nearAPI from 'near-api-js';
import { Config } from '../config/config';

export async function initContract() {
    const nearConfig = getConfig(process.env.NEAR_ENV || 'testnet');
    const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore();
    const near = await nearAPI.connect({ keyStore, ...nearConfig });
    const walletConnection = new nearAPI.WalletConnection(near, "tc");

    let currentUser;
    if (walletConnection.getAccountId()) {
      currentUser = {
        accountId: walletConnection.getAccountId(),
        balance: (await walletConnection.account().state()).amount,
      };
    }

    const contract = await new nearAPI.Contract(
      walletConnection.account(),
      nearConfig.contractName,
      {
        viewMethods: ['getListings', 'getListing', 'getOffers', 'getOffer'],
        changeMethods: ['createListing', 'cancelListing', 'makeOffer', 'cancelOffer', 'acceptOffer'],
      }
    );

    const nftContract = await new nearAPI.Contract(
      walletConnection.account(),
      Config.nftContractName,
      {
        viewMethods: ['nft_tokens_for_owner'],
        changeMethods: [],
      }
    );

    return { contract, nftContract, currentUser, nearConfig, walletConnection };
  }