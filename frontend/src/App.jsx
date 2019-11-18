import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CheckIcon from '@material-ui/icons/Check';
import Chip from '@material-ui/core/Chip';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FilterListIcon from '@material-ui/icons/FilterList';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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
    justifyContent: 'center',
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
  const [selectAll, setSelectAll] = useState(true);
  const [labels, setLabels] = useState({});
  const classes = useStyles();

  useEffect(() => {
    async function initialize() {
      try {
        const newMerchItems = await fetchMerchItems();
        if (newMerchItems) {
          setMerchItems(newMerchItems);
          const labelNames = [...new Set(newMerchItems.map((labelItem) => labelItem.label))];
          const selectedLabels = {};
          labelNames.forEach((labelName) => {
            selectedLabels[labelName] = true;
          });
          setLabels(selectedLabels);
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
    const selectAllNew = event.target.checked;
    setSelectAll(selectAllNew);
    const newLabels = { ...labels };
    Object.keys(labels).forEach((label) => {
      newLabels[label] = selectAllNew;
    });
    setLabels(newLabels);
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
          <FormControlLabel
            control={
              <Switch checked={selectAll} onChange={handleChangeSelectAll} value="selectAll" color="primary" />
            }
            label={`${selectAll ? 'Unselect' : 'Select'} all`}
          />
          {Object
            .keys(labels)
            .sort((a, b) => a.localeCompare(b))
            .map((label) => {
              const count = merchItems.filter((item) => item.label === label).length;
              const selected = labels[label];
              const handleClick = () => {
                setLabels({
                  ...labels,
                  [label]: !labels[label],
                });
              };

              return (
                <Chip
                  key={label}
                  icon={selected && <CheckIcon />}
                  label={`${label} (${count})`}
                  className={classes.chip}
                  onClick={handleClick}
                />
              );
            })}
        </Paper>
        <Container className={classes.merchItems}>
          <Grid
            container
            justify="center"
            alignItems="center"
          >
            {merchItems
              .filter((item) => labels[item.label])
              .map((item) => {
                const {
                  artist, artworkUrl, label, releaseDate, remainingCassettes, title, url,
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
                            {remainingCassettes ? `${remainingCassettes} remaining` : ''}
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
