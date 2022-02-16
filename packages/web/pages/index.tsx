import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import PageHead from '../components/PageHead/PageHead';
import { Col, Container, Row, Button } from 'react-bootstrap';
import Navigation from '../components/Navigation/Navigation';
import NFTCard from '../components/NFTCard/NFTCard';
import { fetchListings } from '../services/listingService';
import { ListingDetails } from '../core/entities/listingDetails';
import { useEffect, useState } from 'react';
import { initContract } from '../core/contract/contractInit';
import { Listings } from '../core/entities/listings';
import Footer from '../components/Footer/Footer';

const Home: NextPage = () => {

  const [listings, setListings] = useState<Listings>();

  const [contract, setContract] = useState<any>(undefined);
  const [currentUser, setCurrentUser] = useState<any>(undefined);
  const [nearConfig, setNearConfig] = useState<any>(undefined);
  const [walletConnection, setWalletConnection] = useState<any>(undefined);

  useEffect(() => {
    const init = async () => {
      const initResponse = await initContract();
      setContract(initResponse.contract);
      setCurrentUser(initResponse.currentUser);
      setNearConfig(initResponse.nearConfig);
      setWalletConnection(initResponse.walletConnection);

      // Get listings
      const listings = await fetchListings(initResponse.contract);
      setListings(listings);
    };
    init();
  }, []);

  return (
    <div className={styles.container}>
      <PageHead title="NFT Exchange - Discover and trade NFTs" />
      <main>
        <Navigation 
          currentUser={currentUser} 
          nearConfig={nearConfig} 
          walletConnection={walletConnection} 
        />
        <div className={styles.intro}>
          <Container>
            <div className={styles.introTextContainer}>
              <h1 className={styles.title}>NFT Exchange</h1>
              <p className={styles.subtitle}>
                Discover and trade amazing NFTs
              </p>
              <div style={{paddingTop: 30}}>
                <Button variant="primary" href="#explore">Explore</Button>
                <Button variant="outline-primary" href="/listing/create">Create Listing</Button>
              </div>
            </div>
          </Container>
          <div className={styles.introOverlay}></div>
        </div>
        <Container id="explore">
          <Row style={{ marginTop: 80, marginBottom: 80 }}>
            <h2 className={styles.heading}>Featured Collections</h2>
            {listings && listings.items.map((listing: ListingDetails) => (
              <Col key={listing.id} lg={4} md={6} xs={12}>
                <NFTCard 
                  listingId={listing.id}
                  title={listing.title}
                  image={listing.image}
                  description={listing.description}
                  seller={listing.seller} 
                />
              </Col>
            ))}
          </Row>
        </Container>
        <Footer />
      </main>
    </div>
  )
}

export default Home
