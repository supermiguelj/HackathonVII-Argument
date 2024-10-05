import React, { useState } from 'react';

function ArgumentApp() {
  const [username, setUsername] = useState('');

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = () => {
    console.log(`Username entered: ${username}`);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
      <div style={{ backgroundColor: '#d3d3d3', padding: '8%', borderRadius: '15px', textAlign: 'center' }}>
        <h1>Welcome to Argument!</h1>
        <input 
          type="text" 
          placeholder="enter username" 
          value={username} 
          onChange={handleInputChange} 
          style={{ padding: '10px', borderRadius: '15px', border: '1px solid #ccc', marginBottom: '10px' }}
        />
        <br />
        <button 
          onClick={handleSubmit} 
          style={{ margin: '5px', padding: '10px 20px', borderRadius: '15px', backgroundColor: '#000', color: '#fff', border: 'none', cursor: 'pointer' }}
        >
          GO!
        </button>
      </div>
    </div>
  );
}

export default ArgumentApp;
