import React, { useEffect, useState } from 'react';
import './App.css';
import fetchMerchItems from './service';

function App() {
  const [initialized, setInitialized] = useState(false);
  const [merchItems, setMerchItems] = useState([]);

  useEffect(() => {
    async function initialize() {
      try {
        const merchItems = await fetchMerchItems();
        if (merchItems) {
          setMerchItems(merchItems);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setInitialized(true);
      }
    }
    initialize();
  }, []);
  
  const loading = <div />;
  return initialized ? <div>Hello, World!</div> : loading;
}

export default App;
