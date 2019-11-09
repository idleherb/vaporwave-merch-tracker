import axios from 'axios';

import { formatDate, formatTimestamp } from './util';

export default async function fetchMerchItems() {
  const response = await axios.get('/bandcamp_merch.json');

  return response.data.map((item) => ({
    ...item,
    releaseDate: formatDate(item.releaseDate),
    timestamp: formatTimestamp(item.timestamp),
  }));
}
