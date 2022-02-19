import { Config } from "../core/config/config";
import { ListingDetails } from "../core/entities/listingDetails";
import { Listings } from "../core/entities/listings";

interface AddListingOptions {
  tokenContract: string;
  tokenId: string;
  title: string;
  image: string;
  description: string;
  lookingFor: string;
}

export const addListing = async (contract: any, nftContract: any, options: AddListingOptions) => {
  try {
    console.log("addListing", "Begin", JSON.stringify(options));

    // Transfer token to exchange contract
    await nftContract.nft_transfer(
      { 
        token_id: options.tokenId,
        receiver_id: Config.exchangeContractName,
        memo: 'transfer ownership'
      },
      Config.gasFee,
      0
    )

    // Create listing in contract
    let response = await contract.createListing(
      { 
        tokenContract: options.tokenContract, 
        tokenId: options.tokenId,
        lookingFor: options.lookingFor,
        tokenMeta: {
          title: options.title,
          description: options.description,
          image: options.image,
        }
      },
      Config.gasFee,
      0
    )
    console.log(response);
  } catch (e) {
    console.log(
      "addListing",
      "Failed to save.",
      e
    );
    throw e;
  }
}

export const fetchListings = async (contract: any): Promise<Listings> => {
  try {
    console.log("fetchListings", "Begin");

    // Get listings from contract
    const response = await contract.getListings();
    
    // Prepare response
    const listings: Listings = { items: [] };
    response.forEach((item: any) => {
      listings.items.push({
        id: item.listingId,
        tokenContract: item.tokenContract,
        tokenId: item.tokenId,
        lookingFor: item.lookingFor,
        title: item.tokenMeta.title,
        description: item.tokenMeta.description,
        image: item.tokenMeta.image,
        seller: item.seller,
      });
    });
  
    return listings;
  } catch (e) {
    console.log("fetchListings", "Error retrieving data.", e);
    throw e;
  }
};

export const fetchListingDetails = async (contract: any, listingId: string): Promise<ListingDetails | null> => {
  try {
    console.log("fetchListingDetails", "Begin", listingId);

    // Get listings from contract
    let response = await contract.getListings();
    
    response = response.filter((item: any) => { return item.listingId == listingId });
    const item = response[0];
    
    // Prepare response
    let result = null;
    if (response.length > 0) {
      result = {
        id: item.listingId,
        tokenContract: item.tokenContract,
        tokenId: item.tokenId,
        lookingFor: item.lookingFor,
        title: item.tokenMeta.title,
        description: item.tokenMeta.description,
        image: item.tokenMeta.image,
        seller: item.seller,
      }
    }

    return result
  } catch (e) {
    console.log(
      "fetchListingDetails",
      "Error retrieving data.",
      e
    );
    throw e;
  }
};

export const fetchListingBySeller = async (contract: any, accountId: string): Promise<Listings> => {
  try {
    console.log("fetchListingBySeller", "Begin", accountId);

    const allListings = await fetchListings(contract);

    const sellerListings: Listings = {
      items: []
    };

    sellerListings.items = allListings.items.filter((listing: ListingDetails) => listing.seller == accountId);
    
    return sellerListings;
  } catch (e) {
    console.log("fetchListings", "Error retrieving data.", e);
    throw e;
  }
};
