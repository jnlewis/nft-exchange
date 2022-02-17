import Link from 'next/link';
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
        <Link href="/account/listings">
          <a
            className={listingsLinkClassName}
            data-toggle="tab"
            role="tab"
            aria-selected="false"
          >
            Listings
          </a>
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/account/offers">
          <a
            className={offersLinkClassName}
            data-toggle="tab"
            role="tab"
            aria-selected="false"
          >
            Offers
          </a>
        </Link>
      </li>
    </ul>
  );
};

export default AccountNavigation;
