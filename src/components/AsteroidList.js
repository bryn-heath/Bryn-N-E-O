import React, { useEffect, useState } from 'react';
import { Divider } from '@material-ui/core';
import FavComponent from './FavComponent';
import { db } from './../firebase';
import { useAuth } from '../context/AuthContext';

export default function AsteroidList() {
  const [asteroidList, setAsteroidList] = useState(null);
  const { currentUser } = useAuth();

  const callListNeo = async (date) => {
    try {
      return await fetch(
        `https://api.nasa.gov/neo/rest/v1/neo/browse?&api_key=wq6CVTNwrDLBATNEc8oDjfcq4baCXxIlJoLPNJGe`
      ).then((res) => res.json());
    } catch (e) {
      console.log(e);
    }
  };

  // const callAllDataNeo = async (date) => {
  //   try {
  //     return await fetch(
  //       `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=wq6CVTNwrDLBATNEc8oDjfcq4baCXxIlJoLPNJGe`
  //     ).then((res) => res.json());
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  useEffect(() => {
    const d = new Date();
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(d);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    const fullDate = `${ye}-${mo}-${da}`;
    callListNeo(fullDate).then((data) =>
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
}

// `https://api.nasa.gov/neo/rest/v1/feed?limit=10&start_date=${date}&api_key=wq6CVTNwrDLBATNEc8oDjfcq4baCXxIlJoLPNJGe`
