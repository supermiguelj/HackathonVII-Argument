import React from 'react';
import ChatScreen from './Components/ChatScreen'; // Update the import to include the Components folder
import LoginScreen from './Login/LoginScreen'; // Update the import to include the Components folder
import './App.css'; // Optional: keep the default styles if needed

function App() {
  return (
    <div className="App">
      <LoginScreen />
      <ChatScreen /> {/* Render ChatScreen */}
    </div>
  );
}

export default App;
