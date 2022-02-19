import { logging, ContractPromise, u128 } from "near-sdk-as";

export class NFTContractApi {
  
  /**
   * near call nft.$ID nft_transfer '{"token_id": "0", "receiver_id": "alice.'$ID'", "memo": "transfer ownership"}' --accountId nft.$ID --depositYocto 1
   * @param owner 
   * @returns 
   */
   transfer(tokenContract: string, tokenId: string, toAccountId: string): ContractPromise {
    const yoctoNEAR: u128 = u128.One;
    // const gas: number = 300000000000000; // 300 TGas

    let args: TransferArgs = { token_id: tokenId, receiver_id: toAccountId, memo: "transfer ownership" };
    let promise = ContractPromise.create<TransferArgs>(tokenContract, "nft_transfer", args, 300000000000000, yoctoNEAR);  // Need to attach exactly 1 yoctoNEAR (https://docs.near.org/docs/tutorials/contracts/nfts/approvals)
    logging.log("Call NFT_CONTRACT (" + tokenContract + "): nft_transfer");
    return promise;
  }

  /**
   * near view nft.$ID nft_tokens_for_owner '{"account_id": "'alice.$ID'"}'
   * @param owner 
   * @returns 
   */
  tokensForOwner(tokenContract: string, accountId: string): ContractPromise {
    let args: TokensForOwnerArgs = { account_id: accountId };
    let promise = ContractPromise.create<Uint8Array>(tokenContract, "nft_tokens_for_owner", args.encode(), 3000000000000);
    logging.log("Call NFT_CONTRACT (" + tokenContract + "): nft_tokens_for_owner");
    return promise;
  }
}

@nearBindgen
export class TransferArgs {
  token_id: string;
  receiver_id: string;
  memo: string;
}

@nearBindgen
export class TokensForOwnerArgs {
  account_id: string;
}
