import React from 'react';
import styled from 'styled-components';

const BubbleContainer = styled.div`
  display: flex;
  justify-content: ${(props) => (props.isMine ? 'flex-end' : 'flex-start')};
  padding: 10px;
`;

const Bubble = styled.div`
  background-color: ${(props) => (props.isMine ? '#007bff' : '#28a745')}; /* Blue for sent, Green for received */
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  max-width: 60%;
  word-wrap: break-word;
`;

const ChatBubble = ({ message, isMine }) => {
  return (
    <BubbleContainer isMine={isMine}>
      <Bubble isMine={isMine}>{message}</Bubble>
    </BubbleContainer>
  );
};

export default ChatBubble;
