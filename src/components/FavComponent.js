import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { db } from './../firebase';
import firebase from 'firebase';

export default function FavComponent({ rockID }) {
  const { currentUser } = useAuth();

  const [getFavArr, setFavArr] = useState();
  const [useFlag, setFlag] = useState(false);
  const [favBool, setFavBool] = useState(false);
  const [getCheckCollectionExists, setCheckCollectionExists] = useState();

  useEffect(() => {
    const checkIfFavorite = async () => {
      const favRef = await db.collection('fav').doc(currentUser.uid);
      const getAllDoc = await favRef.get();
      if (!getAllDoc.exists) {
        console.log('No such document!');
        setCheckCollectionExists(false);
      } else {
        const rockResults = await getAllDoc.data()['rocks'];
        setFavArr(rockResults);
      }
      setFlag(true);
    };
    checkIfFavorite();
  }, [currentUser.uid]);

  useEffect(() => {
    const setFavBoolFunc = async () => {
      if (getFavArr !== undefined) {
        let trueOrFalse = await getFavArr.find((el) => el === rockID);
        if (trueOrFalse !== undefined) {
          setFavBool(true);
        }
      }
      return;
    };

    setFavBoolFunc();
  }, [getFavArr, rockID, useFlag]);

  const setCollectionFav = async () => {
    if (getCheckCollectionExists === false) {
      const res = await db
        .collection('fav')
        .doc(currentUser.uid)
        .set({ rocks: firebase.firestore.FieldValue.arrayUnion(rockID) });
      setCheckCollectionExists(true);
      return res;
    }
    if (favBool === false) {
      const favRes = await db
        .collection('fav')
        .doc(currentUser.uid)
        .update({
          rocks: firebase.firestore.FieldValue.arrayUnion(rockID),
        });
      setFavBool(true);
      return favRes;
    } else {
      const favArrRes = await db
        .collection('fav')
        .doc(currentUser.uid)
        .update({
          rocks: firebase.firestore.FieldValue.arrayRemove(rockID),
        });
      setFavBool(false);
      return favArrRes;
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
