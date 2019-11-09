import React from 'react';

function MerchItem(props) {
  const { label, artist, title, timestamp, cassettes_remaining, release_date, url } = props.attributes;

  return (
    <li>
      <span>{label}</span>
      <span>{artist}</span>
      <span>{title}</span>
      <span>{release_date}</span>
      <span>{cassettes_remaining}</span>
      <span>{timestamp}</span>
      <span>{url}</span>
    </li>
  );
}

export default MerchItem;
