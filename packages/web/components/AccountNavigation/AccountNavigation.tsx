import React from 'react';
import styles from './AccountNavigation.module.css';

interface AccountNavigationProps {
  activeMenu: string;
}

const AccountNavigation = ({ activeMenu }: AccountNavigationProps) => {
  
  const listingsLinkClassName = activeMenu === 'tokens' ? 'nav-link active' : 'nav-link';
  const offersLinkClassName = activeMenu === 'offers' ? 'nav-link active' : 'nav-link';

  return (
    <ul className="nav nav-tabs" id="myTab" role="tablist">
      <li className="nav-item">
        <a
          className={listingsLinkClassName}
          data-toggle="tab"
          href="/account/listings"
          role="tab"
          aria-selected="false"
        >
          Listings
        </a>
      </li>
      <li className="nav-item">
        <a
          className={offersLinkClassName}
          data-toggle="tab"
          href="/account/offers"
          role="tab"
          aria-selected="false"
        >
          Offers
        </a>
      </li>
    </ul>
  );
};

export default AccountNavigation;
