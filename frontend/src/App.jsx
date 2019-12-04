import React, { useEffect, useState } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import LinearProgress from '@material-ui/core/LinearProgress';

import { makeStyles } from '@material-ui/core/styles';

import FilterArea from './FilterArea';
import MerchItemsArea from './MerchItemsArea';
import ToolBar from './ToolBar';

import fetchMerchItems from './service/service';


const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

function App() {
  const [initialized, setInitialized] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [merchItems, setMerchItems] = useState([]);
  const [selectAllLabels, setSelectAllLabels] = useState(true);
  const [selectAllMerchTypes, setSelectAllMerchTypes] = useState(true);
  const [selectFewRemaining, setSelectFewRemaining] = useState(false);
  const [selectedMerchTypes, setSelectedMerchTypes] = useState({});
  const [selectedLabels, setSelectedLabels] = useState({});
  const classes = useStyles();

  useEffect(() => {
    async function initialize() {
      try {
        const allMerchItems = await fetchMerchItems();
        if (allMerchItems) {
          const allSelectedLabels = {};
          const allSelectedMerchTypes = {};
          allMerchItems.forEach(({ label, merchType }) => {
            allSelectedLabels[label] = true;
            allSelectedMerchTypes[merchType] = true;
          });
          const merchItemIds = new Set();
          const uniqueMerchItems = allMerchItems.filter((item) => {
            if (!merchItemIds.has(item.id)) {
              merchItemIds.add(item.id);
              return true;
            }
            return false;
          });
          setMerchItems(uniqueMerchItems);
          setSelectedLabels(allSelectedLabels);
          setSelectedMerchTypes(allSelectedMerchTypes);
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

  function handleClickFilterButton() {
    setShowFilter(!showFilter);
  }

  function handleChangeSelectAllLabels(event) {
    const newSelectAllLabels = event.target.checked;
    setSelectAllLabels(newSelectAllLabels);
    const newSelectedLabels = { ...selectedLabels };
    Object.keys(newSelectedLabels)
      .forEach((label) => {
        newSelectedLabels[label] = newSelectAllLabels;
      });
    setSelectedLabels(newSelectedLabels);
  }

  function handleChangeSelectAllMerchTypes(event) {
    const newSelectAllMerchTypes = event.target.checked;
    setSelectAllMerchTypes(newSelectAllMerchTypes);
    const newSelectedMerchTypes = { ...selectedMerchTypes };
    Object.keys(newSelectedMerchTypes)
      .forEach((merchType) => {
        newSelectedMerchTypes[merchType] = newSelectAllMerchTypes;
      });
    setSelectedMerchTypes(newSelectedMerchTypes);
  }

  function handleChangeSelectLabel(label) {
    setSelectedLabels({
      ...selectedLabels,
      [label]: !selectedLabels[label],
    });
  }

  function handleChangeSelectMerchType(merchType) {
    setSelectedMerchTypes({
      ...selectedMerchTypes,
      [merchType]: !selectedMerchTypes[merchType],
    });
  }

  function handleChangeSelectFewRemaining(event) {
    const newSelectFewRemaining = event.target.checked;
    setSelectFewRemaining(newSelectFewRemaining);
  }

  return initialized ? (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <ToolBar onClickFilter={handleClickFilterButton} />
        {showFilter && (
          <FilterArea
            merchItems={merchItems}
            onChangeSelectAllLabels={handleChangeSelectAllLabels}
            onChangeSelectAllMerchTypes={handleChangeSelectAllMerchTypes}
            onChangeSelectFewRemaining={handleChangeSelectFewRemaining}
            onChangeSelectLabel={handleChangeSelectLabel}
            onChangeSelectMerchType={handleChangeSelectMerchType}
            selectAllLabels={selectAllLabels}
            selectAllMerchTypes={selectAllMerchTypes}
            selectedLabels={selectedLabels}
            selectedMerchTypes={selectedMerchTypes}
            selectFewRemaining={selectFewRemaining}
          />
        )}
        <MerchItemsArea
          merchItems={merchItems}
          selectedLabels={selectedLabels}
          selectedMerchTypes={selectedMerchTypes}
          selectFewRemaining={selectFewRemaining}
        />
      </div>
    </>
  ) : <LinearProgress />;
}

export default App;
