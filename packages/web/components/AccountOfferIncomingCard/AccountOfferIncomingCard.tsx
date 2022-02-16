import React from 'react';
import { Button } from 'react-bootstrap';
import styles from './AccountOfferIncomingCard.module.css';

interface AccountOfferIncomingCardProps {
  title: string;
  image: string;
  subtitle: string;
  description: string;
  targetTitle: string;
  targetLink: string;
  onAccept: () => void;
}

const AccountOfferIncomingCard = ({
  title,
  image,
  subtitle,
  description,
  targetTitle,
  targetLink,
  onAccept,
}: AccountOfferIncomingCardProps) => {

  return (
    <div className={styles.wrapper}>
      <div className={styles.mediaImageWrapper}>
        <img className={styles.mediaImage} src={image} alt="" />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>
          <span>{title}</span>
          <span> in exchange for </span>
          <a className={styles.link} href={targetLink}>{targetTitle}</a>
        </h3>
        <div className={styles.subtitle}>
          {subtitle}
        </div>
        <div className={styles.description}>
          {description}
        </div>
        <div className={styles.actionBar}>
          <a className={styles.acceptButton} onClick={() => onAccept && onAccept()}>Accept Offer</a>
        </div>
      </div>
    </div>
  );
};

export default AccountOfferIncomingCard;
