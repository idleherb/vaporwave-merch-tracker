import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FilterListIcon from '@material-ui/icons/FilterList';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import fetchMerchItems from './service/service';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  filterArea: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5),
  },
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
  chip: {
    margin: theme.spacing(0.5),
  },
  hidden: {
    display: 'none',
  },
}));

function App() {
  const [initialized, setInitialized] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [merchItems, setMerchItems] = useState([]);
  const [selectAllLabels, setSelectAllLabels] = useState(true);
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
          setMerchItems(allMerchItems);
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

  function handleChangeSelectAll(event) {
    const newSelectAllLabels = event.target.checked;
    setSelectAllLabels(newSelectAllLabels);
    const newSelectedLabels = { ...selectedLabels };
    Object.keys(newSelectedLabels).forEach((label) => {
      newSelectedLabels[label] = newSelectAllLabels;
    });
    setSelectedLabels(newSelectedLabels);
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
        <AppBar position="static">
          <Toolbar>
            <div className={classes.grow} />
            <IconButton aria-label="filter labels" color="inherit" onClick={handleClickFilterButton}>
              <FilterListIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Paper className={`${classes.filterArea} ${showFilter ? '' : classes.hidden}`}>
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch checked={selectAllLabels} onChange={handleChangeSelectAll} value="selectAllLabels" color="primary" />
              }
              label={`Select all (${
                selectFewRemaining
                  ? merchItems.filter((item) => !!item.remaining
                    && selectedMerchTypes[item.merchType]).length
                  : merchItems.filter((item) => selectedMerchTypes[item.merchType]).length
              })`}
            />
            <FormControlLabel
              control={
                <Switch checked={selectFewRemaining} onChange={handleChangeSelectFewRemaining} value="fewRemaining" color="primary" />
              }
              label={`Few remaining (${
                merchItems
                  .filter((item) => !!item.remaining && selectedMerchTypes[item.merchType])
                  .length
              })`}
            />
          </FormGroup>
          {Object
            .keys(selectedMerchTypes)
            .sort((a, b) => a.localeCompare(b))
            .map((merchType) => (
              <Chip
                className={classes.chip}
                color={selectedMerchTypes[merchType] ? 'secondary' : 'default'}
                label={merchType}
                onClick={() => handleChangeSelectMerchType(merchType)}
              />
            ))}
          {Object
            .keys(selectedLabels)
            .sort((a, b) => a.localeCompare(b))
            .map((label) => {
              const count = merchItems.filter((item) => item.label === label
                && (!selectFewRemaining || !!item.remaining)
                && selectedMerchTypes[item.merchType]).length;
              const selected = selectedLabels[label];
              const handleClick = () => {
                setSelectedLabels({
                  ...selectedLabels,
                  [label]: !selectedLabels[label],
                });
              };

              return {
                count, handleClick, label, selected,
              };
            })
            .filter(({ count }) => count > 0)
            .map(({
              count, handleClick, label, selected,
            }) => (
              <Chip
                key={label}
                color={selected ? 'primary' : 'default'}
                label={`${label} (${count})`}
                className={classes.chip}
                onClick={handleClick}
              />
            ))}
        </Paper>
        <Container className={classes.merchItems}>
          <Grid
            container
            justify="center"
            alignItems="center"
          >
            {merchItems
              .filter((item) => selectedLabels[item.label]
                && (!selectFewRemaining || !!item.remaining)
                && selectedMerchTypes[item.merchType])
              .map((item) => {
                const {
                  artist, artworkUrl, label, releaseDate, remaining, title, url,
                } = item;
                return (
                  <a key={url} href={url} className={classes.card} target="_blank" rel="noopener noreferrer">
                    <Card>
                      <CardActionArea className={classes.flex}>
                        <CardMedia
                          className={classes.media}
                          image={artworkUrl}
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
                          <Typography noWrap variant="body2" color="error">
                            {remaining ? `${remaining} remaining` : ''}
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
      </div>
    </>
  ) : <LinearProgress />;
}

export default App;
