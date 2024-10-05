import React from 'react';
import styled from 'styled-components';

const Bubble = styled.div`
  background-color: ${({ isMine }) => (isMine ? '#daf8cb' : '#f1f0f0')};
  border-radius: 10px;
  padding: 10px;
  margin: 5px;
  max-width: 60%;
  align-self: ${({ isMine }) => (isMine ? 'flex-end' : 'flex-start')};
`;

const ChatBubble = ({ message, isMine }) => {
  return <Bubble isMine={isMine}>{message}</Bubble>;
};

export default ChatBubble;
