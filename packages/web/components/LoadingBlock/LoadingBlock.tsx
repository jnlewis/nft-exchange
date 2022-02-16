import React from 'react';
import styles from './LoadingBlock.module.css';

export default function LoadingBlock() {
  return (
    <>
      <style jsx global>
        {styles}
      </style>
      <div className={styles.loadingContainer}>
        <div className={styles.loading}></div>
      </div>
    </>
  );
}
