import React, { useState } from 'react';
import ChatScreen from './Components/ChatScreen'; // Import the ChatScreen component
import LoginScreen from './Login/LoginScreen';   // Import the LoginScreen component
import './App.css';                             // Import the CSS file for styling

function App() {
  // State to manage login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // State to store the username entered by the user
  const [username, setUsername] = useState(''); 

  // Function to handle the login process
  const handleLogin = (username) => {
    setUsername(username); // Store the username in state
    setIsLoggedIn(true);   // Set the user as logged in
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        // If the user is not logged in, render the LoginScreen component
        <LoginScreen onLogin={handleLogin} />
      ) : (
        // If the user is logged in, render the ChatScreen component
        <ChatScreen username={username} /> // Pass the username as a prop to ChatScreen
      )}
    </div>
  );
}

export default App;
