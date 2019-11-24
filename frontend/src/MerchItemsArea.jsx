import React from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import * as PropTypes from 'prop-types';


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
          .filter((item) => selectedLabels[item.label]
            && (!selectFewRemaining || (item.remaining && item.remaining < 10))
            && !!selectedMerchTypes[item.merchType])
          .map((item) => {
            const {
              artist, editionOf, id, imageId, label, releaseDate, remaining, title, url,
            } = item;
            return (
              <a key={`${id}`} href={url} className={classes.card} target="_blank" rel="noopener noreferrer">
                <Card>
                  <CardActionArea className={classes.flex}>
                    <CardMedia
                      className={classes.media}
                      image={`https://f4.bcbits.com/img/${imageId}_37.jpg`}
                      title={title}
                    />
                    <CardContent className={classes.content}>
                      <Typography noWrap variant="body2">
                        {label !== artist ? label : ' '}
                      </Typography>
                      <Typography noWrap variant="subtitle2">
                        {artist}
                      </Typography>
                      <Typography noWrap variant="body2" gutterBottom>
                        {title}
                      </Typography>
                      <Typography noWrap variant="body2" color={remaining && remaining <= 10 ? 'error' : 'primary'}>
                        {remaining ? `${remaining}${editionOf ? ` of ${editionOf}` : ''} remaining` : ''}
                      </Typography>
                      <Typography noWrap variant="body2" color="textSecondary">
                        {releaseDate}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </a>
            );
          })}
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
  selectedLabels: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.boolean),
  ).isRequired,
  selectedMerchTypes: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.boolean),
  ).isRequired,
  selectFewRemaining: PropTypes.bool.isRequired,
};
