import React from 'react';
import { Button } from 'react-bootstrap';
import styles from './AccountTokenCard.module.css';

interface AccountTokenCardProps {
  title: string;
  image: string;
  subtitle: string;
  description: string;
  link: string;
  onCloseListing: () => void;
}

const AccountTokenCard = ({
  title,
  image,
  subtitle,
  description,
  link,
  onCloseListing,
}: AccountTokenCardProps) => {

  return (
    <div className={styles.wrapper}>
      <div className={styles.mediaImageWrapper}>
        <img className={styles.mediaImage} src={image} alt="" />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>
          <a href={link}>{title}</a>
        </h3>
        <div className={styles.subtitle}>
          {subtitle}
        </div>
        <div className={styles.description}>
          {description}
        </div>
        <div className={styles.actionBar}>
          <a className={styles.actionButton} onClick={() => onCloseListing()}>Close Listing</a>
        </div>
      </div>
    </div>
  );
};

export default AccountTokenCard;
