## NFT Contract

This package contains only the build output from the official NFT sample contract from https://github.com/near-examples/NFT
We are using is as an example to create tests NFTs for testing and development of NFT Exchange.

### Deployment & Initialization (Development Environment)

1. Open a new terminal.

2. 
```
near dev-deploy --wasmFile res/non_fungible_token.wasm
```

3. 
```
source neardev/dev-account.env
echo $CONTRACT_NAME
```

4. 
```
near call $CONTRACT_NAME new_default_meta '{"owner_id": "'$CONTRACT_NAME'"}' --accountId $CONTRACT_NAME
```

5. near view $CONTRACT_NAME nft_metadata

### Deployment & Initialization (Testnet)

1. Open a new terminal.

2. 
```
export NFTID=nft.jeffreylewis.testnet
```

3. 
```
near deploy --wasmFile res/non_fungible_token.wasm --accountId $NFTID
```

4. 
```
near call $NFTID new_default_meta '{"owner_id": "'$NFTID'"}' --accountId $NFTID
```

5. 
```
near view $NFTID nft_metadata
```

### Minting & Transferring

1. 
```
export ID=jeffreylewis.testnet
```

2. NFT Contract Functions

**Mint**
```
near call nft.$ID nft_mint '{"token_id": "0", "receiver_id": "'nft.$ID'", "token_metadata": { "title": "Olympus Mons", "description": "Tallest mountain in charted solar system", "media": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Olympus_Mons_alt.jpg/1024px-Olympus_Mons_alt.jpg", "copies": 1}}' --accountId nft.$ID --deposit 0.1
```

**Transfer**
```
near call nft.$ID nft_transfer '{"token_id": "0", "receiver_id": "alice.'$ID'", "memo": "transfer ownership"}' --accountId nft.$ID --depositYocto 1
```

**Get Owner Tokens**
```
near view nft.$ID nft_tokens_for_owner '{"account_id": "'alice.$ID'"}'
near view nft.$ID nft_tokens_for_owner '{"account_id": "'bob.$ID'"}'
```
