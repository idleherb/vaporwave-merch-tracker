import { formatDate, formatTimestamp } from './util';

describe('util', () => {
  it('should format a date as mmm d yyyy', () => {
    const actual = formatDate('20180928');
    const expected = 'Sep 28, 2018';

    expect(actual).toBe(expected);
  });

  it('should format a timestamp as mmm d yyyy hh:MM:ss TT', () => {
    const actual = formatTimestamp('2019-11-09T06:03:24.056069');
    const expected = 'Nov 9 2019 06:03:24 AM';

    expect(actual).toBe(expected);
  });
});
