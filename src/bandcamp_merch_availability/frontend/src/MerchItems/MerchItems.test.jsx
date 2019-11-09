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
        releaseDate: '20180928',
        timestamp: '2019-11-09T06:03:24.056069',
        url: 'https://aurawire.bandcamp.com/album/where',
        remainingCassettes: 8,
      },
      {
        label: 'Dream Catalogue',
        artist: 'Chungking Mansions',
        title: 'ShowView',
        releaseDate: '20150311',
        timestamp: '2019-11-09T06:03:27.005525',
        url: 'https://dreamcatalogue.bandcamp.com/album/showview',
      },
    ];
    const { findByText } = render(<MerchItems items={items} />);

    /* eslint-disable no-unused-expressions */
    expect(await findByText(items[0].label)).not.toBeNull;
    expect(await findByText(items[0].artist)).not.toBeNull;
    expect(await findByText(items[0].title)).not.toBeNull;
    expect(await findByText(items[0].releaseDate)).not.toBeNull;
    expect(await findByText(items[0].timestamp)).not.toBeNull;
    expect(await findByText(items[0].url)).not.toBeNull;
    expect(await findByText(`${items[0].remainingCassettes}`)).not.toBeNull;

    expect(await findByText(items[1].label)).not.toBeNull;
    expect(await findByText(items[1].artist)).not.toBeNull;
    expect(await findByText(items[1].title)).not.toBeNull;
    expect(await findByText(items[1].releaseDate)).not.toBeNull;
    expect(await findByText(items[1].timestamp)).not.toBeNull;
    expect(await findByText(items[1].url)).not.toBeNull;
  });
});
