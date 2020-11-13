import {
  Button,
  Card,
  CardActions,
  CardContent,
  makeStyles,
  Snackbar,
  TextField,
  Typography,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    transform: 'translate(0, 80%)',
  },
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
  const [open, setOpen] = React.useState(false);
  const history = useHistory();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

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
      setOpen(true);
      setError('Account created');
      setTimeout(function () {
        history.push('/login');
      }, 1000);
    } catch (e) {
      setOpen(true);
      setError(e.message);
    }
    setLoadingState(false);
  }

  return (
    <div className={classes.container}>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
            SIGN UP
          </Typography>
        </CardContent>
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

        <div className={classes.spacing}>
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
        </div>

        <Typography className={classes.title} color="textSecondary">
          Already have an account? <Link to="/login">Log in</Link>
        </Typography>
      </Card>
      {error && (
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          {error === 'Account created' ? (
            <Alert severity="success">{error}</Alert>
          ) : (
            <Alert onClose={handleClose} severity="error">
              {error}
            </Alert>
          )}
        </Snackbar>
      )}
    </div>
  );
}
