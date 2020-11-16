import React, { useState, useEffect } from 'react';
import { Divider } from '@material-ui/core';
import { useAuth } from '../context/AuthContext';
import FavComponent from './FavComponent';
import { singleCallSearchById } from './API';

export default function UserFavsComponent({ getFavArr }) {
  const [asteroidList, setAsteroidList] = useState(null);
  const [useFlag, setLoadingFlag] = useState(true);
  const [useArray, setArray] = useState([]);
  let favArr = [];

  useEffect(() => {
    getFavArr.map((ea) => callApiMapIds(ea));
  }, []);

  const callApiMapIds = async (ea) => {
    let singleRec = await singleCallSearchById(ea);

    let dataNeeded = {
      id: singleRec.id,
      name: singleRec.name,
      is_potentially_hazardous_asteroid:
        singleRec.is_potentially_hazardous_asteroid,
      max: singleRec.estimated_diameter.meters.estimated_diameter_max,
      min: singleRec.estimated_diameter.meters.estimated_diameter_min,
    };

    favArr.push(dataNeeded);
    if (favArr.length === getFavArr.length) {
      setArray(favArr);
    }
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
      <div style={{ fontWeight: 'bold' }}>
        {' ☄️'}
        {' FAVOURITES '}
        {' ☄️'}
      </div>
      <div style={{ width: '100%', paddingTop: 4 }}>
        <Divider />
        <Divider />
        <Divider />
      </div>

      {useArray.map((ea) => {
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
            {`${(ea.max - ea.min).toFixed(2)}m`}
          </div>
        );
      })}
    </div>
  );
}
