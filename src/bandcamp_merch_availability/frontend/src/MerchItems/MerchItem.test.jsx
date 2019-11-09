import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import MerchItem from './MerchItem';

describe('MerchItem', () => {
  it('should display attributes', async () => {
    const item = {
      label: 'aurawire',
      artist: 'Renjā',
      title: 'Xenon',
      release_date: '20180727',
      timestamp: '2019-11-09T06:03:18.962686',
      url: 'https://aurawire.bandcamp.com/album/xenon',
    };
    const { findByText } = render(<MerchItem item={item}/>);

    expect(await findByText(item.label)).not.toBeNull;
    expect(await findByText(item.artist)).not.toBeNull;
    expect(await findByText(item.title)).not.toBeNull;
    expect(await findByText(item.release_date)).not.toBeNull;
    expect(await findByText(item.timestamp)).not.toBeNull;
    expect(await findByText(item.url)).not.toBeNull;
  });
});