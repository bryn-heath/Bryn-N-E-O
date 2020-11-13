import React, { useRef } from 'react';
import { Button, makeStyles, TextField } from '@material-ui/core';
import { fetchNeoFeedDateSearch } from './API';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));
export default function ApproachDate() {
  const classes = useStyles();
  const StartDateRef = useRef(null);
  const EndDateRef = useRef(null);

  const retrieveDateSearch = async (startDate, endDate) => {
    const neoFeedData = await fetchNeoFeedDateSearch(startDate, endDate);
    console.log(neoFeedData);
  };

  return (
    <div
      style={{
        padding: 50,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        width: '50vw',
        fontFamily: 'Roboto',
        wordSpacing: 1.4,
        fontSize: 15,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <form className={classes.container} noValidate>
          <TextField
            inputRef={StartDateRef}
            id="StartDate"
            label="Start date"
            type="date"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>
        <div style={{ paddingLeft: 5, paddingRight: 5 }}></div>
        <form className={classes.container} noValidate>
          <TextField
            inputRef={EndDateRef}
            id="EndDate"
            label="End Date"
            type="date"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>
        <div style={{ paddingLeft: 5, paddingRight: 5 }}></div>
        <Button
          aria-controls="search-approach-date-button"
          onClick={() => {
            retrieveDateSearch(
              StartDateRef.current.value,
              EndDateRef.current.value
            );
          }}
          variant="outlined"
          style={{ borderRadius: 50, borderWidth: 3 }}
        >
          {'🔍'}
        </Button>
      </div>
    </div>
  );
}
