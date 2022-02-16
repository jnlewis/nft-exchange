import type { NextPage } from 'next';
import { getConfig } from '../core/config/nearConfig';
import * as nearAPI from 'near-api-js';
import { useEffect, useState } from 'react';
import Big from 'big.js';

const TestContract: NextPage = (props: any) => {
    
  const BOATLOAD_OF_GAS = Big(3).times(10 ** 13).toFixed();
  
  const [contract, setContract] = useState<any>(undefined);
  const [currentUser, setCurrentUser] = useState<any>(undefined);
  const [nearConfig, setNearConfig] = useState<any>(undefined);
  const [wallet, setWallet] = useState<any>(undefined);

  useEffect(() => {
    const init = async () => {
      const initResponse = await initContract();
      setContract(initResponse.contract);
      setCurrentUser(initResponse.currentUser);
      setNearConfig(initResponse.nearConfig);
      setWallet(initResponse.walletConnection);
    };
    init();
  }, []);

  // Initializing contract
  async function initContract() {
    // get network configuration values from config.js
    // based on the network ID we pass to getConfig()
    const nearConfig = getConfig(process.env.NEAR_ENV || 'testnet');

    // create a keyStore for signing transactions using the user's key
    // which is located in the browser local storage after user logs in
    const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore();

    // Initializing connection to the NEAR testnet
    const near = await nearAPI.connect({ keyStore, ...nearConfig });

    // Initialize wallet connection
    const walletConnection = new nearAPI.WalletConnection(near, "tc");

    // Load in user's account data
    let currentUser;
    if (walletConnection.getAccountId()) {
      currentUser = {
        // Gets the accountId as a string
        accountId: walletConnection.getAccountId(),
        // Gets the user's token balance
        balance: (await walletConnection.account().state()).amount,
      };
    }

    // Initializing our contract APIs by contract name and configuration
    const contract = await new nearAPI.Contract(
      // User's accountId as a string
      walletConnection.account(),
      // accountId of the contract we will be loading
      // NOTE: All contracts on NEAR are deployed to an account and
      // accounts can only have one contract deployed to them.
      nearConfig.contractName,
      {
        // View methods are read-only – they don't modify the state, but usually return some value
        viewMethods: ['getListings', 'getListing', 'getOffers', 'getOffer'],
        // Change methods can modify the state, but you don't receive the returned value when called
        changeMethods: ['createListing', 'cancelListing', 'makeOffer', 'cancelOffer', 'acceptOffer', 'getNftOwnerTokens'],
      }
    );

    return { contract, currentUser, nearConfig, walletConnection };
  }

  const signIn = () => {
    wallet.requestSignIn(
      {contractId: nearConfig.contractName, methodNames: ['createListing', 'cancelListing', 'makeOffer', 'cancelOffer', 'acceptOffer', 'getNftOwnerTokens']}, //contract requesting access
      'NFT Exchange', //optional name
      null, //optional URL to redirect to if the sign in was successful
      null //optional URL to redirect to if the sign in was NOT successful
    );
  };

  const signOut = () => {
    wallet.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  };
  
  const getListings = () => {
    console.log(`getListings`);
    contract.getListings().then((result: any) => {
      console.log(result);
    });
  };

  const getTokens = () => {
    console.log(`getNftOwnerTokens`);
    contract.getNftOwnerTokens(
      { 
        accountId: "alice.jeffreylewis.testnet", 
      }).then((result: any) => {
      console.log(result);
    });
  };

  const getTokensSigned = () => {
    console.log(`getTokensSigned`);
    contract.getNftOwnerTokens(
      { 
        accountId: "alice.jeffreylewis.testnet"
      },
      BOATLOAD_OF_GAS,
      0
    ).then(() => {
      console.log('createListing done');
    });
  };

  const createListing = () => {
    console.log(`createListing`);
    contract.createListing(
      { 
        tokenContract: "nft.jeffreylewis.testnet", 
        tokenId: "1" 
      },
      BOATLOAD_OF_GAS,
      0
    ).then(() => {
      console.log('createListing done');
    });
  };

  return (
      <div>
        <main>
          <div>
          { currentUser
            ? <button onClick={signOut}>Log out</button>
            : <button onClick={signIn}>Log in</button>
          }
          </div>

          <div>
              <button onClick={() => getListings()}>Get Listings</button>
              <button onClick={() => getTokens()}>Get Tokens</button>
            </div>
          { currentUser && (
            <div>
              <button onClick={() => createListing()}>Create Listing</button>
              <button onClick={() => getTokensSigned()}>getTokensSigned</button>
            </div>
          )}
        </main>
      </div>
    )
}

export default TestContract
