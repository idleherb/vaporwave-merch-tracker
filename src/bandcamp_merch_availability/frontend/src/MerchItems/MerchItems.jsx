import React from 'react';
import * as PropTypes from 'prop-types';
import styles from './MerchItems.module.scss';

import MerchItem from './MerchItem';

MerchItems.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    remainingCassettes: PropTypes.number,
    releaseDate: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  })).isRequired,
};

function MerchItems(props) {
  const { items } = props;

  return (
    <table className={styles.merchItems}>
      <thead className={styles.tableHeader}>
        <tr>
          <th>Label</th>
          <th>Artist</th>
          <th>Release Title</th>
          <th>Release Date</th>
          <th>Cassettes Left</th>
          <th>Last Checked</th>
          <th>Bandcamp Link</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => <MerchItem className={styles.merchItem} item={item} key={item.url} />)}
      </tbody>
    </table>
  );
}

export default MerchItems;
