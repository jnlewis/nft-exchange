export ID=jeffreylewis.testnet
export ALICEID=jeffreylewis-alice.testnet
export BOBID=jeffreylewis-bob.testnet

# View Owner Tokens
near view nft.$ID nft_tokens_for_owner '{"account_id": "'$ALICEID'"}'
near view nft.$ID nft_tokens_for_owner '{"account_id": "'$BOBID'"}'
near view nft.$ID nft_tokens_for_owner '{"account_id": "'$ID'"}'
near view nft.$ID nft_tokens_for_owner '{"account_id": "'exchange.$ID'"}'

# Transfer
near call nft.$ID nft_transfer '{"token_id": "1", "receiver_id": "'exchange.$ID'", "memo": "transfer ownership"}' --accountId $ALICEID --depositYocto 1
