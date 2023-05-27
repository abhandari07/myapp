// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import Routes from './routes/Routes';
import NavBar from './components/Common/NavBar';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUsername = localStorage.getItem('username');
    if(token) {
      setAuthenticated(true);
      setUsername(savedUsername);
    }
  }, []);

  const login = (username) => {
    setUsername(username);
    setAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUsername("");
    setAuthenticated(false);
  };

  return (
    <div className="App">
      <NavBar authenticated={authenticated} username={username} onLogout={logout} />
      <Routes authenticated={authenticated} onLogin={login} onLogout={logout} />
    </div>
  );
}

export default App;
