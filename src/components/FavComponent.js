import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { db } from './../firebase';
import firebase from 'firebase';

export default function FavComponent({ rockID }) {
  const [fav, setAsteroidFavs] = useState(false);
  const { currentUser } = useAuth();
  const [state, setState] = useState(rockID);
  const [getFavArr, setFavArr] = useState();
  const [useFlag, setFlag] = useState(false);
  const [favBool, setFavBool] = useState(false);

  useEffect(() => {
    checkIfFavorite();
  }, []);

  useEffect(() => {
    setFavBoolFunc();
  }, [useFlag]);

  const checkIfFavorite = async () => {
    const favRef = await db.collection('fav').doc(currentUser.uid);
    const getAllDoc = await favRef.get();
    if (!getAllDoc.exists) {
      console.log('No such document!');
    } else {
      const rockResults = await getAllDoc.data()['rocks'];
      setFavArr(rockResults);
    }
    setFlag(true);
  };

  const setFavBoolFunc = async () => {
    if (getFavArr !== undefined) {
      let trueOrFalse = await getFavArr.find((el) => el === rockID);
      if (trueOrFalse !== undefined) {
        setFavBool(true);
      }
    }
    return;
  };

  const setCollectionFav = async () => {
    if (favBool === false) {
      const favRes = await db
        .collection('fav')
        .doc(currentUser.uid)
        .update({
          rocks: firebase.firestore.FieldValue.arrayUnion(rockID),
        });
      setFavBool(true);
    } else {
      const favArrRes = await db
        .collection('fav')
        .doc(currentUser.uid)
        .update({
          rocks: firebase.firestore.FieldValue.arrayRemove(rockID),
        });
      setFavBool(false);
    }
  };
  return (
    <>
      {favBool ? (
        <FavoriteIcon htmlColor="#ff00f8" onClick={setCollectionFav} />
      ) : (
        <FavoriteBorderIcon onClick={setCollectionFav} />
      )}
    </>
  );
}
