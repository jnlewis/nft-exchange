import React from 'react';
import { Button, Card } from 'react-bootstrap';
import styles from './NFTCard.module.css';

interface NFTCardProps {
  listingId: number;
  title: string;
  image: string;
  description: string;
  seller: string;
}

const NFTCard = ({
  listingId,
  title,
  image,
  description,
  seller,
}: NFTCardProps) => (
  <Card className={styles.card}>
    <Card.Img className={styles.cardImage} variant="top" src={`/assets/nft/${image}`} />
    <Card.Body className={styles.cardBody}>
      <Card.Title className={styles.cardTitle}>{title}</Card.Title>
      <Card.Text className={styles.cardSubtitle}>By {seller}</Card.Text>
      <Card.Text className={styles.cardDescription}>
        {description}
      </Card.Text>
      <Button variant="outline-primary" href={`/listing/${listingId}`}>View Details</Button>
    </Card.Body>
  </Card>
);

export default NFTCard;
