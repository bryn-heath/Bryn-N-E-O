import React, { useRef, useState } from 'react';
import { Button, makeStyles, TextField } from '@material-ui/core';
import { fetchNeoFeedDateSearch } from './API';
import { convertEpochDate } from '../helpers';
import { Divider } from '@material-ui/core';

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
  const [getNEOList, setNEOList] = useState([]);
  const classes = useStyles();
  const StartDateRef = useRef(null);
  const EndDateRef = useRef(null);

  const retrieveDateSearch = async (startDate, endDate) => {
    const neoFeedData = await fetchNeoFeedDateSearch(startDate, endDate);
    setNEOList(neoFeedData);
  };

  return (
    <div
      style={{
        padding: 50,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        width: '50%',
        fontFamily: 'Roboto',
        wordSpacing: 1.4,
        fontSize: 15,
      }}
    >
      <div style={{ fontWeight: 'bold' }}>
        {
          'Top 10 NEO sorted by date (Max 7 days after the start date) Default date is set to the current date'
        }
      </div>

      <div style={{ width: '100%', paddingTop: 5, paddingBottom: 15 }}>
        <Divider />
        <Divider />
        <Divider />
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
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

        <div style={{ paddingLeft: 5, paddingRight: 5 }}>
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
        </div>

        <div style={{ paddingLeft: 5, paddingRight: 5 }}>
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

      <div style={{ paddingBottom: 15 }}></div>
      <>
        {getNEOList !== 'Error wrong dates' ? (
          getNEOList.map((ea) => (
            <div
              style={{
                paddingBottom: 5,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              key={ea.id}
            >
              {'Name: ' + ea.name}
              <li style={{ listStyle: 'none', paddingLeft: 10 }}>
                {'Close approach date: ' +
                  convertEpochDate(
                    ea.close_approach_data[0].epoch_date_close_approach
                  )}
              </li>
              <li
                style={{ listStyle: 'none', paddingLeft: 10 }}
              >{`Traveling at ${
                ea.close_approach_data[0].relative_velocity.miles_per_hour.split(
                  '.'
                )[0]
              } MPH`}</li>
            </div>
          ))
        ) : (
          <>
            {
              'Please try again - (The end date has to be a maximum of 7 days after the start date) - The default dates are set to the current date'
            }
          </>
        )}
      </>
    </div>
  );
}
