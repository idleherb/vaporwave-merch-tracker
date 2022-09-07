import React, { useState } from 'react';

import AppBar from '@material-ui/core/AppBar';
import FilterListIcon from '@material-ui/icons/FilterList';
import IconButton from '@material-ui/core/IconButton';
import SearchBar from 'material-ui-search-bar';
import Toolbar from '@material-ui/core/Toolbar';

import { makeStyles } from '@material-ui/core/styles';

import * as PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  grow: {
    flexGrow: 1,
  },
}));

export default function ToolBar({ onClickFilter, onRequestSearch }) {
  const classes = useStyles();

  const [searchInput, setSearchInput] = useState('');

  return (
    <AppBar position="static">
      <Toolbar>
        <SearchBar
          className={classes.grow}
          placeholder="Search by artist or title"
          value={searchInput}
          onChange={(newValue) => setSearchInput(newValue)}
          onRequestSearch={() => onRequestSearch(searchInput.toLowerCase())}
        />
        <IconButton aria-label="filter labels" color="inherit" onClick={onClickFilter}>
          <FilterListIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

ToolBar.propTypes = {
  onClickFilter: PropTypes.func.isRequired,
  onRequestSearch: PropTypes.func.isRequired,
};
