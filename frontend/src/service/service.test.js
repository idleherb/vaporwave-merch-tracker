import axios from 'axios';
import { when } from 'jest-when';

import { formatDate, formatTimestamp, sortItems } from './util';
import fetchMerchItems from './service';

jest.mock('axios');
jest.mock('./util');

describe('service', () => {
  formatDate.mockImplementation((str) => str);
  formatTimestamp.mockImplementation((str) => str);
  sortItems.mockImplementation((items) => items);

  it('should call backend and return list of merch items', async () => {
    const merchItems = [
      {
        artist: 'Donor Lens',
        currency: 'GBP',
        editionOf: null,
        id: 618059824,
        image_id: 17886166,
        label: 'My Pet Flamingo',
        merchType: 'Cassette',
        price: 10.0,
        releaseDate: '17 Nov 2019 16:20:55 GMT',
        remaining: 10,
        timestamp: '2019-11-08T20:43:31.123456',
        title: 'Miracle Lounge มิราเคิล เลานจ์',
        url: 'https://mypetflamingo.bandcamp.com/album/miracle-lounge',
      },
      {
        artist: 'V ▲ P Y D',
        currency: 'CAD',
        editionOf: 25,
        id: 3841970121,
        image_id: 17051339,
        label: 'STRUDELSOFT',
        merchType: 'Floppy',
        price: 8.0,
        releaseDate: '25 Jul 2019 15:25:39 GMT',
        remaining: 12,
        timestamp: '2019-11-08T20:43:31.123456',
        title: 'V ▲ P Y D - Virtua City Mall EP 3.5" FLOPPY DISK',
        url: 'https://strudelsoft.bandcamp.com/merch/v-p-y-d-virtua-city-mall-ep-35-floppy-disk',
      },
    ];
    const responseMock = {
      data: merchItems,
    };
    when(axios.get).calledWith('/bandcamp_merch.json').mockResolvedValue(responseMock);

    const actual = await fetchMerchItems();
    expect(actual).toStrictEqual(merchItems);
    expect(axios.get).toHaveBeenCalledWith('/bandcamp_merch.json');
    expect(sortItems).toHaveBeenCalledWith(merchItems);
  });
});
