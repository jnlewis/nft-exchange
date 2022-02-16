/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import styles from '../../styles/Details.module.css';
import PageHead from '../../components/PageHead/PageHead';
import { Col, Container, Row, Accordion, Button, Alert } from 'react-bootstrap';
import { fetchListingDetails } from '../../services/listingService';
import Navigation from '../../components/Navigation/Navigation';
import MakeOfferDialog from '../../components/MakeOfferDialog/MakeOfferDialog';
import { addOffer } from '../../services/offerService';
import { TokenDetails } from '../../core/entities/tokenDetails';
import MessageDialog from '../../components/MessageDialog/MessageDialog';
import { initContract } from '../../core/contract/contractInit';
import { ListingDetails } from '../../core/entities/listingDetails';
import Footer from '../../components/Footer/Footer';

const Details: NextPage = (props: any) => {
  const { listingId } = props;
  
  const [listingDetails, setListingDetails] = useState<ListingDetails | null>();

  const [showMakeOfferDialog, setShowMakeOfferDialog] = useState(false);
  const [messageDialogTitle, setMessageDialogTitle] = useState('');
  const [messageDialogDescription, setMessageDialogDescription] = useState('');
  const [showMessageDialog, setShowMessageDialog] = useState(false);
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
      
      // Get listing details
      const listingDetails = await fetchListingDetails(initResponse.contract, listingId);
      setListingDetails(listingDetails);
    };
    init();
  }, [listingId]);
  
  const handleOfferCancel = () => {
    setShowMakeOfferDialog(false);
  };
  const handleOfferConfirm = async (token: TokenDetails) => {

    try {

      if (listingDetails) {
        await addOffer(contract, {
          listingId: listingDetails.id,
          listingTokenContract: listingDetails.tokenContract,
          listingTokenId: listingDetails.tokenId,
          listingTokenTitle: listingDetails.title,
          listingTokenDescription: listingDetails.description,
          listingTokenImage: listingDetails.image,
          offerTokenContract: token.tokenContract,
          offerTokenId: token.tokenId,
          offerTokenTitle: token.title,
          offerTokenDescription: token.description,
          offerTokenImage: token.image,
          seller: listingDetails.seller,
          offerer: token.owner,
        });
      }

      setShowMakeOfferDialog(false);

      setMessageDialogTitle('Successful');
      setMessageDialogDescription(`Your offer has been submitted.`);
      setShowMessageDialog(true);
    } catch (e) {
      setIsLoading(false);
      console.log(e);
      setShowMakeOfferDialog(false);
      
      setShowMessageDialog(true);
      setMessageDialogTitle('Failed');
      setMessageDialogDescription('Failed to submit offer. Please try again later.');
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
        {listingDetails && (
          <Container className={styles.content}>
            <Row>
              <Col lg={5} md={7} xs={12}>
                <div>
                  <img className={styles.image} src={`/assets/nft/${listingDetails.image}`} alt='' />
                </div>
              </Col>
              <Col lg={5} md={7} xs={12}>
                <div className={styles.infoContainer}>
                  <h1 className={styles.title}>{listingDetails.title}</h1>
                  <p className={styles.subtitle}>Seller: {listingDetails.seller}</p>
                  <div>
                    <b>NFT</b>
                    <p>{listingDetails.tokenContract}</p>
                  </div>
                  <div>
                    <p>{listingDetails.description}</p>
                  </div>
                  
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Seller is looking for</Accordion.Header>
                      <Accordion.Body>
                        {listingDetails.lookingFor}
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>

                  {listingDetails.seller == currentUser.accountId && (
                    <div className='mt-4'>
                      <Alert variant="primary">This listing is posted by you.</Alert>
                    </div>
                  )}

                  {listingDetails.seller != currentUser.accountId && (
                    <div className={styles.buttonContainer}>
                      <Button variant="primary" onClick={() => setShowMakeOfferDialog(true)}>Make An Offer</Button>
                      <Button variant="outline-primary">Contact Seller</Button>
                    </div>
                  )}
                  
                </div>
              </Col>
            </Row>
          </Container>
        )}
        <Footer />
      </main>

      {showMakeOfferDialog && (
        <MakeOfferDialog
          nftContract={nftContract}
          currentUser={currentUser}
          show={true}
          description={`Make an offer for: ${listingDetails?.title}`}
          onCancel={() => handleOfferCancel()}
          onConfirm={(token: TokenDetails) => handleOfferConfirm(token)}
        />
      )}
      
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
  const { id } = context.query;

  return {
    props: {
      listingId: id
    },
  };
};

export default Details
