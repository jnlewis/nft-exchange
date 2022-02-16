import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { getConfig } from '../core/config/nearConfig';
import * as nearAPI from 'near-api-js';

function MyApp({ Component, pageProps }: AppProps) {

  // // Initializing contract
  // async function initContract() {
  //   // get network configuration values from config.js
  //   // based on the network ID we pass to getConfig()
  //   const nearConfig = getConfig(process.env.NEAR_ENV || 'testnet');

  //   // create a keyStore for signing transactions using the user's key
  //   // which is located in the browser local storage after user logs in
  //   const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore();

  //   // Initializing connection to the NEAR testnet
  //   const near = await nearAPI.connect({ keyStore, ...nearConfig });

  //   // Initialize wallet connection
  //   const walletConnection = new nearAPI.WalletConnection(near, "tc");

  //   // Load in user's account data
  //   let currentUser;
  //   if (walletConnection.getAccountId()) {
  //     currentUser = {
  //       // Gets the accountId as a string
  //       accountId: walletConnection.getAccountId(),
  //       // Gets the user's token balance
  //       balance: (await walletConnection.account().state()).amount,
  //     };
  //   }

  //   // Initializing our contract APIs by contract name and configuration
  //   const contract = await new nearAPI.Contract(
  //     // User's accountId as a string
  //     walletConnection.account(),
  //     // accountId of the contract we will be loading
  //     // NOTE: All contracts on NEAR are deployed to an account and
  //     // accounts can only have one contract deployed to them.
  //     nearConfig.contractName,
  //     {
  //       // View methods are read-only – they don't modify the state, but usually return some value
  //       viewMethods: ['getCounter'],
  //       // Change methods can modify the state, but you don't receive the returned value when called
  //       changeMethods: ['incrementCounter', 'decrementCounter', 'resetCounter'],
  //     }
  //   );

  //   return { contract, currentUser, nearConfig, walletConnection };
  // }
  
  // window.nearInitPromise = initContract().then(
  //   ({ contract, currentUser, nearConfig, walletConnection }) => {
  //     return <Component {...pageProps} 
  //       contract={contract}
  //       currentUser={currentUser}
  //       nearConfig={nearConfig}
  //       wallet={walletConnection} />
  //   }
  // );
  
  return <Component {...pageProps} />
}

export default MyApp
