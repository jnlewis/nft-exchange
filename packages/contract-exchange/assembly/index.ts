import { context, logging } from "near-sdk-as";
import { ListingInfo, OfferInfo, TokenMeta } from "./models";
import { NFTContractApi } from "./nftContractApi";
import { generateNewListingID, generateNewOfferID, listingsStorage, offersStorage } from "./storage";

const EXCHANGE_CONTRACT_ID = 'exchange.jeffreylewis.testnet';

/**
 * Creates a listing of an NFT token making it available for receiving offers.
 */
export function createListing(tokenContract: string, tokenId: string, lookingFor: string, tokenMeta: TokenMeta): void {
    
    const sellerAddress = context.sender;

    //TODO: Verify token ownership
    // isTokenOwner(tokenContract, tokenId, sellerAddress);

    // Verify that token is not already listed
    const listing = getListing(tokenContract, tokenId);
    if (listing != null) {
        logging.log("createListing failed: Listing already exists.");
        return;
    }

    // Transfer token ownership to exchange contract as escrow
    // Currently this has to be done outside of exchange contract as predecessor (this contract)
    // does not own the NFT and cannot initiate transfers
    // transferNftToken(tokenContract, tokenId, EXCHANGE_CONTRACT_ID);
    
    // Generate new listing ID
    const newListingId = generateNewListingID();

    // Create the listing record
    const listingInfo: ListingInfo = {
        listingId: newListingId,
        seller: sellerAddress,
        tokenContract: tokenContract,
        tokenId: tokenId,
        lookingFor: lookingFor,
        tokenMeta: {
            title: tokenMeta.title,
            description: tokenMeta.description,
            image: tokenMeta.image
        }
    };
    listingsStorage.push(listingInfo);

    logging.log("createListing successful: Listing ID: " + newListingId.toString());
}

/**
 * Cancel an open listing. Caller must be the seller of this listing.
 */
export function cancelListing(tokenContract: string, tokenId: string): void {
    
    // Verify that the listing actually exists
    const listing = getListing(tokenContract, tokenId);
    if (listing == null) {
        logging.log("cancelListing failed: Listing not found");
        return;
    }

    // Verify that caller is seller of listing
    if (listing.seller != context.sender) {
        logging.log("cancelListing failed: Sender is not seller of this listing");
        return;
    }

    // Refund the listing token
    transferNftToken(listing.tokenContract, listing.tokenId, listing.seller);
    
    // Remove the listing
    removeListing(tokenContract, tokenId);

    logging.log("cancelListing successful");
}

/**
 * Makes an offer for an NFT listing, providing an NFT token as the offer item.
 */
export function makeOffer(tokenContract: string, tokenId: string, listingTokenContract: string, listingTokenId: string, tokenMeta: TokenMeta): void {
    
    const buyerAddress = context.sender;

    //TODO: Verify token ownership
    // isTokenOwner(tokenContract, tokenId, buyerAddress);

    // Verify that the listing token is actually on listing
    const listing = getListing(listingTokenContract, listingTokenId);
    if (listing == null) {
        logging.log("makeOffer failed: Listing not found.");
        return;
    }

    // Verify that offering token is not already on offer
    const offer = getOffer(tokenContract, tokenId);
    if (offer != null) {
        logging.log("makeOffer failed: Token is already on offer.");
        return;
    }

    // Transfer token ownership to exchange contract as escrow
    // Currently this has to be done outside of exchange contract as predecessor (this contract)
    // does not own the NFT and cannot initiate transfers
    // transferNftToken(tokenContract, tokenId, buyerAddress);
    
    // Generate new offer ID
    const newOfferId = generateNewOfferID();

    // Create the offer record
    const offerInfo: OfferInfo = {
        offerId: newOfferId,
        buyer: buyerAddress,
        offerTokenContract: tokenContract,
        offerTokenId: tokenId,
        offerTokenMeta: {
            title: tokenMeta.title,
            description: tokenMeta.description,
            image: tokenMeta.image
        },
        listingId: listing.listingId,
        seller: listing.seller,
        listingTokenContract: listingTokenContract,
        listingTokenId: listingTokenId,
        listingTokenMeta: {
            title: listing.tokenMeta.title,
            description: listing.tokenMeta.description,
            image: listing.tokenMeta.image
        }
    };
    offersStorage.push(offerInfo);
    listing
    logging.log("makeOffer successful: OfferID: " + newOfferId.toString());
}

/**
 * Cancel an open offer. Caller must be the creator/buyer of this offer.
 */
export function cancelOffer(tokenContract: string, tokenId: string): void {
    
    // Verify that the token is actually on offer
    const offer = getOffer(tokenContract, tokenId);
    if (offer == null) {
        logging.log("cancelOffer failed: Listing not found.");
        return;
    }

    // Verify that caller is creator/buyer of that offer
    if (offer.buyer != context.sender) {
        logging.log("cancelOffer failed: Sender is not creator/buyer of this offer.");
        return;
    }
    
    //Refund the offerred token
    transferNftToken(offer.offerTokenContract, offer.offerTokenId, offer.buyer);
    
    // Remove the offer
    removeOffer(tokenContract, tokenId);

    logging.log("cancelOffer successful");
}

/**
 * Accept an offer and executes the exchange transaction. Caller must be the seller of the listing.
 */
 export function acceptOffer(tokenContract: string, tokenId: string): void {
    
    // Verify that the token is actually on offer
    const offer = getOffer(tokenContract, tokenId);
    if (offer == null) {
        logging.log("acceptOffer failed: Offer not found.");
        return;
    }

    // Verify that the listing is still available
    const listing = getListing(offer.listingTokenContract, offer.listingTokenId);
    if (listing == null) {
        logging.log("acceptOffer failed: Listing is no longer available.");
        return;
    }

    // Verify that caller is the seller of the listing
    if (listing.seller != context.sender) {
        logging.log("acceptOffer failed: Sender is not seller of this listing");
        return;
    }

    //Transfer the offer token to the listing seller
    transferNftToken(offer.offerTokenContract, offer.offerTokenId, listing.seller);

    //Transfer the listing token to the offerer
    transferNftToken(listing.tokenContract, listing.tokenId, offer.buyer);

    // Remove the listing
    removeListing(tokenContract, tokenId);

    // Remove the offer
    removeOffer(tokenContract, tokenId);

    logging.log("acceptOffer successful");
}

function removeListing(tokenContract: string, tokenId: string): void {

    let removeIndex = -1;

    for(let i = 0; i < listingsStorage.length; i++) {
        if (listingsStorage[i].tokenContract == tokenContract && listingsStorage[i].tokenId == tokenId) {
            removeIndex = i;
            break;
        }
    }

    if (removeIndex >= 0) {
        listingsStorage.swap_remove(removeIndex);
    }
}

function removeOffer(tokenContract: string, tokenId: string): void {

    let removeIndex = -1;

    for(let i = 0; i < offersStorage.length; i++) {
        if (offersStorage[i].offerTokenContract == tokenContract && offersStorage[i].offerTokenId == tokenId) {
            removeIndex = i;
            break;
        }
    }

    if (removeIndex >= 0) {
        offersStorage.swap_remove(removeIndex);
    }
}

// VIEW METHODS

/**
 * Gets all open listings.
 */
export function getListings(): ListingInfo[] {
    const result = new Array<ListingInfo>(listingsStorage.length);
    for(let i = 0; i < listingsStorage.length; i++) {
        result[i] = listingsStorage[i];
    }
    return result;
}

/**
 * Gets a single listing.
 */
export function getListing(tokenContract: string, tokenId: string): ListingInfo | null {

    for(let i = 0; i < listingsStorage.length; i++) {
        if (listingsStorage[i].tokenContract == tokenContract && listingsStorage[i].tokenId == tokenId) {
            return listingsStorage[i];
        }
    }

    return null;
}

/**
 * Gets all open offers.
 */
export function getOffers(): OfferInfo[] {
    const result = new Array<OfferInfo>(offersStorage.length);
    for(let i = 0; i < offersStorage.length; i++) {
        result[i] = offersStorage[i];
    }
    return result;
}

/**
 * Gets a single offer.
 */
export function getOffer(tokenContract: string, tokenId: string): OfferInfo | null {

    for(let i = 0; i < offersStorage.length; i++) {
        if (offersStorage[i].offerTokenContract == tokenContract && offersStorage[i].offerTokenId == tokenId) {
            return offersStorage[i];
        }
    }

    return null;
}

// export function isTokenOwner(tokenContract: string, tokenId: string, accountId: string): void {
//     const result = false;
//     let api = new NFTContractApi();
//     const promise = api.tokensForOwner(tokenContract, accountId)
//     const ownerTokens = promise.returnAsResult();
//     ownerTokens.forEach(element => {
//         if (element.token_id == tokenId) {
//             result = true;
//             break;
//         }
//     });
//     return result;
// }

export function transferNftToken(tokenContract: string, tokenId: string, toAccountId: string): void {
    let api = new NFTContractApi();
    let promise = api.transfer(tokenContract, tokenId, toAccountId);
    promise.returnAsResult();
}

export function getNftOwnerTokens(tokenContract: string, accountId: string): void {
    let api = new NFTContractApi();
    let promise = api.tokensForOwner(tokenContract, accountId);
    promise.returnAsResult();
}
