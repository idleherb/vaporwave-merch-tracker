import React from 'react';
import * as PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  merchItem: {
    textDecoration: 'none',
  },
  card: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
  },
  price: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(0.5),
  },
  flex: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    paddingTop: 0,
    paddingRight: 16,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 230,
  },
  overline: {
    lineHeight: 1,
    width: 230,
  },
  attribute: {
    marginBottom: theme.spacing(0.4),
  },
  media: {
    width: 80,
    height: 80,
    marginBottom: theme.spacing(0.4),
  },
}));


export default function MerchItem({
  artist,
  currency,
  editionOf,
  imageId,
  label,
  price,
  releaseDate,
  remaining,
  title,
  url,
}) {
  const classes = useStyles();

  return (
    <a className={classes.merchItem} href={url} target="_blank" rel="noopener noreferrer">
      <Card className={classes.card}>
        <CardActionArea className={classes.flex}>
          <CardContent className={classes.content}>
            <Typography noWrap variant="overline" className={classes.overline} component="div" paragraph  color="textSecondary">
              {label !== artist ? label : ' '}
            </Typography>
            <Typography noWrap variant="h6" gutterBottom>
              {title}
            </Typography>
            <Typography noWrap variant="body2" className={classes.attribute}>
              {artist}
            </Typography>
            <Typography noWrap variant="body2" color={remaining && remaining <= 10 ? 'error' : 'primary'}  className={classes.attribute}>
              {remaining ? `${remaining}${editionOf ? ` of ${editionOf}` : ''} remaining` : ''}
            </Typography>
            <Typography noWrap variant="body2" color="textSecondary">
              {releaseDate}
            </Typography>
          </CardContent>
          <div className={classes.flexCol}>
            <CardMedia
              className={classes.media}
              image={`https://f4.bcbits.com/img/${imageId}_3.jpg`}
              title={title}
            />
            <Typography noWrap variant="subtitle2" className={classes.price} color="textSecondary">
              {`${price.toFixed(2)} ${currency}`}
            </Typography>
          </div>
        </CardActionArea>
      </Card>
    </a>
  );
}

MerchItem.propTypes = {
  artist: PropTypes.string,
  currency: PropTypes.string.isRequired,
  editionOf: PropTypes.number,
  imageId: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  releaseDate: PropTypes.string.isRequired,
  remaining: PropTypes.number,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

MerchItem.defaultProps = {
  artist: null,
  editionOf: null,
  remaining: null,
};
