import React from 'react';
import * as PropTypes from 'prop-types';
import styles from './MerchItem.module.scss';

MerchItem.propTypes = {
  item: PropTypes.shape({
    artworkUrl: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    remainingCassettes: PropTypes.number,
    releaseDate: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

function MerchItem(props) {
  const { item } = props;
  const {
    artworkUrl, label, artist, title, remainingCassettes, releaseDate, url,
  } = item;

  const divRemaining = remainingCassettes ? (
    <div className={styles.warn}>
      {remainingCassettes}
      {' '}
remaining
    </div>
  ) : ' ';

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={styles.merchItem}>
      <img src={artworkUrl} alt="Album art" />
      <div className={styles.attributes}>
        <div className={styles.attribute}>{label !== artist ? label : ' '}</div>
        <div className={`${styles.attribute} ${styles.bold}`}>{artist}</div>
        <div className={styles.attribute}>{title}</div>
        <div className={styles.attribute}>{divRemaining}</div>
        <div className={`${styles.attribute} ${styles.fineprint}`}>{releaseDate}</div>
      </div>
    </a>
  );
}

export default MerchItem;
