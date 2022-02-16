export ID=jeffreylewis.testnet
export ALICEID=jeffreylewis-alice.testnet
export BOBID=jeffreylewis-bob.testnet

# View Listings
near call exchange.$ID getListings '{}' --accountId $ID --deposit 0.1

# View Offers
near call exchange.$ID getOffers '{}' --accountId $ID --deposit 0.1

# Cancel listings
near call exchange.$ID cancelListing '{"tokenContract": "'nft.$ID'", "tokenId": "1"}' --accountId $ALICEID --deposit 0.1
near call exchange.$ID cancelListing '{"tokenContract": "'nft.$ID'", "tokenId": "2"}' --accountId $ALICEID --deposit 0.1
near call exchange.$ID cancelListing '{"tokenContract": "'nft.$ID'", "tokenId": "3"}' --accountId $ALICEID --deposit 0.1
near call exchange.$ID cancelListing '{"tokenContract": "'nft.$ID'", "tokenId": "4"}' --accountId $ALICEID --deposit 0.1
near call exchange.$ID cancelListing '{"tokenContract": "'nft.$ID'", "tokenId": "5"}' --accountId $ALICEID --deposit 0.1
near call exchange.$ID cancelListing '{"tokenContract": "'nft.$ID'", "tokenId": "6"}' --accountId $ALICEID --deposit 0.1
near call exchange.$ID cancelListing '{"tokenContract": "'nft.$ID'", "tokenId": "7"}' --accountId $BOBID --deposit 0.1
near call exchange.$ID cancelListing '{"tokenContract": "'nft.$ID'", "tokenId": "8"}' --accountId $BOBID --deposit 0.1
near call exchange.$ID cancelListing '{"tokenContract": "'nft.$ID'", "tokenId": "9"}' --accountId $BOBID --deposit 0.1

# Cancel offers
near call exchange.$ID cancelOffer '{"tokenContract": "'nft.$ID'", "tokenId": "4"}' --accountId $ALICEID --deposit 0.1
