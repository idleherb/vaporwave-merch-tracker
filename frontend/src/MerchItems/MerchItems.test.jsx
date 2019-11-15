import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import MerchItems from './MerchItems';

describe('MerchItems', () => {
  it('should display 2 merch items', () => {
    const items = [
      {
        artworkUrl: 'https://example.com/artwork1.jpg',
        label: 'aurawire',
        artist: 'Streymoyer',
        title: 'Where',
        releaseDate: '20180928',
        timestamp: '2019-11-09T06:03:24.056069',
        url: 'https://aurawire.bandcamp.com/album/where',
        remainingCassettes: 8,
      },
      {
        artworkUrl: 'https://example.com/artwork2.jpg',
        label: 'Dream Catalogue',
        artist: 'Chungking Mansions',
        title: 'ShowView',
        releaseDate: '20150311',
        timestamp: '2019-11-09T06:03:27.005525',
        url: 'https://dreamcatalogue.bandcamp.com/album/showview',
      },
    ];
    const { queryByText } = render(<MerchItems items={items} />);

    /* eslint-disable no-unused-expressions */
    let elem = null;

    elem = queryByText(items[0].label);
    notNull(elem);
    elem = queryByText(items[0].artist);
    notNull(elem);
    elem = queryByText(items[0].title);
    notNull(elem);
    elem = queryByText(items[0].releaseDate);
    notNull(elem);
    elem = queryByText(`${items[0].remainingCassettes} remaining`);
    notNull(elem);

    elem = queryByText(items[1].label);
    notNull(elem);
    elem = queryByText(items[1].artist);
    notNull(elem);
    elem = queryByText(items[1].title);
    notNull(elem);
    elem = queryByText(items[1].releaseDate);
    notNull(elem);
  });

  function notNull(elem) {
    expect(elem).not.toBeNull();
  }
});
