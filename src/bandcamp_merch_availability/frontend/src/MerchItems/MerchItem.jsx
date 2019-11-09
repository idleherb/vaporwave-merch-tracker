import React from 'react';

function MerchItem(props) {
  const { label, artist, title, timestamp, remaining_cassettes, release_date, url } = props.item;

  return (
    <li>
      <span>{label}</span>
      <span>{artist}</span>
      <span>{title}</span>
      <span>{release_date}</span>
      <span>{remaining_cassettes}</span>
      <span>{timestamp}</span>
      <span>{url}</span>
    </li>
  );
}

export default MerchItem;
