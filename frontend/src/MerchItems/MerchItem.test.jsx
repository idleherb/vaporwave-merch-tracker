import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import MerchItem from './MerchItem';

describe('MerchItem', () => {
  it('should display attributes', () => {
    const item = {
      artworkUrl: 'https://example.com/artwork1.jpg',
      label: 'aurawire',
      artist: 'Renjā',
      title: 'Xenon',
      releaseDate: 'Jul 27 2018',
      timestamp: 'Nov 9 2019 06:03:18 AM CET',
      url: 'https://aurawire.bandcamp.com/album/xenon',
    };
    const { queryByText } = render(<MerchItem item={item} />);

    /* eslint-disable no-unused-expressions */
    expect(queryByText(item.label)).not.toBeNull();
    expect(queryByText(item.artist)).not.toBeNull();
    expect(queryByText(item.title)).not.toBeNull();
    expect(queryByText(item.releaseDate)).not.toBeNull();
  });
});
