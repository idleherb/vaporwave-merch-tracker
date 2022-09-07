import React from 'react';
import * as PropTypes from 'prop-types';

import Chip from '@material-ui/core/Chip';
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  filterArea: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: theme.spacing(1),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  close: {
    marginRight: theme.spacing(1),
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  switch: {
    paddingLeft: theme.spacing(0.5),
  },
  switchRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

export default function FilterArea({
  merchItems,
  onClickClose,
  onChangeSelectAllLabels,
  onChangeSelectAllMerchTypes,
  onChangeSelectFewRemaining,
  onChangeSelectLabel,
  onChangeSelectMerchType,
  selectAllLabels,
  selectAllMerchTypes,
  selectedLabels,
  selectedMerchTypes,
  selectFewRemaining,
}) {
  const classes = useStyles();

  return (
    <Paper className={`${classes.filterArea}`}>
      <Box display="flex" justfiyContent="space-between" width="100%">
        <FormControlLabel
          className={classes.switch}
          control={(
            <Switch
              checked={selectAllMerchTypes}
              onChange={onChangeSelectAllMerchTypes}
              value="selectAllMerchTypes"
              color="secondary"
            />
          )}
          label="All merch types"
        />
        <div className={classes.grow} />
        <IconButton aria-label="close filters" className={classes.close} onClick={onClickClose}>
          <CloseIcon fontSize="medium" />
        </IconButton>
      </Box>
      {Object
        .keys(selectedMerchTypes)
        .sort((a, b) => a.localeCompare(b))
        .map((merchType) => {
          const count = merchItems
            .filter((item) => item.merchType === merchType
              && (!selectFewRemaining || (item.remaining && item.remaining < 10)))
            .length;
          return {
            merchType,
            count,
          };
        })
        .filter(({ count }) => count > 0)
        .map(({ merchType, count }) => (
          <Chip
            key={`merchType.${merchType}`}
            className={classes.chip}
            color={selectedMerchTypes[merchType] ? 'secondary' : 'default'}
            label={`${merchType} (${count})`}
            onClick={() => onChangeSelectMerchType(merchType)}
          />
        ))}
      <Divider className={classes.divider} />
      <div>
        <div className={classes.switchRow}>
          <FormControlLabel
            className={classes.switch}
            control={(
              <Switch
                checked={selectAllLabels}
                onChange={onChangeSelectAllLabels}
                value="selectAllLabels"
                color="primary"
              />
            )}
            label={`All labels (${
              selectFewRemaining
                ? merchItems.filter((item) => (item.remaining && item.remaining < 10)
                && !!selectedMerchTypes[item.merchType]).length
                : merchItems.filter((item) => !!selectedMerchTypes[item.merchType]).length
            })`}
          />
        </div>
        <div className={classes.switchRow}>
          <FormControlLabel
            className={classes.switch}
            control={(
              <Switch
                checked={selectFewRemaining}
                onChange={onChangeSelectFewRemaining}
                value="fewRemaining"
                color="primary"
              />
            )}
            label={`Few remaining (${
              merchItems
                .filter((item) => (item.remaining && item.remaining < 10)
                  && !!selectedMerchTypes[item.merchType])
                .length
            })`}
          />
        </div>
        {Object
          .keys(selectedLabels)
          .sort((a, b) => a.localeCompare(b))
          .map((label) => {
            const count = merchItems.filter((item) => item.label === label
              && (!selectFewRemaining || (item.remaining && item.remaining < 10))
              && !!selectedMerchTypes[item.merchType]).length;
            const selected = selectedLabels[label];

            return {
              count,
              label,
              selected,
            };
          })
          .filter(({ count }) => count > 0)
          .map(({
            count, label, selected,
          }) => (
            <Chip
              key={label}
              color={selected ? 'primary' : 'default'}
              label={`${label} (${count})`}
              className={classes.chip}
              onClick={() => onChangeSelectLabel(label)}
            />
          ))}
      </div>
    </Paper>
  );
}

FilterArea.propTypes = {
  merchItems: PropTypes.arrayOf(
    PropTypes.shape({
      artist: PropTypes.string,
      currency: PropTypes.string.isRequired,
      editionOf: PropTypes.number,
      id: PropTypes.number.isRequired,
      imageId: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      merchType: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      releaseDate: PropTypes.string.isRequired,
      remaining: PropTypes.number,
      timestamp: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onClickClose: PropTypes.func.isRequired,
  onChangeSelectAllLabels: PropTypes.func.isRequired,
  onChangeSelectAllMerchTypes: PropTypes.func.isRequired,
  onChangeSelectFewRemaining: PropTypes.func.isRequired,
  onChangeSelectLabel: PropTypes.func.isRequired,
  onChangeSelectMerchType: PropTypes.func.isRequired,
  selectAllLabels: PropTypes.bool.isRequired,
  selectAllMerchTypes: PropTypes.bool.isRequired,
  selectedLabels: PropTypes.objectOf(PropTypes.bool).isRequired,
  selectedMerchTypes: PropTypes.objectOf(PropTypes.bool).isRequired,
  selectFewRemaining: PropTypes.bool.isRequired,
};
