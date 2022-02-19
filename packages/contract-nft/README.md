## NFT Contract Sample

This package contains only the build output from the official NEAR NFT example contract from https://github.com/near-examples/NFT.
We are using this to create dummy NFTs for testing and development of NFT Exchange.

See [README](https://github.com/jnlewis/nft-exchange) for setup instructions.

### Usage Instructions
#### Deploying to Development Environment

1. Open a new terminal.

2. Deploy the contract to a development account. Account ID will be automatically generated.
```
near dev-deploy --wasmFile res/non_fungible_token.wasm
```

3. Set the environment variable of the development account.
```
source neardev/dev-account.env
echo $CONTRACT_NAME
```

4. Initialize the NFT contract and verify.
```
near call $CONTRACT_NAME new_default_meta '{"owner_id": "'$CONTRACT_NAME'"}' --accountId $CONTRACT_NAME
near view $CONTRACT_NAME nft_metadata
```

#### Deploying to Testnet

1. Open a new terminal.

2. Set the environment variable of the testnet account.
```
export ID=jeffreylewis.testnet
```

3. Deploy the contract to the testnet account.
```
near deploy --wasmFile res/non_fungible_token.wasm --accountId nft.$ID
```

4. Initialize the NFT contract and verify.
```
near call nft.$ID new_default_meta '{"owner_id": "'nft.$ID'"}' --accountId nft.$ID
near view nft.$ID nft_metadata
```

#### Minting & Transferring

1. Set the environment variable of the testnet account.
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
