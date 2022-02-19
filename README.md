# NFT *Exchange*

#### Discover and trade amazing NFTs

NFT Exchange is a digital marketplace that lets you trade non-fungible tokens (NFT) with a community of collectors. You can list your tokens up for trade and start receiving offers, and the exchange takes place when you accept an offer. The platform is entirely decentralized and is open source, you can be rest assured that your transactions are safe and trustless.

**Contents**

- [Features](#features)
- [Process Process](#process-process)
- [Technologies](#technologies)
- [Live Product Preview](#live-product-preview)
- [Developer Quick Start](#developer-quick-start)
    - [Project Structure](#project-structure)
    - [Deploying to development environment](#deploying-to-development-environment)
    - [Running Web Application](#running-web-application)
- [Interacting With the Contracts](#interacting-with-the-contracts)
    - [Exchange Contract functions](#exchange-contract-functions)
- [Screenshots](#screenshots)
- [License](#license)

## Features

- Interactive user interface accessible from any device with a web browser
- Put any NFT (NEP-171 compliant) up for trade by creating a listing, with the option to write what you're looking for in return
- Browse other listings to discover interesting NFTs for trade
- See an NFT you like? Offer up your own NFT to exchange for it
- Manage your listings and offers through your personal dashboard
- All transactions happen in the blockchain

## Process Flow

<p align="center">
    <img src="https://raw.githubusercontent.com/jnlewis/nft-exchange/main/docs/images/diagram-process.png" alt="Process">
</p>

1. **Seller** creates a listing by transferring their NFT to the exchange smart contract. The exchange contract creates a listing record tied to the receiving NFT and the seller account ID.

2. **Buyer** make an offer on a listing by transferring their NFT to exchange smart contract. The exchange contract creates an offer record tied to the receiving NFT and the buyer account ID.

3. If **seller** accepts the offer, the exchange contract transfers the offer NFT to the seller and the listing NFT to the buyer.

4. If **seller** cancels a listing, the exchange contract refunds the listing NFT back to the seller and deletes the listing record.

5. If **buyer** retracts an offer, the exchange contract refunds the offer NFT back to the buyer and deletes the offer record.

## Technologies

<p align="center">
    <img width="600px" src="https://raw.githubusercontent.com/jnlewis/nft-exchange/main/docs/images/diagram-architecture.jpg" alt="Process">
</p>

**Web Application (UX)**

- The frontend web application is developed in React using the **NextJS** framework. Integrates with NEAR blockchain via the [near-api-js](https://docs.near.org/docs/api/javascript-library) SDK, on two different smart contracts.

**Blockchain Smart Contract**

- **Exchange Contract**: NEAR Smart Contract writen in AssemblyScript repesenting the exchange contract. This contract is responsible for the marketplace functionalities including listing, offering, transactions and accounts management. See [NFT Exchange Contract functions](#nft-exchange-contract-functions) for functions.

- **NFT Contract**: The official NEP-171 compliant NFT contract from https://github.com/near-examples/NFT. We are using this contract as a starting point for building the exchange marketplace based on the NEP-171 specifications.

## Live Product Preview

Alpha Preview: [nftexchange.vercel.app](https://nftexchange.vercel.app/)

This is a pre-alpha version of the application. The smart contracts are deployed to the following accounts on NEAR testnet:
- **nft.jeffreylewis.testnet** - the NFT contract
- **exchange.jeffreylewis.testnet** - the exchange contract

## Developer Quick Start

#### Project Structure

- **docs** - project documentation
- **packages**
    - **contract** - Exchange smart contract AssemblyScript package and source
    - **contract-nft** - NFT contract build output and helper scripts
    - **web** - NextJS web application package and source

#### Deploying to development environment

Pre-requisite: [NEAR CLI](https://docs.near.org/docs/tools/near-cli#installation)
1. Clone the source code from repo
```
> git clone https://github.com/jnlewis/nft-exchange.git
```

2. Deploy the sample NFT Contract

```
From the project root folder:
> cd packages/contract-nft
> near dev-deploy --wasmFile res/non_fungible_token.wasm
> source neardev/dev-account.env
> near call $CONTRACT_NAME new_default_meta '{"owner_id": "'$CONTRACT_NAME'"}' --accountId $CONTRACT_NAME
```
*View packages/contract-nft/README.md for explanation of each steps.*

2. Build and deploy the Exchange Contract
```
From the project root folder:
> cd packages/contract-exchange
> yarn
> yarn deploy:dev
```

3. See [Interacting With the Contracts](#interacting-with-the-contracts) for directly using the contracts or [Running Web Application](#running-web-application) for setting up the frontend.

#### Running Web Application

1. Starting up the web application locally
```
From the project root folder:
> cd packages/web
> yarn
> yarn dev
```

2. Configuring the web application
```
Edit the following files to configure the contract account IDs.
packages/web/core/config/config.ts (NFT Contract account)
packages/web/core/config/nearConfig.ts (Exchange Contract account)
```

3. Browse the application
```
Visit http://localhost:3000
```

2. Mint some testing NFTs (Optional)
```
Edit the file ./packages/scripts/init-nft-mint.sh to configure the environment variables (first few lines)
From the project root folder:
> chmod +x ./packages/scripts/init-nft-mint.sh
> ./packages/scripts/init-nft-mint.sh
```

3. Create some test listings (Optional)
```
Edit the file ./packages/scripts/init-nft-listings.sh to configure the environment variables (first few lines)
From the project root folder:
> chmod +x ./packages/scripts/init-exchange-listings.sh
> ./packages/scripts/init-exchange-listings.sh
```

## Interacting With the Contracts

View the files `/packages/scripts/exchange-utils.sh` and `/packages/scripts/nft-utils.sh` for preset examples of interacting with the contracts.

##### Exchange Contract Functions
| Function      | Description                                                                 | Change/View |
|---------------|-----------------------------------------------------------------------------|-------------|
| CreateListing | Creates a listing of an NFT token making it available for receiving offers. | Change      |
| CancelListing | Cancels a listing. Caller must be the creator of this listing.              | Change      |
| MakeOffer     | Makes an offer for a listing, providing an NFT token as the offer item.     | Change      |
| CancelOffer   | Cancels an offer. Caller must be the creator of this offer.                 | Change      |
| AcceptOffer   | Accept an offer and executes the exchange transaction.                      | Change      |
| getListings   | Gets all open listings.                                                     | View        |
| getListing    | Gets a single listing.                                                      | View        |
| getOffers     | Gets all open offers.                                                       | View        |
| getOffer      | Gets a single offer.                                                        | View        |

**Function Interface**
```
createListing(tokenContract: string, tokenId: string, lookingFor: string, tokenMeta: TokenMeta)
cancelListing(tokenContract: string, tokenId: string)
makeOffer(tokenContract: string, tokenId: string, listingTokenContract: string, listingTokenId: string, tokenMeta: TokenMeta)
cancelOffer(tokenContract: string, tokenId: string)
acceptOffer(tokenContract: string, tokenId: string)

getListings(): ListingInfo[]
getListing(tokenContract: string, tokenId: string): ListingInfo
getOffers(): OfferInfo[] 
getOffer(tokenContract: string, tokenId: string): OfferInfo
```

**Models**
```
class ListingInfo {
  listingId: i32;
  seller: string;
  tokenContract: string;
  tokenId: string;
  lookingFor: string;
  tokenMeta: TokenMeta;
}

class OfferInfo {
  offerId: i32;
  buyer: string;
  offerTokenContract: string;
  offerTokenId: string;
  offerTokenMeta: TokenMeta;
  listingId: i32;
  seller: string;
  listingTokenContract: string;
  listingTokenId: string;
  listingTokenMeta: TokenMeta;
}

class TokenMeta {
  title: string;
  description: string;
  image: string;
}
```

## Screenshots

<p align="center">
    <img src="https://raw.githubusercontent.com/jnlewis/nft-exchange/main/docs/images/screenshot-mainlanding.png" alt="">
</p>
<p align="center">
    <img src="https://raw.githubusercontent.com/jnlewis/nft-exchange/main/docs/images/screenshot-create-listing.png" alt="">
</p>
<p align="center">
    <img src="https://raw.githubusercontent.com/jnlewis/nft-exchange/main/docs/images/screenshot-view-listing.png" alt="">
</p>
<p align="center">
    <img src="https://raw.githubusercontent.com/jnlewis/nft-exchange/main/docs/images/screenshot-make-offer.png" alt="">
</p>
<p align="center">
    <img src="https://raw.githubusercontent.com/jnlewis/nft-exchange/main/docs/images/screenshot-view-offers.png" alt="">
</p>

## License

- Open source <a href="https://github.com/jnlewis/nft-exchange/blob/main/LICENSE">Apache-2.0 License</a>
