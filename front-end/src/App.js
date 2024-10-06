import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Import Router and Routes for routing
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
    <Router> {/* Wrap the application in the Router component */}
      <div className="App"> {/* Main application container */}
        {!isLoggedIn ? ( // Conditional rendering based on login status
          <LoginScreen onLogin={handleLogin} /> // If not logged in, show LoginScreen
        ) : ( // If logged in
          <Routes> {/* Define the application routes */}
            <Route path="/:chatRoom" element={<ChatScreen username={username} />} />
            {/* Redirect to chat1 by default if user visits the root path */}
            <Route path="/" element={<Navigate to="/general" replace />} /> 
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
