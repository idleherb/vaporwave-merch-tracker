import axios from 'axios';
import { when } from 'jest-when';

import { formatDate, formatTimestamp } from './util';
import fetchMerchItems from './service';

jest.mock('axios');
jest.mock('./util');

describe('service', () => {
  formatDate.mockImplementation((str) => str);
  formatTimestamp.mockImplementation((str) => str);

  it('should call backend and return list of merch items', async () => {
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
    const responseMock = {
      data: merchItems,
    };
    when(axios.get).calledWith('/bandcamp_merch.json').mockResolvedValue(responseMock);

    const actual = await fetchMerchItems();
    expect(actual).toStrictEqual(merchItems);
    expect(axios.get).toHaveBeenCalledWith('/bandcamp_merch.json');
  });
});
