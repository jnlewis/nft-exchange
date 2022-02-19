#
# The following scripts assumes that the NFT and Exchange contracts has been deployed
# and that tokens 1-9 has been minted accordingly
#

export ID=jeffreylewis.testnet
export ALICEID=jeffreylewis-alice.testnet
export BOBID=jeffreylewis-bob.testnet

# CREATE DEMO LISTINGS (from ALICE)
near call nft.$ID nft_transfer '{"token_id": "1", "receiver_id": "'exchange.$ID'", "memo": "transfer ownership"}' --accountId $ALICEID --depositYocto 1
near call nft.$ID nft_transfer '{"token_id": "2", "receiver_id": "'exchange.$ID'", "memo": "transfer ownership"}' --accountId $ALICEID --depositYocto 1
near call nft.$ID nft_transfer '{"token_id": "3", "receiver_id": "'exchange.$ID'", "memo": "transfer ownership"}' --accountId $ALICEID --depositYocto 1
near call nft.$ID nft_transfer '{"token_id": "4", "receiver_id": "'exchange.$ID'", "memo": "transfer ownership"}' --accountId $ALICEID --depositYocto 1
# near call nft.$ID nft_transfer '{"token_id": "5", "receiver_id": "'exchange.$ID'", "memo": "transfer ownership"}' --accountId $ALICEID --depositYocto 1
# near call nft.$ID nft_transfer '{"token_id": "6", "receiver_id": "'exchange.$ID'", "memo": "transfer ownership"}' --accountId $ALICEID --depositYocto 1

near call exchange.$ID createListing '{"tokenContract": "'nft.$ID'", "tokenId": "1", "lookingFor": "Looking for anything of similar value.", "tokenMeta": { "image": "a1.png", "title": "Karafuru #2321", "description": "Karafuru is home to 5555 generative arts where colors reign supreme. Leave the drab reality and enter the world of Karafuru by Museum of Toys." }}' --accountId $ALICEID --deposit 0.1
near call exchange.$ID createListing '{"tokenContract": "'nft.$ID'", "tokenId": "2", "lookingFor": "Looking for anything of similar value.", "tokenMeta": { "image": "a2.png", "title": "Karafuru #4827", "description": "Karafuru is home to 5555 generative arts where colors reign supreme. Leave the drab reality and enter the world of Karafuru by Museum of Toys." }}' --accountId $ALICEID --deposit 0.1
near call exchange.$ID createListing '{"tokenContract": "'nft.$ID'", "tokenId": "3", "lookingFor": "Looking for anything of similar value.", "tokenMeta": { "image": "a3.png", "title": "Karafuru #3982", "description": "Karafuru is home to 5555 generative arts where colors reign supreme. Leave the drab reality and enter the world of Karafuru by Museum of Toys." }}' --accountId $ALICEID --deposit 0.1
near call exchange.$ID createListing '{"tokenContract": "'nft.$ID'", "tokenId": "4", "lookingFor": "Looking for anything of similar value.", "tokenMeta": { "image": "s1.png", "title": "Coolmans Universe #4078", "description": "Spesh is looking for his best friend throughout Coolmans Universe. To travel through this universe Spesh uses a surfboard and a compass." }}' --accountId $ALICEID --deposit 0.1
# near call exchange.$ID createListing '{"tokenContract": "'nft.$ID'", "tokenId": "5", "lookingFor": "Looking for anything of similar value.", "tokenMeta": { "image": "s2.png", "title": "Coolmans Universe #2639", "description": "Spesh is looking for his best friend throughout Coolmans Universe. To travel through this universe Spesh uses a surfboard and a compass." }}' --accountId $ALICEID --deposit 0.1 --gas=300000000000000
# near call exchange.$ID createListing '{"tokenContract": "'nft.$ID'", "tokenId": "6", "lookingFor": "Looking for anything of similar value.", "tokenMeta": { "image": "s3.png", "title": "Coolmans Universe #8023", "description": "Spesh is looking for his best friend throughout Coolmans Universe. To travel through this universe Spesh uses a surfboard and a compass." }}' --accountId $ALICEID --deposit 0.1 --gas=300000000000000

# CREATE DEMO LISTINGS (from BOB)
near call nft.$ID nft_transfer '{"token_id": "7", "receiver_id": "'exchange.$ID'", "memo": "transfer ownership"}' --accountId $BOBID --depositYocto 1
# near call nft.$ID nft_transfer '{"token_id": "8", "receiver_id": "'exchange.$ID'", "memo": "transfer ownership"}' --accountId $BOBID --depositYocto 1
# near call nft.$ID nft_transfer '{"token_id": "9", "receiver_id": "'exchange.$ID'", "memo": "transfer ownership"}' --accountId $BOBID --depositYocto 1

near call exchange.$ID createListing '{"tokenContract": "'nft.$ID'", "tokenId": "7", "lookingFor": "Looking for anything of similar value.", "tokenMeta": { "image": "c1.png", "title": "CryptoCities #034 - Sydney", "description": "An art collection made up of voxel-based microcosms displaying iconic cities from real life/fiction. Only 333 unique cities to be minted." }}' --accountId $BOBID --deposit 0.1
# near call exchange.$ID createListing '{"tokenContract": "'nft.$ID'", "tokenId": "8", "lookingFor": "Looking for anything of similar value.", "tokenMeta": { "image": "c2.png", "title": "CryptoCities #029 - Athens", "description": "An art collection made up of voxel-based microcosms displaying iconic cities from real life/fiction. Only 333 unique cities to be minted." }}' --accountId $BOBID --deposit 0.1
# near call exchange.$ID createListing '{"tokenContract": "'nft.$ID'", "tokenId": "9", "lookingFor": "Looking for anything of similar value.", "tokenMeta": { "image": "c3.png", "title": "CryptoCities #056 - Undead City", "description": "An art collection made up of voxel-based microcosms displaying iconic cities from real life/fiction. Only 333 unique cities to be minted." }}' --accountId $BOBID --deposit 0.1 --gas=300000000000000
