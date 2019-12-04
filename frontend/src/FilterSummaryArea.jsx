import React from 'react';
import * as PropTypes from 'prop-types';

import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
  chip: {
    margin: theme.spacing(0.5),
    textAlign: 'justify',
  },
  category: {
    position: 'relative',

  },
  categoryOverlay: {
    '&:after': {
      position: 'absolute',
      right: 0,
      bottom: -theme.spacing(1) - theme.spacing(0.5),
      height: '36px',
      width: '100%',
      background: 'linear-gradient(to right,#ffffff00,#ffffff 90%)',
      content: '""',
    },
  },
}));


export default function FilterSummaryArea({
  selectedLabels,
  selectedMerchTypes,
}) {
  const classes = useStyles();
  const merchTypes = Object
    .keys(selectedMerchTypes)
    .sort((a, b) => a.localeCompare(b))
    .filter((merchType) => !!selectedMerchTypes[merchType])
    .filter((_, i) => i < 5);
  const labels = Object
    .keys(selectedLabels)
    .sort((a, b) => a.localeCompare(b))
    .filter((label) => !!selectedLabels[label])
    .filter((_, i) => i < 5);

  return (
    <Paper className={classes.root}>
      <span className={classes.category}>
        {merchTypes.length === 5 && <span className={classes.categoryOverlay} />}
        {merchTypes.map((merchType) => (
          <Chip
            key={merchType}
            color="secondary"
            label={`${merchType}`}
            className={classes.chip}
          />
        ))}
      </span>
      <span className={classes.category}>
        {labels.length === 5 && <span className={classes.categoryOverlay} />}
        {labels.map((label) => (
          <Chip
            key={label}
            color="primary"
            label={`${label}`}
            className={classes.chip}
          />
        ))}
      </span>
    </Paper>
  );
}

FilterSummaryArea.propTypes = {
  selectedLabels: PropTypes.objectOf(PropTypes.bool).isRequired,
  selectedMerchTypes: PropTypes.objectOf(PropTypes.bool).isRequired,
};
