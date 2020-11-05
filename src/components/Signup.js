import {
  TextField,
  Button,
  Card,
  CardActions,
  CardContent,
  makeStyles,
  Typography,
  Snackbar,
} from '@material-ui/core';

import Alert from '@material-ui/lab/Alert';
import React, { useRef, useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const useStyles = makeStyles({
  root: {
    width: window.innerWidth < 550 ? '60%' : '40%',
    height: '60%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  spacing: {
    padding: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Signup() {
  const passwordConfirmRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();
  const classes = useStyles();
  const { signup, currentUser } = useAuth();
  const [error, setError] = useState('');
  const [loadingState, setLoadingState] = useState(false);
  const [getUserDevice, setUserDevice] = useState(false); //true is mob - false if web
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  function detectMob() {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i,
    ];

    return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
    });
  }

  useEffect(() => {
    setUserDevice(detectMob());
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setOpen(true);
      return setError('Passwords do not match');
    }
    try {
      setError('');
      setLoadingState(true);
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch (e) {
      setOpen(true);
      setError(e.message);
    }
    setLoadingState(false);
  }

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
            SIGN UP
          </Typography>
        </CardContent>
        {console.log(JSON.stringify(currentUser))}
        <form className={classes.root}>
          <div className={classes.spacing}>
            <TextField
              style={{ width: 200 }}
              inputRef={emailRef}
              id="emailInput"
              label="Email"
              type="text"
            />
          </div>

          <div className={classes.spacing}>
            <TextField
              style={{ width: 200 }}
              inputRef={passwordRef}
              id="passwordInput"
              label="Password"
              type="password"
            />
          </div>

          <div className={classes.spacing}>
            <TextField
              style={{ width: 200 }}
              inputRef={passwordConfirmRef}
              id="passwordConfInput"
              label="Password Confirmation"
              type="password"
            />
          </div>
        </form>

        <CardActions>
          <Button
            onClick={handleSubmit}
            disabled={loadingState}
            size="small"
            variant="outlined"
          >
            Sign up
          </Button>
        </CardActions>

        <Typography className={classes.title} color="textSecondary">
          Already have an account?
        </Typography>
      </Card>
      {error && (
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error">
            {error}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}
