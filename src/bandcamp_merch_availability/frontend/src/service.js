import axios from 'axios';

export default async function fetchMerchItems() {
  return axios.get('/bandcamp_merch.json');
}
