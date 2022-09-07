import dateFormat from 'dateformat';

export function formatDate(str) {
  return dateFormat(Date.parse(str), 'mmm d yyyy');
}

export function formatTimestamp(str) {
  return dateFormat(str, 'mmm d yyyy hh:MM:ss TT');
}

export function sortItems(items) {
  return items.sort((item1, item2) => {
    if (item1.remaining && !item2.remaining) {
      return -1;
    }
    if (item2.remaining && !item1.remaining) {
      return 1;
    }
    if (item1.remaining < item2.remaining) {
      return -1;
    }
    if (item2.remaining < item1.remaining) {
      return 1;
    }
    const releaseDate1 = Date.parse(item1.releaseDate);
    const releaseDate2 = Date.parse(item2.releaseDate);
    if (releaseDate1 > releaseDate2) {
      return -1;
    }
    if (releaseDate2 > releaseDate1) {
      return 1;
    }
    if (item1.artist < item2.artist) {
      return -1;
    }
    if (item2.artist < item1.artist) {
      return 1;
    }
    return 0;
  });
}
