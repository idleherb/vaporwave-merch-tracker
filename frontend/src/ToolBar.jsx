import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import FilterListIcon from '@material-ui/icons/FilterList';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';

import { makeStyles } from '@material-ui/core/styles';

import * as PropTypes from 'prop-types';


const useStyles = makeStyles(() => ({
  grow: {
    flexGrow: 1,
  },
}));


export default function ToolBar({ onClickFilter }) {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <div className={classes.grow} />
        <IconButton aria-label="filter labels" color="inherit" onClick={onClickFilter}>
          <FilterListIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

ToolBar.propTypes = {
  onClickFilter: PropTypes.func.isRequired,
};
