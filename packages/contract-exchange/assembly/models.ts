@nearBindgen
export class ListingInfo {
  listingId: i32;
  seller: string;
  tokenContract: string;
  tokenId: string;
  lookingFor: string;
  tokenMeta: TokenMeta;
}

@nearBindgen
export class OfferInfo {
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

@nearBindgen
export class TokenMeta {
  title: string;
  description: string;
  image: string;
}

