import { formatDate, formatTimestamp, sortItems } from './util';

describe('util', () => {
  describe('date and time formatting', () => {
    it('should format a date as mmm d yyyy', () => {
      const actual = formatDate('17 Nov 2019 16:20:55 GMT');
      const expected = 'Nov 17 2019';

      expect(actual).toBe(expected);
    });

    it('should format a timestamp as mmm d yyyy hh:MM:ss TT', () => {
      const actual = formatTimestamp('2019-11-09T06:03:24.056069');
      const expected = 'Nov 9 2019 06:03:24 AM';

      expect(actual).toBe(expected);
    });
  });

  describe('sorting', () => {
    it('should sort items by remaining items asc', () => {
      const items = [
        {
          artworkUrl: '',
          label: '',
          artist: '',
          title: '',
          releaseDate: '',
          timestamp: '',
          url: '',
          remaining: 10,
          merchType: 'Cassette',
        },
        {
          artworkUrl: '',
          label: '',
          artist: '',
          title: '',
          releaseDate: '',
          timestamp: '',
          url: '',
          remaining: 1,
          merchType: 'Cassette',
        },
      ];

      const actual = sortItems(items);
      const expected = [
        {
          artworkUrl: '',
          label: '',
          artist: '',
          title: '',
          releaseDate: '',
          timestamp: '',
          url: '',
          remaining: 1,
          merchType: 'Cassette',
        },
        {
          artworkUrl: '',
          label: '',
          artist: '',
          title: '',
          releaseDate: '',
          timestamp: '',
          url: '',
          remaining: 10,
          merchType: 'Cassette',
        },
      ];
      expect(actual).toStrictEqual(expected);
    });

    it('should sort items by release date desc', () => {
      const items = [
        {
          artworkUrl: '',
          label: '',
          artist: '',
          title: '',
          releaseDate: '20151231',
          timestamp: '',
          url: '',
          remaining: 1,
          merchType: 'Cassette',
        },
        {
          artworkUrl: '',
          label: '',
          artist: '',
          title: '',
          releaseDate: '20190101',
          timestamp: '',
          url: '',
          remaining: 1,
          merchType: 'Cassette',
        },
      ];

      const actual = sortItems(items);
      const expected = [
        {
          artworkUrl: '',
          label: '',
          artist: '',
          title: '',
          releaseDate: '20190101',
          timestamp: '',
          url: '',
          remaining: 1,
          merchType: 'Cassette',
        },
        {
          artworkUrl: '',
          label: '',
          artist: '',
          title: '',
          releaseDate: '20151231',
          timestamp: '',
          url: '',
          remaining: 1,
          merchType: 'Cassette',
        },
      ];
      expect(actual).toStrictEqual(expected);
    });

    it('should sort items by artist asc', () => {
      const items = [
        {
          artworkUrl: '',
          label: '',
          artist: 'z',
          title: '',
          releaseDate: '20190101',
          timestamp: '',
          url: '',
          remaining: 1,
          merchType: 'Cassette',
        },
        {
          artworkUrl: '',
          label: '',
          artist: 'a',
          title: '',
          releaseDate: '20190101',
          timestamp: '',
          url: '',
          remaining: 1,
          merchType: 'Cassette',
        },
      ];

      const actual = sortItems(items);
      const expected = [
        {
          artworkUrl: '',
          label: '',
          artist: 'a',
          title: '',
          releaseDate: '20190101',
          timestamp: '',
          url: '',
          remaining: 1,
          merchType: 'Cassette',
        },
        {
          artworkUrl: '',
          label: '',
          artist: 'z',
          title: '',
          releaseDate: '20190101',
          timestamp: '',
          url: '',
          remaining: 1,
          merchType: 'Cassette',
        },
      ];
      expect(actual).toStrictEqual(expected);
    });
  });
});
