import React, { useEffect, useState } from 'react';
import { Divider } from '@material-ui/core';
import FavComponent from './FavComponent';
// import { db } from './../firebase';
// import { useAuth } from '../context/AuthContext';

export const AsteroidList = React.memo(() => {
  const [asteroidList, setAsteroidList] = useState(null);

  const callListNeo = async () => {
    try {
      return await fetch(
        `https://api.nasa.gov/neo/rest/v1/neo/browse?&api_key=${process.env.REACT_APP_NASA_API}`
      ).then((res) => res.json());
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    callListNeo().then((data) =>
      setAsteroidList(
        data.near_earth_objects.sort(() => 0.5 - Math.random()).slice(0, -10)
      )
    );
  }, []);

  return (
    <div
      style={{
        fontSize: 15,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'Roboto',
        width: '50vw',
        padding: 50,
      }}
    >
      <div style={{ fontWeight: 'bold' }}>
        {' NAME '}
        {' ☄️'}
        {' HAZARDOUS ??? '}
        {' 📏'}
        {' ESTIMATED DIAMETER '}
      </div>
      <div style={{ width: '100%', paddingTop: 4 }}>
        <Divider />
        <Divider />
        <Divider />
      </div>
      {asteroidList
        ? asteroidList.map((ea) => {
            return (
              <div
                key={ea.id}
                style={{
                  fontStyle: ea.is_potentially_hazardous_asteroid
                    ? 'italic'
                    : 'none',
                }}
              >
                <FavComponent rockID={ea.id} />
                {ea.name}
                {' ☄️ '}
                {ea.is_potentially_hazardous_asteroid
                  ? 'potentially hazardous'
                  : 'potentially fine'}
                {' 📏 '}
                {`${(
                  ea.estimated_diameter.meters.estimated_diameter_max -
                  ea.estimated_diameter.meters.estimated_diameter_min
                ).toFixed(2)}m`}
              </div>
            );
          })
        : null}
    </div>
  );
});

// `https://api.nasa.gov/neo/rest/v1/feed?limit=10&start_date=${date}&api_key=wq6CVTNwrDLBATNEc8oDjfcq4baCXxIlJoLPNJGe`
