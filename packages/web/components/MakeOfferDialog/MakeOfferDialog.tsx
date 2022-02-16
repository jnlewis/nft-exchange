import React, { useState } from 'react';
import { Modal, Alert, Button, Form } from 'react-bootstrap';
import { TokenDetails } from '../../core/entities/tokenDetails';
import NFTSelector from '../NFTSelector/NFTSelector';

interface MakeOfferDialogProps {
  nftContract: any;
  currentUser: any;
  show: boolean;
  description: string;
  onCancel: () => void;
  onConfirm: (token: TokenDetails) => void;
}

export default function MakeOfferDialog({
  nftContract,
  currentUser,
  show,
  description,
  onCancel,
  onConfirm,
}: MakeOfferDialogProps) {

  const [tokenDetails, setTokenDetails] = useState<TokenDetails>();
  
  const handleTokenSelected = async (token?: TokenDetails) => {
    if (!token) {
      setTokenDetails(undefined);
    } else {
      setTokenDetails(token);
    }
  }

  return (
    <Modal show={show} size="lg" onHide={onCancel} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Make an offer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{description}</p>
        <div>
          <NFTSelector contract={nftContract} accountId={currentUser?.accountId} tokenSelected={(token?: TokenDetails) => handleTokenSelected(token)} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => onCancel()}>
          Cancel
        </Button>
        {tokenDetails && (
          <Button variant="primary" onClick={() => onConfirm(tokenDetails)}>
            Confirm
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
