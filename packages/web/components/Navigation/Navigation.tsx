import React, { useEffect, useState } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import styles from './Navigation.module.css';

interface NavigationProps {
  currentUser: any;
  nearConfig: any;
  walletConnection: any;
}

const Navigation = ({
  currentUser,
  nearConfig,
  walletConnection,
}: NavigationProps) => {

  const signIn = () => {
    walletConnection.requestSignIn(
      {contractId: nearConfig.contractName, methodNames: ['createListing', 'cancelListing', 'makeOffer', 'cancelOffer', 'acceptOffer']}, //contract requesting access
      'NFT Exchange', //optional name
      null, //optional URL to redirect to if the sign in was successful
      null //optional URL to redirect to if the sign in was NOT successful
    );
  };

  const signOut = () => {
    walletConnection.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  };
  
  return (
    <Navbar fixed="top" className={styles.nav}>
      <Navbar.Brand className={styles.brand} href="/">
        NFT Exchange
      </Navbar.Brand>
      <Navbar.Toggle />
      {currentUser && (
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <a className={styles.linkItemBold} href="/account/listings">Account</a>
          </Navbar.Text>
          <Navbar.Text>
            <a className={styles.linkItem} href="/listing/create">Create Listing</a>
          </Navbar.Text>
          <Navbar.Text>
            <a className={styles.linkItem} onClick={() => signOut()}>Logout</a>
          </Navbar.Text>
      </Navbar.Collapse>
      )}
      {!currentUser && (
      <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <a className={styles.linkItemBold} onClick={() => signIn()}>Connect Wallet</a>
          </Navbar.Text>
      </Navbar.Collapse>
      )}
    </Navbar>
  );
};

export default Navigation;
