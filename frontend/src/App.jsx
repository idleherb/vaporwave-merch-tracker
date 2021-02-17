import React, { useEffect, useState } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import LinearProgress from '@material-ui/core/LinearProgress';

import { makeStyles } from '@material-ui/core/styles';

import FilterArea from './FilterArea';
import FilterSummaryArea from './FilterSummaryArea';
import MerchItemsArea from './MerchItemsArea';
import ToolBar from './ToolBar';

import fetchMerchItems from './service/service';


const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  noStyle: {
    cursor: 'pointer',
    minHeight: 0,
    minWidth: 0,
    textAlign: 'left',
    margin: 0,
    padding: 0,
    border: 'none',
    width: '100%',
    backgroundColor: 'transparent',
    '&:focus': {
      outline: 'none',
    },
  },
}));

function App() {
  const [initialized, setInitialized] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [merchItems, setMerchItems] = useState([]);
  const [searchText, setSearchText] = useState('');
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
          const uniqueMerchItems = allMerchItems
            .filter((item) => {
              if (!merchItemIds.has(item.id)) {
                merchItemIds.add(item.id);
                return true;
              }
              return false;
            })
            .map((item) => {
              const normalizedArtist = item.artist ? item.artist.normalize('NFD').toLowerCase() : '';
              const normalizedTitle = item.title ? item.title.normalize('NFD').toLowerCase() : '';
              return {
                ...item,
                normalizedArtist,
                normalizedTitle,
              };
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

  function handleRequestSearch(searchText_) {
    setSearchText(searchText_);
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
        <ToolBar onClickFilter={handleClickFilterButton} onRequestSearch={handleRequestSearch} />
        {showFilter ? (
          <FilterArea
            merchItems={merchItems}
            onClickClose={() => setShowFilter(false)}
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
        ) : (
          <button className={classes.noStyle} type="button" onClick={() => setShowFilter(true)}>
            <FilterSummaryArea
              selectedLabels={selectedLabels}
              selectedMerchTypes={selectedMerchTypes}
            />
          </button>
        )}
        <MerchItemsArea
          merchItems={merchItems}
          selectedLabels={selectedLabels}
          selectedMerchTypes={selectedMerchTypes}
          selectFewRemaining={selectFewRemaining}
          searchText={searchText}
        />
      </div>
    </>
  ) : <LinearProgress />;
}

export default App;
