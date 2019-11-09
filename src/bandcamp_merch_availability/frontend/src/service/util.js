import dateFormat from 'dateformat';

export function formatDate(str) {
  return dateFormat(normalizeDateStr(str), 'mmm d yyyy');
}

function normalizeDateStr(str) {
  return Date.parse(`${str.substring(0, 4)}-${str.substring(4, 6)}-${str.substring(6, 8)}`);
}

export function formatTimestamp(str) {
  return dateFormat(str, 'mmm d yyyy hh:MM:ss TT');
}

export function sortItems(items) {
  return items.sort((item1, item2) => {
    if (item1.remainingCassettes && !item2.remainingCassettes) {
      return -1;
    }
    if (item2.remainingCassettes && !item1.remainingCassettes) {
      return 1;
    }
    if (item1.remainingCassettes < item2.remainingCassettes) {
      return -1; 
    }
    if (item2.remainingCassettes < item1.remainingCassettes) {
      return 1; 
    }
    if (item1.releaseDate > item2.releaseDate) {
      return -1;
    }
    if (item2.releaseDate > item1.releaseDate) {
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
