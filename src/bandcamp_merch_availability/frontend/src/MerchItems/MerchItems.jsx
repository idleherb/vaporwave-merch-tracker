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
          <th className={styles.tableHeaderCell}>Label</th>
          <th className={styles.tableHeaderCell}>Artist</th>
          <th className={styles.tableHeaderCell}>Release&nbsp;Title</th>
          <th className={styles.tableHeaderCell}>Cassettes&nbsp;Left</th>
          <th className={styles.tableHeaderCell}>Release&nbsp;Date</th>
          <th className={styles.tableHeaderCell}>Last&nbsp;Checked</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => <MerchItem className={styles.merchItem} item={item} key={item.url} />)}
      </tbody>
    </table>
  );
}

export default MerchItems;
