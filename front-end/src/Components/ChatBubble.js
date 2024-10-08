import React from 'react'; // Importing React library for creating components
import styled, { css } from 'styled-components'; // Importing styled-components for styling

// Styled component for the container of each chat bubble
const BubbleContainer = styled.div`
  display: flex; // Use flexbox for layout
  justify-content: ${(props) => (props.isMine ? 'flex-end' : 'flex-start')}; // Align bubble to the right if sent by the user, otherwise to the left
  padding: 10px; // Add padding around the container
`;

// Styled component for the chat bubble itself
const Bubble = styled.div`
  background-color: ${(props) => (props.isMine ? '#1c669a' : '#fa753c')}; /* Blue for sent messages, Orange for received messages */
  color: white; // Text color for the bubble
  padding: 10px 20px; // Padding inside the bubble
  border-radius: 20px; // Rounded corners for the bubble
  max-width: 60%; // Limit the maximum width of the bubble
  word-wrap: break-word; // Allow long words to break and wrap to the next line
`;

// Fixed the username appearing inside the bubble
const Name = styled.div`
  text-align: ${(props) => (props.isMine ? 'right' : 'left')}; // Align based on isMine
  padding-bottom: 5px;
  font-weight: bold;
`;


// ChatBubble component receives message and isMine props
const ChatBubble = ({ message, sender, timeStamp, isMine, showSender }) => {
  return (
    <div>
      {showSender && <p>{timeStamp}</p>}
      {showSender && <Name isMine={isMine}>{sender}:</Name>}
      <BubbleContainer isMine={isMine}>
        <Bubble isMine={isMine}>{message}</Bubble>
      </BubbleContainer>
    </div>
  );
};

// Exporting ChatBubble component to be used in other parts of the application
export default ChatBubble;
