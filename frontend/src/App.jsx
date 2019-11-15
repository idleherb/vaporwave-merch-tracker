import React, { useEffect, useState } from 'react';
import styles from './App.module.scss';
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
          const selectedLabels = {};
          labelNames.forEach((labelName) => {
            selectedLabels[labelName] = true;
          });
          setLabels(selectedLabels);
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

  const loading = <></>;
  return initialized ? (
    <div className={styles.app}>
      <Labels labels={
        Object
          .keys(labels)
          .sort((a, b) => a.localeCompare(b))
          .map((label) => ({
            count: merchItems.filter((item) => item.label === label).length,
            name: label,
            selected: labels[label],
            afterChange: () => {
              setLabels({
                ...labels,
                [label]: !labels[label],
              });
            },
          }))
      }
      />
      <MerchItems items={merchItems.filter((item) => labels[item.label])} />
    </div>
  ) : loading;
}

export default App;
