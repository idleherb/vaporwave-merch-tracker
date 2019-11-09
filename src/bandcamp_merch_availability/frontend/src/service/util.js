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
