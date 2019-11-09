import React from 'react';

import MerchItem from './MerchItem';

function MerchItems(props) {
  const items = props.items.map(item => {
    return <MerchItem item={item} key={item.url} />
  });

  return (
    <ol>{items}</ol>
  );
}

export default MerchItems;
