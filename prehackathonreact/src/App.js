import React, { useState } from 'react';
import ChatScreen from './Components/ChatScreen';
import LoginScreen from './Login/LoginScreen';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(''); // Store the username

  const handleLogin = (username) => {
    setUsername(username); // Store the username in state
    setIsLoggedIn(true);   // Set the user as logged in
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        // Render the LoginScreen if the user is not logged in
        <LoginScreen onLogin={handleLogin} />
      ) : (
        // Render the ChatScreen if the user is logged in
        <ChatScreen username={username} /> // Pass the username to ChatScreen if needed
      )}
    </div>
  );
}

export default App;
