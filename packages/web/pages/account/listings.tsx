/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import styles from '../../styles/AccountTokens.module.css';
import PageHead from '../../components/PageHead/PageHead';
import { Col, Container, Row, Alert, Button, Form } from 'react-bootstrap';
import Navigation from '../../components/Navigation/Navigation';
import AccountNavigation from '../../components/AccountNavigation/AccountNavigation';
import AccountTokenCard from '../../components/AccountTokenCard/AccountTokenCard';
import { fetchListingBySeller } from '../../services/listingService';
import { ListingDetails } from '../../core/entities/listingDetails';
import { Listings } from '../../core/entities/listings';
import { initContract } from '../../core/contract/contractInit';
import MessageDialog from '../../components/MessageDialog/MessageDialog';
import { Config } from '../../core/config/config';
import Footer from '../../components/Footer/Footer';

const AccountTokens: NextPage = () => {

  const [contract, setContract] = useState<any>(undefined);
  const [currentUser, setCurrentUser] = useState<any>(undefined);
  const [nearConfig, setNearConfig] = useState<any>(undefined);
  const [walletConnection, setWalletConnection] = useState<any>(undefined);

  const [listings, setListings] = useState<Listings>();

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

      // Get listings
      const listings = await fetchListingBySeller(initResponse.contract, initResponse.currentUser?.accountId);
      setListings(listings);
    };
    init();
  }, []);

  const handleCloseListing = async (tokenContract: string, tokenId: string) => {
    
    let response = await contract.cancelListing(
      { 
        tokenContract: tokenContract, 
        tokenId: tokenId,
      },
      Config.gasFee,
      0
    )
    console.log(response);
    
    setMessageDialogTitle('Successful');
    setMessageDialogDescription(`Successfully cancelled listing.`);
    setShowMessageDialog(true);

    // Refresh listings
    const listings = await fetchListingBySeller(contract, currentUser?.accountId);
    setListings(listings);
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
                <AccountNavigation activeMenu='tokens' />
                <div className={styles.sectionTitle}>
                  Tokens you have listed for trade
                </div>
                <div className={styles.itemsContainer}>
                {listings?.items?.map((listing: ListingDetails) => (
                  <AccountTokenCard 
                    key={listing.id}
                    title={listing.title}
                    image={`/assets/nft/${listing.image}`}
                    subtitle={`${listing.tokenId} / ${listing.tokenContract}`}
                    description={listing.description}
                    link={`/listing/${listing.id}`}
                    onCloseListing={() => handleCloseListing(listing.tokenContract, listing.tokenId)}
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

export default AccountTokens
