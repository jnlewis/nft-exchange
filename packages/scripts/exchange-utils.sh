export ID=jeffreylewis.testnet
export ALICEID=jeffreylewis-alice.testnet
export BOBID=jeffreylewis-bob.testnet

# View Listings
near call exchange.$ID getListings '{}' --accountId $ID --deposit 0.1

# View Offers
near call exchange.$ID getOffers '{}' --accountId $ID --deposit 0.1

# Create Listing
near call exchange.$ID createListing '{"tokenContract": "'nft.$ID'", "tokenId": "1", "lookingFor": "Looking for anything of similar value.", "tokenMeta": { "image": "a1.png", "title": "Karafuru #2321", "description": "Karafuru is home to 5555 generative arts where colors reign supreme. Leave the drab reality and enter the world of Karafuru by Museum of Toys." }}' --accountId $ALICEID --deposit 0.1

# Cancel Listing
near call exchange.$ID cancelListing '{"tokenContract": "'nft.$ID'", "tokenId": "1"}' --accountId $ALICEID --deposit 0.1

# Make Offer
near call exchange.$ID makeOffer '{"tokenContract": "'nft.$ID'", "tokenId": "9", "lookingFor": "Looking for anything of similar value.", "tokenMeta": { "image": "c3.png", "title": "CryptoCities #056 - Undead City", "description": "An art collection made up of voxel-based microcosms displaying iconic cities from real life/fiction. Only 333 unique cities to be minted." }}' --accountId $BOBID --deposit 0.1

# Cancel Offer
near call exchange.$ID cancelOffer '{"tokenContract": "'nft.$ID'", "tokenId": "9"}' --accountId $BOBID --deposit 0.1

# Accept Offer
near call exchange.$ID acceptOffer '{"tokenContract": "'nft.$ID'", "tokenId": "9"}' --accountId $ALICEID --deposit 0.1
