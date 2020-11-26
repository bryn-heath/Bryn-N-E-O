import React, { useState, useRef } from 'react';
import { Button, makeStyles, TextField } from '@material-ui/core';

const useStyles = makeStyles({
  spacing: {
    paddingTop: 2,
    paddingBottom: 2,
  },
});

export default function SearchComponent() {
  const [getRecord, setRecord] = useState(null);
  const [getError, setError] = useState('');
  const searchRef = useRef();
  const classes = useStyles();

  const callSearchById = async (id) => {
    try {
      const searchRes = await fetch(
        `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${process.env.REACT_APP_NASA_API}`
      ).then((res) => res.json());
      setRecord(searchRes);
    } catch (e) {
      setError('Cannot find the ID, Please try again');
      console.log(e);
    }
  };

  return (
    <>
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
        {'Look up an asteroid, try 2001620'}
        <div className={classes.spacing}></div>
        <Button
          aria-controls="search-id-button"
          onClick={() => callSearchById(searchRef.current.value)}
          variant="outlined"
          style={{ borderRadius: 50, borderWidth: 3 }}
        >
          {'🔍'}
        </Button>
        <TextField
          style={{ width: 200 }}
          inputRef={searchRef}
          id="passwordInput"
          label="ID"
          type=" text"
        />
        <div style={{ height: '5vh' }}>{''}</div>
        {getError ? (
          <div> {getError ? getError : null}</div>
        ) : (
          <>
            <div className={classes.spacing}>
              {getRecord !== null ? `Name: ${getRecord.name}` : null}{' '}
            </div>

            <div className={classes.spacing}>
              {getRecord !== null
                ? `Last_observation_date: ${getRecord.orbital_data.last_observation_date}`
                : null}
            </div>

            <div className={classes.spacing}>
              {getRecord !== null
                ? `First recorded close approach date: ${getRecord.close_approach_data[0].close_approach_date}`
                : null}
            </div>

            <div className={classes.spacing}>
              {getRecord !== null ? (
                <a
                  href={getRecord.nasa_jpl_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Further information (nasa.gov)
                </a>
              ) : null}
            </div>
          </>
        )}
      </div>
    </>
  );
}
