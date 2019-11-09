import React from 'react';
import * as PropTypes from 'prop-types';
import styles from './MerchItem.module.scss';

MerchItem.propTypes = {
  item: PropTypes.shape({
    label: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    remainingCassettes: PropTypes.number,
    releaseDate: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

function MerchItem(props) {
  const { item } = props;
  const {
    label, artist, title, timestamp, remainingCassettes, releaseDate, url,
  } = item;

  return (
    <tr className={styles.merchItem}>
      <td className={styles.attribute}>
        <a href={url} target="_blank" rel="noopener noreferrer">{label}</a>
      </td>
      <td className={styles.attribute}>
        <a href={url} target="_blank" rel="noopener noreferrer">{artist}</a>
      </td>
      <td className={styles.attribute}>
        <a href={url} target="_blank" rel="noopener noreferrer">{title}</a>
      </td>
      <td className={styles.attribute}>
        <a href={url} target="_blank" rel="noopener noreferrer" className={styles.warn}>{remainingCassettes}</a>
      </td>
      <td className={styles.attribute}>
        <a href={url} target="_blank" rel="noopener noreferrer">{releaseDate}</a>
      </td>
      <td className={styles.attribute}>
        <a href={url} target="_blank" rel="noopener noreferrer">{timestamp}</a>
      </td>
    </tr>
  );
}

export default MerchItem;
