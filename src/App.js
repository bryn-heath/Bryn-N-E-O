import React from 'react';
import Signup from './components/Signup';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <div
      style={{
        background: '#E5E5E5',
        height: window.innerHeight - 20,
        width: window.innerWidth - 20,
      }}
    >
      <AuthProvider>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'translate(0, 100%)',
          }}
        >
          <Signup />
        </div>
      </AuthProvider>
    </div>
  );
};

export default App;
