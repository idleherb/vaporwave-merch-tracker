import React, { useEffect, useState } from 'react';
import './App.css';
import MerchItems from './MerchItems/MerchItems';
import fetchMerchItems from './service/service';
import Labels from './Labels/Labels';

function App() {
  const [initialized, setInitialized] = useState(false);
  const [merchItems, setMerchItems] = useState([]);
  const [labels, setLabels] = useState({});

  useEffect(() => {
    async function initialize() {
      try {
        const newMerchItems = await fetchMerchItems();
        if (newMerchItems) {
          setMerchItems(newMerchItems);
          const labelNames = [...new Set(newMerchItems.map((labelItem) => labelItem.label))];
          const labels = {};
          labelNames.forEach((labelName) => {
            labels[labelName] = true;
          });
          console.log(labels)
          setLabels(labels);
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
  return initialized ? (
    <div>
      <Labels labels={
        Object
          .keys(labels)
          .sort((a, b) => a.localeCompare(b))
          .map(label => {
            return {
              name: label,
              selected: labels[label],
              cb: () => {
                setLabels({
                  ...labels,
                  [label]: !labels[label],
                });
              },
            };
          })} />
      <MerchItems items={merchItems.filter((item) => labels[item.label])} />
    </div>
  ) : loading;
}

export default App;
