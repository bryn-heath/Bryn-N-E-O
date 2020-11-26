import { makeStyles, Divider } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import MenuDrop from './MenuDrop';
import { AsteroidList } from './AsteroidList';
import { useAuth } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';
import UserFavsComponent from './UserFavsComponent';
import ImageOfTheDay from './ImageOfTheDay';
import SearchComponent from './SearchComponent';
import ApproachDate from './ApproachDate';
import { db } from './../firebase';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default function Dashboard() {
  const classes = useStyles();
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [useImgUrl, setImgUrl] = useState('');
  const [getPage, setPage] = useState(0);
  const [getFavArr, setFavArr] = useState();

  const handleLogout = async () => {
    await logout();
    history.push('./login');
  };

  const ImgUrlFetch = async () => {
    return await fetch(
      'https://api.nasa.gov/planetary/apod?api_key=wq6CVTNwrDLBATNEc8oDjfcq4baCXxIlJoLPNJGe'
    ).then((res) => res.json());
  };

  useEffect(() => {
    ImgUrlFetch().then((data) => setImgUrl(data));

    const fetchFirebaseFavList = async () => {
      const favRef = db.collection('fav').doc(currentUser.uid);
      const getAllDoc = await favRef.get();
      if (!getAllDoc.exists) {
        console.log('No such document!');
      } else {
        const rockResults = await getAllDoc.data()['rocks'];
        setFavArr(rockResults);
      }
    };

    fetchFirebaseFavList();
  }, [currentUser.uid]);

  return (
    <div className={classes.container}>
      <div>
        <MenuDrop handleLogout={handleLogout} setPage={setPage} />
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
          width: '100%',
          height: window.innerHeight - 55,
        }}
      >
        <AsteroidList />

        <Divider orientation="vertical" flexItem />
        <Divider orientation="vertical" flexItem />
        <Divider orientation="vertical" flexItem />

        {getPage === 0 ? <ImageOfTheDay useImgUrl={useImgUrl} /> : null}
        {getPage === 1 ? <SearchComponent /> : null}
        {getPage === 2 ? <UserFavsComponent getFavArr={getFavArr} /> : null}
        {getPage === 3 ? <ApproachDate /> : null}
      </div>
    </div>
  );
}
