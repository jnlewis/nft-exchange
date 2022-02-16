import { Config } from "../core/config/config";
import { OfferDetails } from "../core/entities/offerDetails";
import { Offers } from "../core/entities/offers";

interface AddOfferOptions {
  listingId: number;
  listingTokenContract: string;
  listingTokenId: string;
  listingTokenTitle: string;
  listingTokenDescription: string;
  listingTokenImage: string;
  offerTokenContract: string;
  offerTokenId: string;
  offerTokenTitle: string;
  offerTokenDescription: string;
  offerTokenImage: string;
  seller: string;
  offerer: string;
}

export const addOffer = async (contract: any, options: AddOfferOptions) => {
  try {
    console.log("addOffer", "Begin", options);
    
    // Create offer in contract
    let response = await contract.makeOffer(
      { 
        tokenContract: options.offerTokenContract, 
        tokenId: options.offerTokenId,
        listingTokenContract: options.listingTokenContract,
        listingTokenId: options.listingTokenId,
        tokenMeta: {
          title: options.offerTokenTitle,
          description: options.offerTokenDescription,
          image: options.offerTokenImage,
        }
      },
      Config.gasFee,
      0
    )
    console.log(response);
  } catch (e) {
    console.log(
      "addOffer",
      "Failed to save.",
      e
    );
    throw e;
  }
}

export const fetchOffers = async (contract: any): Promise<Offers> => {
  try {
    console.log("fetchOffers", "Begin");

    // Get listings from contract
    const response = await contract.getOffers();

    console.log(response);
    
    // Prepare response
    const offers: Offers = { items: [] };
    response.forEach((item: any) => {
      offers.items.push({
        id: item.offerId,
        listingId: item.listingId,
        listingTokenId: item.listingTokenId,
        listingTokenTitle: item.listingTokenMeta.title,
        seller: item.seller,
        buyer: item.buyer,
        offerTokenContract: item.offerTokenContract,
        offerTokenId: item.offerTokenId,
        offerTokenTitle: item.offerTokenMeta.title,
        offerTokenDescription: item.offerTokenMeta.description,
        offerTokenImage: item.offerTokenMeta.image,
      });
    });
  
    return offers;
  } catch (e) {
    console.log("fetchOffers", "Error retrieving data.", e);
    throw e;
  }
};

export const fetchOffersBySeller = async (contract: any, accountId: string): Promise<Offers> => {
  try {
    console.log("fetchOffersBySeller", "Begin", accountId);

    const allOffers = await fetchOffers(contract);

    const sellerOffers: Offers = {
      items: []
    };

    sellerOffers.items = allOffers.items.filter((offer: OfferDetails) => offer.seller == accountId);
    
    return sellerOffers;
  } catch (e) {
    console.log("fetchOffersBySeller", "Error retrieving data.", e);
    throw e;
  }
};

export const fetchOffersByBuyer = async (contract: any, accountId: string): Promise<Offers> => {
  try {
    console.log("fetchOffersByBuyer", "Begin", accountId);

    const allOffers = await fetchOffers(contract);

    const buyerOffers: Offers = {
      items: []
    };

    buyerOffers.items = allOffers.items.filter((offer: OfferDetails) => offer.buyer == accountId);
    
    return buyerOffers;
  } catch (e) {
    console.log("fetchOffersByBuyer", "Error retrieving data.", e);
    throw e;
  }
};
