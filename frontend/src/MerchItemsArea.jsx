import React from 'react';
import * as PropTypes from 'prop-types';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import MerchItem from './MerchItem';


const useStyles = makeStyles((theme) => ({
  card: {
    textDecoration: 'none',
    margin: theme.spacing(1),
  },
  flex: {
    display: 'flex',
    width: 350,
  },
  content: {
    paddingTop: 0,
    paddingBottom: 0,
    width: 182,
  },
  merchItems: {
    maxWidth: 1200,
  },
  media: {
    width: 168,
    height: 126,
  },
}));


export default function MerchItemsArea({
  merchItems,
  selectedLabels,
  selectedMerchTypes,
  selectFewRemaining,
}) {
  const classes = useStyles();

  return (
    <Container className={classes.merchItems}>
      <Grid
        container
        justify="center"
        alignItems="center"
      >
        {merchItems
          .filter(({ label, merchType, remaining }) => selectedLabels[label]
              && (!selectFewRemaining || (remaining && remaining < 10))
              && !!selectedMerchTypes[merchType])
          .map(({
            artist, currency, editionOf, id, imageId, label, price, releaseDate, remaining, title, url,
          }) => (
            <MerchItem
              key={id}
              artist={artist}
              currency={currency}
              editionOf={editionOf}
              imageId={imageId}
              label={label}
              price={price}
              releaseDate={releaseDate}
              remaining={remaining}
              title={title}
              url={url}
            />
          ))}
      </Grid>
    </Container>
  );
}

MerchItemsArea.propTypes = {
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
  selectedLabels: PropTypes.objectOf(PropTypes.bool).isRequired,
  selectedMerchTypes: PropTypes.objectOf(PropTypes.bool).isRequired,
  selectFewRemaining: PropTypes.bool.isRequired,
};
