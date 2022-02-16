import { TokenDetails } from "../core/entities/tokenDetails";
import { Tokens } from "../core/entities/tokens";

export const fetchOwnerTokens = async (contract: any, owner: string): Promise<Tokens> => {
  try {
    console.log("fetchOwnerTokens", "Begin");

    // Get owner tokens from NFT contract
    let response = await contract.nft_tokens_for_owner({ 
      account_id: owner
    });

    const result: Tokens = {
      items: []
    }

    response.forEach((token: any) => {
      result.items.push({
        owner: token.owner_id,
        tokenContract: contract.contractId,
        tokenId: token.token_id,
        title: token.metadata.title,
        description: token.metadata.description,
        image: token.metadata.media,
      });
    })

    return result;
  } catch (e) {
    console.log("fetchOwnerTokens", "Error retrieving data", e);
    throw e;
  }
};

export const fetchTokenDetails = async (contract: any, owner: string, tokenId: string): Promise<TokenDetails | null> => {
  try {
    console.log("fetchTokenDetails", "Begin");

    const tokens = await fetchOwnerTokens(contract, owner);

    const result = tokens.items.filter((item) => item.tokenId === tokenId);
    
    return result.length > 0 ? result[0] : null;
  } catch (e) {
    console.log("fetchTokenDetails", "Error retrieving data", e);
    throw e;
  }
};
