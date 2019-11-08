'use strict';

async function fetchContent() {
  const res = await fetch('/bandcamp_merch.json', { method: 'GET' });
  const data = await res.json();
  document.getElementById('root').value = JSON.stringify(data, null, 2);
}

document.addEventListener('DOMContentLoaded', async () => {
  const form = document.getElementById('configuration');
  if (form.attachEvent) {
    form.attachEvent('submit', onSubmit);
  } else {
    form.addEventListener('submit', onSubmit);
  }
  await fetchContent();
});
