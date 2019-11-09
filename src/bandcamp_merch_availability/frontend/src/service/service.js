import axios from 'axios';

import { formatDate, formatTimestamp, sortItems } from './util';

export default async function fetchMerchItems() {
  const response = await axios.get('/bandcamp_merch.json');
  const sortedItems = sortItems(response.data);
  
  return sortedItems.map((item) => ({
    ...item,
    releaseDate: formatDate(item.releaseDate),
    timestamp: formatTimestamp(item.timestamp),
  }));
}
