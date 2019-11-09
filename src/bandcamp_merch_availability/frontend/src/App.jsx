import React, { useEffect, useState } from 'react';
import './App.css';
import fetchMerchItems from './service/service';

function App() {
  const [initialized, setInitialized] = useState(false);
  const [merchItems, setMerchItems] = useState([]);

  useEffect(() => {
    async function initialize() {
      try {
        const newMerchItems = await fetchMerchItems();
        if (newMerchItems) {
          setMerchItems(newMerchItems);
        }
      } catch (error) {
        /* eslint-disable no-console */
        console.error(error);
      } finally {
        setInitialized(true);
      }
    }
    initialize();
  }, []);

  const loading = <div />;
  return initialized ? <pre>{JSON.stringify(merchItems, null, 2)}</pre> : loading;
}

export default App;
