import firebase from 'firebase/app';
import 'firebase/auth';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyAdZoj8NMvC6w12W1JX7-yW0gc-QnhwNvI',
  authDomain: 'brynscribeless.firebaseapp.com',
  databaseURL: 'https://brynscribeless.firebaseio.com',
  projectId: 'brynscribeless',
  storageBucket: 'brynscribeless.appspot.com',
  messagingSenderId: '904320710052',
  appId: '1:904320710052:web:965babb864b428e29d3d31',
  measurementId: 'G-5Q9KX363ZZ',

  // apiKey: process.env.REACT_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_FIREBASE_AUTH_DOMAIN,
  // databaseURL: process.env.REACT_FIREBASE_DATABASE_URL,
  // projectId: process.env.REACT_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_FIREBASE_APP_ID,
  // measurementId: process.env.REACT_FIREBASE_MEASUREMENT_ID,
});

export const auth = app.auth();
export default app;
