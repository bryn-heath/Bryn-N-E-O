import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  const [useBgUrl, setBgUrl] = useState('');

  const bgUrlFetch = async () => {
    return await fetch(
      'https://api.nasa.gov/planetary/apod?api_key=wq6CVTNwrDLBATNEc8oDjfcq4baCXxIlJoLPNJGe'
    ).then((res) => res.json());
  };

  useEffect(() => {
    bgUrlFetch().then((data) => setBgUrl(data));
  }, []);

  return (
    <div
      style={{
        // backgroundColor: 'black',
        backgroundRepeat: 'repeat',
        backgroundPosition: 'center',
        // backgroundSize: 'cover',
        backgroundImage: `url(${useBgUrl ? useBgUrl.url : null})`,
        height: window.innerHeight - 20,
        width: window.innerWidth - 20,
      }}
    >
      {/* <img
        src={useBgUrl ? useBgUrl.url : null}
        alt="nasa"
        className="img-responsive"
      /> */}
      <Router>
        <AuthProvider>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: 'translate(0, 100%)',
            }}
          >
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
            </Switch>
          </div>
        </AuthProvider>
      </Router>
    </div>
  );
};

export default App;
