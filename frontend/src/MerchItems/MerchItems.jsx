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
    <div className={styles.merchItems}>
      {items.map((item) => <MerchItem item={item} key={item.url} />)}
    </div>
  );
}

export default MerchItems;
