import React from 'react';
import * as PropTypes from 'prop-types';

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
    <li>
      <span>{label}</span>
      <span>{artist}</span>
      <span>{title}</span>
      <span>{releaseDate}</span>
      <span>{remainingCassettes}</span>
      <span>{timestamp}</span>
      <span>{url}</span>
    </li>
  );
}

export default MerchItem;
