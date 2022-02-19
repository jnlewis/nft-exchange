export ID=jeffreylewis.testnet
export ALICEID=jeffreylewis-alice.testnet
export BOBID=jeffreylewis-bob.testnet

# Mint tokens
near call nft.$ID nft_mint '{"token_id": "1", "receiver_id": "'nft.$ID'", "token_metadata": { "title": "Karafuru #2321", "description": "Karafuru is home to 5555 generative arts where colors reign supreme. Leave the drab reality and enter the world of Karafuru by Museum of Toys.", "media": "a1.png", "copies": 1}}' --accountId nft.$ID --deposit 0.1
near call nft.$ID nft_mint '{"token_id": "2", "receiver_id": "'nft.$ID'", "token_metadata": { "title": "Karafuru #4827", "description": "Karafuru is home to 5555 generative arts where colors reign supreme. Leave the drab reality and enter the world of Karafuru by Museum of Toys.", "media": "a2.png", "copies": 1}}' --accountId nft.$ID --deposit 0.1
near call nft.$ID nft_mint '{"token_id": "3", "receiver_id": "'nft.$ID'", "token_metadata": { "title": "Karafuru #3982", "description": "Karafuru is home to 5555 generative arts where colors reign supreme. Leave the drab reality and enter the world of Karafuru by Museum of Toys.", "media": "a3.png", "copies": 1}}' --accountId nft.$ID --deposit 0.1

near call nft.$ID nft_mint '{"token_id": "4", "receiver_id": "'nft.$ID'", "token_metadata": { "title": "Coolmans Universe #4078", "description": "Spesh is looking for his best friend throughout Coolmans Universe. To travel through this universe Spesh uses a surfboard and a compass.", "media": "s1.png", "copies": 1}}' --accountId nft.$ID --deposit 0.1
near call nft.$ID nft_mint '{"token_id": "5", "receiver_id": "'nft.$ID'", "token_metadata": { "title": "Coolmans Universe #2639", "description": "Spesh is looking for his best friend throughout Coolmans Universe. To travel through this universe Spesh uses a surfboard and a compass.", "media": "s2.png", "copies": 1}}' --accountId nft.$ID --deposit 0.1
near call nft.$ID nft_mint '{"token_id": "6", "receiver_id": "'nft.$ID'", "token_metadata": { "title": "Coolmans Universe #8023", "description": "Spesh is looking for his best friend throughout Coolmans Universe. To travel through this universe Spesh uses a surfboard and a compass.", "media": "s3.png", "copies": 1}}' --accountId nft.$ID --deposit 0.1

near call nft.$ID nft_mint '{"token_id": "7", "receiver_id": "'nft.$ID'", "token_metadata": { "title": "CryptoCities #034 - Sydney", "description": "An art collection made up of voxel-based microcosms displaying iconic cities from real life/fiction. Only 333 unique cities to be minted.", "media": "c1.png", "copies": 1}}' --accountId nft.$ID --deposit 0.1
near call nft.$ID nft_mint '{"token_id": "8", "receiver_id": "'nft.$ID'", "token_metadata": { "title": "CryptoCities #029 - Athens", "description": "An art collection made up of voxel-based microcosms displaying iconic cities from real life/fiction. Only 333 unique cities to be minted.", "media": "c2.png", "copies": 1}}' --accountId nft.$ID --deposit 0.1
near call nft.$ID nft_mint '{"token_id": "9", "receiver_id": "'nft.$ID'", "token_metadata": { "title": "CryptoCities #056 - Undead City", "description": "An art collection made up of voxel-based microcosms displaying iconic cities from real life/fiction. Only 333 unique cities to be minted.", "media": "c3.png", "copies": 1}}' --accountId nft.$ID --deposit 0.1

# Transfer to alice
near call nft.$ID nft_transfer '{"token_id": "1", "receiver_id": "'$ALICEID'", "memo": "transfer ownership"}' --accountId nft.$ID --depositYocto 1
near call nft.$ID nft_transfer '{"token_id": "2", "receiver_id": "'$ALICEID'", "memo": "transfer ownership"}' --accountId nft.$ID --depositYocto 1
near call nft.$ID nft_transfer '{"token_id": "3", "receiver_id": "'$ALICEID'", "memo": "transfer ownership"}' --accountId nft.$ID --depositYocto 1

near call nft.$ID nft_transfer '{"token_id": "4", "receiver_id": "'$ALICEID'", "memo": "transfer ownership"}' --accountId nft.$ID --depositYocto 1
near call nft.$ID nft_transfer '{"token_id": "5", "receiver_id": "'$ALICEID'", "memo": "transfer ownership"}' --accountId nft.$ID --depositYocto 1
near call nft.$ID nft_transfer '{"token_id": "6", "receiver_id": "'$ALICEID'", "memo": "transfer ownership"}' --accountId nft.$ID --depositYocto 1

# Transfer to bob
near call nft.$ID nft_transfer '{"token_id": "7", "receiver_id": "'$BOBID'", "memo": "transfer ownership"}' --accountId nft.$ID --depositYocto 1
near call nft.$ID nft_transfer '{"token_id": "8", "receiver_id": "'$BOBID'", "memo": "transfer ownership"}' --accountId nft.$ID --depositYocto 1
near call nft.$ID nft_transfer '{"token_id": "9", "receiver_id": "'$BOBID'", "memo": "transfer ownership"}' --accountId nft.$ID --depositYocto 1
