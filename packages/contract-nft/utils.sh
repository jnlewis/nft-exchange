export ID=jeffreylewis.testnet
export ALICEID=jeffreylewis-alice.testnet
export BOBID=jeffreylewis-bob.testnet

# View tokens
near view nft.$ID nft_tokens_for_owner '{"account_id": "'$ALICEID'"}'
near view nft.$ID nft_tokens_for_owner '{"account_id": "'$BOBID'"}'
near view nft.$ID nft_tokens_for_owner '{"account_id": "'$ID'"}'
near view nft.$ID nft_tokens_for_owner '{"account_id": "'exchange.$ID'"}'