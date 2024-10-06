import React, { useState } from 'react'; // Importing React library and useState hook for managing component state
import styled from 'styled-components'; // Importing styled-components for CSS-in-JS styling

// Styled component for the input container which holds the input field and send button
const InputContainer = styled.div`
  display: flex; // Use flexbox for layout
  padding: 10px; // Add padding around the container
  border-top: 1px solid #ddd; // Add a top border to separate input from chat messages
  height: 50px; // Adjust the height to fit better
  border-radius: 10px;
`;

// Styled component for the text input field
const InputField = styled.input`
  flex-grow: 1; // Allow the input field to grow and take up available space
  padding: 10px; // Padding inside the input field
  border: 1px solid #ddd; // Light gray border for the input field
  border-radius: 10px; // Rounded corners for the input field
  font-size: 16px; // Font size for the input text
`;

// Styled component for the send button
const SendButton = styled.button`
  padding: 10px 20px; // Padding inside the button
  margin-left: 10px; // Space between the input field and button
  background-color: #007bff; // Blue background color for the button
  color: white; // White text color for the button
  border: none; // No border for the button
  border-radius: 10px; // Rounded corners for the button
  cursor: pointer; // Pointer cursor on hover

  &:hover {
    background-color: #0056b3; // Darker blue on hover
  }
`;

// ChatInput component receives onSendMessage prop to handle sending messages
const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState(''); // State for the message input

  // Function to handle sending the message
  const handleSend = () => {
    if (message.trim() !== '') { // Check if the message is not just whitespace
      onSendMessage(message); // Call the passed-in function to send the message
      setMessage(''); // Clear the input field after sending
    }
  };

  // Function to handle key press events in the input field
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') { // Check if the Enter key was pressed
      handleSend(); // Call handleSend if Enter is pressed
    }
  };

  return (
    <InputContainer>
      {/* Input field for typing messages */}
      <InputField
        type="text"
        value={message} // Controlled input, value from state
        onChange={(e) => setMessage(e.target.value)} // Update state on input change
        onKeyPress={handleKeyPress} // Listen for Enter key press
        placeholder="Type your message..." // Placeholder text in the input field
      />
      {/* Send button to send the message */}
      <SendButton onClick={handleSend}>Send</SendButton>
    </InputContainer>
  );
};

// Exporting ChatInput component for use in other parts of the application
export default ChatInput;
