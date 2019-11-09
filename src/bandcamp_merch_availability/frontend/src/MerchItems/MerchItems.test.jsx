import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import MerchItems from './MerchItems';

describe('MerchItems', () => {
  it('should display 2 merch items', async () => {
    const items = [ 
      {
        label: 'aurawire', 
        artist: 'Streymoyer', 
        title: 'Where', 
        release_date: '20180928', 
        timestamp: '2019-11-09T06:03:24.056069', 
        url: 'https://aurawire.bandcamp.com/album/where',
        remaining_cassettes: 8,
      },
      {
        label: 'Dream Catalogue',
        artist: 'Chungking Mansions',
        title: 'ShowView',
        release_date: '20150311',
        timestamp: '2019-11-09T06:03:27.005525',
        url: 'https://dreamcatalogue.bandcamp.com/album/showview',
      },
    ];
    const { findByText } = render(<MerchItems items={items}/>);

    expect(await findByText(items[0].label)).not.toBeNull;
    expect(await findByText(items[0].artist)).not.toBeNull;
    expect(await findByText(items[0].title)).not.toBeNull;
    expect(await findByText(items[0].release_date)).not.toBeNull;
    expect(await findByText(items[0].timestamp)).not.toBeNull;
    expect(await findByText(items[0].url)).not.toBeNull;
    expect(await findByText('' + items[0].remaining_cassettes)).not.toBeNull;

    expect(await findByText(items[1].label)).not.toBeNull;
    expect(await findByText(items[1].artist)).not.toBeNull;
    expect(await findByText(items[1].title)).not.toBeNull;
    expect(await findByText(items[1].release_date)).not.toBeNull;
    expect(await findByText(items[1].timestamp)).not.toBeNull;
    expect(await findByText(items[1].url)).not.toBeNull;
  });
});