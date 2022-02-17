/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import styles from '../../styles/Create.module.css';
import PageHead from '../../components/PageHead/PageHead';
import { Col, Container, Row, Alert, Button, Form } from 'react-bootstrap';
import Navigation from '../../components/Navigation/Navigation';
import { TokenDetails } from '../../core/entities/tokenDetails';
import MessageDialog from '../../components/MessageDialog/MessageDialog';
import { addListing } from '../../services/listingService';
import { Config } from '../../core/config/config';
import NFTSelector from '../../components/NFTSelector/NFTSelector';
import { initContract } from '../../core/contract/contractInit';
import Footer from '../../components/Footer/Footer';

const CreateListing: NextPage = (props: any) => {
  
  const [messageDialogTitle, setMessageDialogTitle] = useState('');
  const [messageDialogDescription, setMessageDialogDescription] = useState('');
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [tokenDetails, setTokenDetails] = useState<TokenDetails>();
  const [inputLookingFor, setInputLookingFor] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [contract, setContract] = useState<any>(undefined);
  const [nftContract, setNftContract] = useState<any>(undefined);
  const [currentUser, setCurrentUser] = useState<any>(undefined);
  const [nearConfig, setNearConfig] = useState<any>(undefined);
  const [walletConnection, setWalletConnection] = useState<any>(undefined);

  useEffect(() => {
    const init = async () => {
      const initResponse = await initContract();
      setContract(initResponse.contract);
      setNftContract(initResponse.nftContract);
      setCurrentUser(initResponse.currentUser);
      setNearConfig(initResponse.nearConfig);
      setWalletConnection(initResponse.walletConnection);
    };
    init();
  }, []);
  
  const handleTokenSelected = async (token?: TokenDetails) => {
    if (!token) {
      setTokenDetails(undefined);
    } else {
      setTokenDetails(token);
      setInputLookingFor('');
    }
  }

  const handlePutTrade = async () => {
    try {
      if (isLoading) {
        return;
      }

      if (tokenDetails) {
        setIsLoading(true);

        await addListing(contract, {
          tokenContract: tokenDetails.tokenContract,
          tokenId: tokenDetails.tokenId,
          title: tokenDetails.title,
          image: tokenDetails.image,
          description: tokenDetails.description,
          lookingFor: inputLookingFor,
        });
  
        setIsLoading(false);
        setTokenDetails(undefined);

        setMessageDialogTitle('Successful');
        setMessageDialogDescription(`Your token has been listed for trade.`);
        setShowMessageDialog(true);
      }
    } catch (e) {
      setIsLoading(false);
      console.log(e);
      setMessageDialogTitle('Successful');
      setMessageDialogTitle('Failed');
      setMessageDialogDescription('Failed to add listing. Please try again later.');
    }
  };

  return (
    <div className={styles.container}>
      <PageHead title="NFT Exchange - Discover and trade NFTs" />
      <main >
        <Navigation 
          currentUser={currentUser} 
          nearConfig={nearConfig} 
          walletConnection={walletConnection} 
        />
        <Container className={styles.content}>
          <Row>
            <h1 className={styles.title}>Create New Listing</h1>
            {currentUser && (<span className={styles.user}>Logged in as {currentUser.accountId}</span>)}
          </Row>
          {!currentUser && (
            <div><p>Please connect your account.</p></div>
          )}
          {currentUser && (
            <Row className={styles.dashboard}>
              <Col lg={4} md={6} xs={12}>
                <NFTSelector contract={nftContract} accountId={currentUser?.accountId} tokenSelected={(token?: TokenDetails) => handleTokenSelected(token)} />
              </Col>
              {tokenDetails && (
              <Col lg={8} md={6} xs={12}>
                <div className={styles.infoContainer}>
                  <h2 className={styles.title}>{tokenDetails?.title}</h2>
                  <div>
                    <b>Token ID / NFT Contract Address</b>
                    <p>{tokenDetails?.tokenId} / {Config.nftContractName}</p>
                  </div>
                  <Row>
                      <Col lg={8} md={6} xs={12}>
                        <p>{tokenDetails?.description}</p>
                        <div>
                          <Form>
                            <Form.Label>What are you looking for?</Form.Label>
                            <Form.Control as="textarea" maxLength={1000} rows={3} value={inputLookingFor} onChange={(e) => setInputLookingFor(e.target.value)} />
                          </Form>
                        </div>
                      </Col>
                      <Col lg={4} md={6} xs={12}>
                        <img className={styles.image} src={`/assets/nft/${tokenDetails.image}`} alt='' />
                      </Col>
                  </Row>
                  <div className={styles.buttonContainer}>
                    <Button variant="primary" onClick={() => handlePutTrade()}>
                      {isLoading ? <>Please wait...</> : <>Put Up For Trade</>}
                    </Button>
                  </div>
                </div>
              </Col>
              )}
            </Row>
          )}
        </Container>
        <Footer />
      </main>

      {showMessageDialog && (
        <MessageDialog
          show={true}
          title={messageDialogTitle}
          description={messageDialogDescription}
          onClose={() => setShowMessageDialog(false)}
        />
      )}
    </div>
  )
}

export const getServerSideProps = async (context: any) => {
  return {
    props: {},
  };
};

export default CreateListing
