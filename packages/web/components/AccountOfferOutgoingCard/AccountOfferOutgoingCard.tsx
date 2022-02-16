import React from 'react';
import { Button } from 'react-bootstrap';
import styles from './AccountOfferOutgoingCard.module.css';

interface AccountOfferOutgoingCardProps {
  title: string;
  image: string;
  subtitle: string;
  description: string;
  targetTitle: string;
  targetLink: string;
  onCancel: () => void;
}

const AccountOfferOutgoingCard = ({
  title,
  image,
  subtitle,
  description,
  targetTitle,
  targetLink,
  onCancel,
}: AccountOfferOutgoingCardProps) => {

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
          <a className={styles.actionButton} onClick={() => onCancel && onCancel()}>Retract Offer</a>
        </div>
      </div>
    </div>
  );
};

export default AccountOfferOutgoingCard;
