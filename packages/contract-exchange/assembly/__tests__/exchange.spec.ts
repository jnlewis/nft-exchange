import { context, storage, VMContext } from 'near-sdk-as';
import { acceptOffer, cancelListing, cancelOffer, createListing, getListing, getListings, getOffer, getOffers, makeOffer } from '..';

describe("Exchange ", () => {
  // Creating listing
  it("should be able to call createListing", () => {
      createListing("nft.jeffreylewis.testnet", "1");
      expect(getListings().length).toBe(1, "listings count should be one after creating a listing.");
  });

  // Getting listings
  it("should be able to call getListings", () => {
    createListing("nft.jeffreylewis.testnet", "1");
    createListing("nft.jeffreylewis.testnet", "2");
    createListing("nft.jeffreylewis.testnet", "3");

    const listings = getListings();

    expect(listings[0].tokenId).toBe("1", "listings tokenId should be correct after creating a listing.");
    expect(listings[1].tokenId).toBe("2", "listings tokenId should be correct after creating a listing.");
    expect(listings[2].tokenId).toBe("3", "listings tokenId should be correct after creating a listing.");
    expect(listings[1].seller).toBe("bob", "listings seller should be correct after creating a listing.");
    expect(listings[1].tokenContract).toBe("nft.jeffreylewis.testnet", "listings seller should be correct after creating a listing.");
  });

  it("should be able to call getListing", () => {
    createListing("nft.jeffreylewis.testnet", "1");
    const listing = getListing("nft.jeffreylewis.testnet", "1");
    expect(listing).not.toBeNull("listings tokenId should be correct after creating a listing.");
  });

  // Cancelling listing
  it("should be able to call cancelListing", () => {
    createListing("nft.jeffreylewis.testnet", "1");
    createListing("nft.jeffreylewis.testnet", "2");
    cancelListing("nft.jeffreylewis.testnet", "1");
    expect(getListings().length).toBe(1, "listings count should be one after creating a listing.");
  });

  // Making offer
  it("should be able to call makeOffer", () => {
    createListing("nft.jeffreylewis.testnet", "1");
    makeOffer("nft.jeffreylewis.testnet", "2", "nft.jeffreylewis.testnet", "1");
    expect(getOffers().length).toBe(1, "offers count should be one after making an offer.");
  });

  it("should not be able to call makeOffer if a listing does not exist", () => {
    makeOffer("nft.jeffreylewis.testnet", "2", "nft.jeffreylewis.testnet", "1");
    expect(getOffers().length).toBe(0, "offers count should be zero after making an offer for an invalid listing.");
  });

  // Cancelling offer
  it("should be able to call cancelOffer", () => {
    createListing("nft.jeffreylewis.testnet", "1");
    makeOffer("nft.jeffreylewis.testnet", "2", "nft.jeffreylewis.testnet", "1");
    cancelOffer("nft.jeffreylewis.testnet", "2");
    expect(getOffers().length).toBe(0, "offers count should be one after making an offer.");
  });

  it("should not be able to call cancelOffer if a offer does not exist", () => {
    createListing("nft.jeffreylewis.testnet", "1");
    makeOffer("nft.jeffreylewis.testnet", "2", "nft.jeffreylewis.testnet", "1");
    cancelOffer("nft.jeffreylewis.testnet", "3");
    expect(getOffers().length).toBe(1, "offers count should be zero after making an offer for an invalid listing.");
  });

  // Accepting offer
  it("should be able to call acceptOffer", () => {
    createListing("nft.jeffreylewis.testnet", "1");
    makeOffer("nft.jeffreylewis.testnet", "2", "nft.jeffreylewis.testnet", "1");
    acceptOffer("nft.jeffreylewis.testnet", "2");
    expect(getOffers().length).toBe(0, "offers count should be one after making an offer.");
  });

  it("should not be able to call acceptOffer if a offer does not exist", () => {
    createListing("nft.jeffreylewis.testnet", "1");
    makeOffer("nft.jeffreylewis.testnet", "2", "nft.jeffreylewis.testnet", "1");
    acceptOffer("nft.jeffreylewis.testnet", "3");
    expect(getOffers().length).toBe(1, "offers count should be zero after making an offer for an invalid listing.");
  });

  it("should be adam's account", () => {
    VMContext.setCurrent_account_id("adam");
    expect(context.contractName).toBe("adam");
  });
});
