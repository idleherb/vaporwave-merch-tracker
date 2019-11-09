import axios from 'axios';

export default async function fetchMerchItems() {
  const response = await axios.get('/bandcamp_merch.json');

  return response.data;
}
