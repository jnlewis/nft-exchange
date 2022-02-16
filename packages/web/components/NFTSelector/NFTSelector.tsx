import React, { useEffect, useState } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import styles from './NFTSelector.module.css';
import { Config } from '../../core/config/config';
import { TokenDetails } from '../../core/entities/tokenDetails';
import { fetchOwnerTokens, fetchTokenDetails } from '../../services/tokenContractService';

interface NFTSelectorProps {
  contract: any,
  accountId: string,
  tokenSelected: (token?: TokenDetails) => void;
}

const NFTSelector = ({
  contract,
  accountId,
  tokenSelected,
}: NFTSelectorProps) => {
  
  const [tokens, setTokens] = useState<TokenDetails[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (contract && accountId) {
        const ownerTokens = await fetchOwnerTokens(contract, accountId);
        setTokens(ownerTokens.items);
      }
    };
    fetchData();
  }, [accountId, contract]);

  const handleTokenSelected = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const tokenId = event.target.value;
    if (!event.target.value) {
      tokenSelected(undefined);
    } else {
      if (contract && accountId) {
        const tokenDetails = await fetchTokenDetails(
          contract, 
          accountId, 
          tokenId
        );
        tokenSelected(tokenDetails ?? undefined);
      }
    }
  }

  return (
    <Alert variant="light">
      <Form>
          <Form.Label>NFT Contract Address</Form.Label>
          <Form.Select>
              <option value={contract?.contractId}>{contract?.contractId}</option>
          </Form.Select>
      </Form>
      <Form className='mt-3'>
          <Form.Label>Select an NFT</Form.Label>
          <Form.Select onChange={(e) => handleTokenSelected(e)}>
              <option value=''>Select</option>
              {tokens?.map((item: TokenDetails) => (
                <option key={item.tokenId} value={item.tokenId}>{item.title}</option>
              ))}
          </Form.Select>
      </Form>
    </Alert>
  );
};

export default NFTSelector;
