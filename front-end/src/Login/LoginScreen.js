import React, { useState } from 'react';
import bgImage from '../images/bgpic.jpeg';  // Import the background image

// LoginScreen component, receives the onLogin function as a prop from the parent component
function LoginScreen({ onLogin }) {
  // State hook to store the entered username
  const [username, setUsername] = useState('');

  // Handles the change in input field when the user types
  const handleInputChange = (event) => {
    setUsername(event.target.value); // Updates the username state with the new value
  };

  // Handles form submission when the "GO!" button is clicked
  const handleSubmit = () => {
    if (username.trim()) { // Checks if the username is not empty or just whitespace
      onLogin(username);   // Calls the onLogin function with the username, passed from the parent component
    } else {
      alert('Please enter a valid username'); // Alert the user if the username is invalid (empty)
    }
  };

  // Adds Enter key functionality for the login button
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  // The return function defines the UI elements of the LoginScreen
  return (
    <div 
      style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',   // Full viewport height
        backgroundImage: `url(${bgImage})`,  // Set the background image
        backgroundSize: 'cover',             // Ensure the image covers the entire background
        backgroundPosition: 'center',        // Center the image
        backgroundRepeat: 'no-repeat'        // Prevent the image from repeating
      }}
    >
      {/* Outer container for the login form */}
      <div 
        style={{ 
          backgroundColor: 'rgba(211, 211, 211, 0.85)', // Light gray background with transparency
          padding: '8%', 
          borderRadius: '50px', 
          textAlign: 'center' 
        }}
      >
        <h1>Welcome to Argument!</h1> {/* Title */}

        {/* Input field for username */}
        <input 
          type="text" 
          placeholder="Enter username" 
          value={username} // Value is controlled by the username state
          onChange={handleInputChange} // Calls handleInputChange on typing
          onKeyPress={handleKeyPress} // Implements Enter key functionality
          style={{ 
            padding: '10px', 
            borderRadius: '15px', 
            border: '1px solid #ccc', 
            marginBottom: '10px' 
          }}
        />
        <br />

        {/* Submit button */}
        <button 
          onClick={handleSubmit} // Calls handleSubmit on button click
          style={{ 
            margin: '5px', 
            padding: '10px 20px', 
            borderRadius: '15px', 
            backgroundColor: '#000', 
            color: '#fff', 
            border: 'none', 
            cursor: 'pointer' 
          }}
        >
          GO!
        </button>
      </div>
    </div>
  );
}

export default LoginScreen; // Exporting the component to use it in other files