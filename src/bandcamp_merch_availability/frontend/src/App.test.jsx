import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import App from './App';
import fetchMerchItems from './service/service';

jest.mock('./service/service');

describe('App', () => {
  it('should call service method when application loads', async () => {
    const merchItems = [
      {
        label: 'aurawire',
        artist: 'Renjā',
        title: 'Xenon',
        releaseDate: '20180727',
        timestamp: '2019-11-09T06:03:18.962686',
        url: 'https://aurawire.bandcamp.com/album/xenon',
      },
      {
        label: 'aurawire',
        artist: '회사AUTO',
        title: 'Remix Métaphysique',
        releaseDate: '20180831',
        timestamp: '2019-11-09T06:03:22.184133',
        url: 'https://aurawire.bandcamp.com/album/remix-m-taphysique',
      },
    ];
    fetchMerchItems.mockReturnValue(merchItems);

    const { findByText } = render(<App />);

    const actual = await findByText('Hello, World!');
    expect(actual).not.toBeNull();
    expect(fetchMerchItems).toHaveBeenCalled();
  });
});
