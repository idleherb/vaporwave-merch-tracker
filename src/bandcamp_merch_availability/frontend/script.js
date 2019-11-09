'use strict';

document.addEventListener('DOMContentLoaded', async () => {
  await fetchContent();
});

async function fetchContent() {
  const res = await fetch('/bandcamp_merch.json', { method: 'GET' });
  const data = await res.json();
  document.getElementById('root').innerHTML = JSON.stringify(data, null, 2);
}
