import { formatDate, formatTimestamp, sortItems } from './util';

describe('util', () => {
  describe('date and time formatting', () => {
    it('should format a date as mmm d yyyy', () => {
      const actual = formatDate('20180928');
      const expected = 'Sep 28 2018';
  
      expect(actual).toBe(expected);
    });
  
    it('should format a timestamp as mmm d yyyy hh:MM:ss TT', () => {
      const actual = formatTimestamp('2019-11-09T06:03:24.056069');
      const expected = 'Nov 9 2019 06:03:24 AM';
  
      expect(actual).toBe(expected);
    });
  });

  describe('sorting', () => {
    it('should sort items by remaining cassettes asc', () => {
      const items = [
        {
            "label": "",
            "artist": "",
            "title": "",
            "releaseDate": "",
            "timestamp": "",
            "url": "",
            "remainingCassettes": 10
        },
        {
            "label": "",
            "artist": "",
            "title": "",
            "releaseDate": "",
            "timestamp": "",
            "url": "",
            "remainingCassettes": 1
        },
      ];

      const actual = sortItems(items);
      const expected = [
        {
            "label": "",
            "artist": "",
            "title": "",
            "releaseDate": "",
            "timestamp": "",
            "url": "",
            "remainingCassettes": 1
        },
        {
            "label": "",
            "artist": "",
            "title": "",
            "releaseDate": "",
            "timestamp": "",
            "url": "",
            "remainingCassettes": 10
        },
      ];
      expect(actual).toStrictEqual(expected)
    });
  });
});
