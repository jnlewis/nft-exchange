import { PersistentMap, PersistentVector, storage } from "near-sdk-as";
import { ListingInfo, OfferInfo } from "./models";

// export const sellerListingsMapStorage = new PersistentMap<string, i32>("sellerListings"); // sellerAddress > listingInfo 
export const listingsStorage = new PersistentVector<ListingInfo>("listings");
export const offersStorage = new PersistentVector<OfferInfo>("offers");

export const generateNewListingID = (): i32 => {
  const newId = storage.getPrimitive<i32>("currentListingId", 0) + 1;
  storage.set("currentListingId", newId);
  return newId;
}

export const generateNewOfferID = (): i32 => {
  const newId = storage.getPrimitive<i32>("currentOfferId", 0) + 1;
  storage.set("currentOfferId", newId);
  return newId;
}
