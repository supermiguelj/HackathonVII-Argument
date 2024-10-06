import React, { useState } from 'react'; // Import React and useState hook for managing state
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Import Router and Routes for routing
import ChatScreen from './Components/ChatScreen'; // Import the ChatScreen component for chat functionality
import LoginScreen from './Login/LoginScreen'; // Import the LoginScreen component for user login
import './App.css'; // Import the main CSS file for styling

function App() {
  // State to track login status and store the username
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Default is not logged in
  const [username, setUsername] = useState(''); // Initialize username as an empty string

  // Function to handle user login
  const handleLogin = (username) => {
    setUsername(username); // Update username state with the logged-in username
    setIsLoggedIn(true); // Set login status to true
  };

  return (
    <Router> {/* Wrap the application in the Router component */}
      <div className="App"> {/* Main application container */}
        {!isLoggedIn ? ( // Conditional rendering based on login status
          <LoginScreen onLogin={handleLogin} /> // If not logged in, show LoginScreen
        ) : ( // If logged in
          <Routes> {/* Define the application routes */}
            <Route path="/chat1" element={<ChatScreen username={username} />} /> {/* Chat room 1 */}
            <Route path="/chat2" element={<ChatScreen username={username} />} /> {/* Chat room 2 */}
            <Route path="/chat3" element={<ChatScreen username={username} />} /> {/* Chat room 3 */}
            {/* Redirect to chat1 by default if user visits the root path */}
            <Route path="/" element={<Navigate to="/chat1" replace />} /> 
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App; // Export the App component for use in other parts of the application
