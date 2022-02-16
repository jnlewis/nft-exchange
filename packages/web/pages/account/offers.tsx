/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import styles from '../../styles/AccountTokens.module.css';
import PageHead from '../../components/PageHead/PageHead';
import { Col, Container, Row, Alert, Button, Form } from 'react-bootstrap';
import Navigation from '../../components/Navigation/Navigation';
import AccountNavigation from '../../components/AccountNavigation/AccountNavigation';
import { OfferDetails } from '../../core/entities/offerDetails';
import AccountOfferOutgoingCard from '../../components/AccountOfferOutgoingCard/AccountOfferOutgoingCard';
import AccountOfferIncomingCard from '../../components/AccountOfferIncomingCard/AccountOfferIncomingCard';
import { Offers } from '../../core/entities/offers';
import MessageDialog from '../../components/MessageDialog/MessageDialog';
import { initContract } from '../../core/contract/contractInit';
import { fetchOffersByBuyer, fetchOffersBySeller } from '../../services/offerService';
import { Config } from '../../core/config/config';
import Footer from '../../components/Footer/Footer';

const AccountOffers: NextPage = () => {

  const [contract, setContract] = useState<any>(undefined);
  const [currentUser, setCurrentUser] = useState<any>(undefined);
  const [nearConfig, setNearConfig] = useState<any>(undefined);
  const [walletConnection, setWalletConnection] = useState<any>(undefined);

  const [incomingOffers, setIncomingOffers] = useState<Offers>();
  const [outgoingOffers, setOutgoingOffers] = useState<Offers>();

  const [messageDialogTitle, setMessageDialogTitle] = useState('');
  const [messageDialogDescription, setMessageDialogDescription] = useState('');
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  
  useEffect(() => {
    const init = async () => {
      const initResponse = await initContract();
      setContract(initResponse.contract);
      setCurrentUser(initResponse.currentUser);
      setNearConfig(initResponse.nearConfig);
      setWalletConnection(initResponse.walletConnection);

      const [incomingOffersData, outgoingOffersData] = await Promise.all([
        fetchOffersBySeller(initResponse.contract, initResponse.currentUser?.accountId),
        fetchOffersByBuyer(initResponse.contract, initResponse.currentUser?.accountId),
      ]);
      setIncomingOffers(incomingOffersData);
      setOutgoingOffers(outgoingOffersData);
    };
    init();
  }, []);

  const handleAcceptOffer = async (tokenContract: string, tokenId: string) => {
    let response = await contract.acceptOffer(
      { 
        tokenContract: tokenContract, 
        tokenId: tokenId,
      },
      Config.gasFee,
      0
    )
    console.log(response);

    setMessageDialogTitle('Successful');
    setMessageDialogDescription(`Successfully accepted offer.`);
    setShowMessageDialog(true);
  }

  const handleCancelOffer = async (tokenContract: string, tokenId: string) => {
    let response = await contract.cancelOffer(
      { 
        tokenContract: tokenContract, 
        tokenId: tokenId,
      },
      Config.gasFee,
      0
    )
    console.log(response);
    
    setMessageDialogTitle('Successful');
    setMessageDialogDescription(`Successfully retracted offer.`);
    setShowMessageDialog(true);

    // Refresh
    const outgoingOffersData = await fetchOffersByBuyer(contract, currentUser?.accountId);
    setOutgoingOffers(outgoingOffersData);
  }

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
            <h1 className={styles.title}>Your Tokens &amp; Offers</h1>
            {currentUser && (<span className={styles.user}>Logged in as {currentUser.accountId}</span>)}
          </Row>
          {!currentUser && (
            <div><p>Please connect your account.</p></div>
          )}
          {currentUser && (
          <Row>
            <div className={styles.dashboard}>
              <AccountNavigation activeMenu='offers' />
              <div className={styles.sectionTitle}>
                Incoming offers for your NFT
              </div>
              {incomingOffers?.items?.length === 0 && (
                <div>You do not have any incoming offer.</div>
              )}
              <div className={styles.itemsContainer}>
                {incomingOffers?.items.map((offer: OfferDetails) => (
                  <AccountOfferIncomingCard 
                    key={offer.id}
                    title={offer.offerTokenTitle}
                    image={`/assets/nft/${offer.offerTokenImage}`}
                    subtitle={`${offer.offerTokenId} / ${offer.offerTokenContract}`}
                    description={offer.offerTokenDescription}
                    targetTitle={offer.listingTokenTitle}
                    targetLink={`/details/${offer.listingId}`}
                    onAccept={() => handleAcceptOffer(offer.offerTokenContract, offer.offerTokenId)}
                  />
                ))}
              </div>

              <div className={styles.sectionTitle}>
                Your offers
              </div>
              <div className={styles.itemsContainer}>
                {outgoingOffers?.items?.length === 0 && (
                  <div>You did not make any offer.</div>
                )}
                {outgoingOffers?.items.map((offer: OfferDetails) => (
                  <AccountOfferOutgoingCard 
                    key={offer.id}
                    title={offer.offerTokenTitle}
                    image={`/assets/nft/${offer.offerTokenImage}`}
                    subtitle={`${offer.offerTokenId} / ${offer.offerTokenContract}`}
                    description={offer.offerTokenDescription}
                    targetTitle={offer.listingTokenTitle}
                    targetLink={`/details/${offer.listingId}`}
                    onCancel={() => handleCancelOffer(offer.offerTokenContract, offer.offerTokenId)}
                  />
                ))}
              </div>
            </div>
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

export default AccountOffers
