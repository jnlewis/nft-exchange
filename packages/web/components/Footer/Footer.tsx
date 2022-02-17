import Link from 'next/link';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './Footer.module.css';

const Footer = () => {
  
  return (
    <section className={styles.footer}>
      <Container>
        <Row>
          <Col lg={4} md={4}>
            <div className={styles.brand}>NFT Exchange</div>
            <p className={styles.appDescription}>NFT Exchange is a digital marketplace that lets you trade NFTs with a community of collectors. Put your token up for trade and start receiving offers.</p>
            <div className={styles.label}>Connect with us</div>
            <p>
              <Link href="https://github.com/jnlewis/nft-exchange"><a className={styles.link} target="_blank" rel="noreferrer">Find us on Github</a></Link>
            </p>
          </Col>
          <Col lg={8} md={8}>
            <Container>
              <Row>
                <Col lg={4} md={4}>
                  <b>Marketplace</b>
                  <ul className={styles.list}>
                    <li><Link href="/#explore"><a className={styles.link}>Explore</a></Link></li>
                    <li><Link href="/listing/create"><a className={styles.link}>Create Listing</a></Link></li>
                  </ul>
                </Col>
                <Col lg={4} md={4}>
                  <b>My Account</b>
                    <ul className={styles.list}>
                    <li><Link href="/account/listings"><a className={styles.link}>My Listings</a></Link></li>
                    <li><Link href="/account/offers"><a className={styles.link}>My Offers</a></Link></li>
                    <li><Link href="/account/offers"><a className={styles.link}>Incoming Offers</a></Link></li>
                  </ul>
                </Col>
                <Col lg={4} md={4}>
                  <b>Platform</b>
                  <ul className={styles.list}>
                    <li><Link href="https://github.com/jnlewis/nft-exchange"><a className={styles.link}>About</a></Link></li>
                  </ul>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Footer;
