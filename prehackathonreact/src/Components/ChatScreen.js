import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import TopHeader from './TopHeader';

// Styled component for the chat container
const ChatContainer = styled.div`
  height: 700px;
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  padding: 10px;
`;

// Styled component for the message list
const MessageList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
`;

const ChatScreen = ({ username }) => {  // Accept username as a prop
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws');
    const client = Stomp.over(socket);

    client.connect({}, () => {
      setIsConnected(true);
      client.subscribe('/topic/messages', (message) => {
        const receivedMessage = JSON.parse(message.body);
        setMessages((prev) => [...prev, { text: receivedMessage.text, isMine: false }]);
      });
    });

    setStompClient(client);

    return () => {
      if (client) client.disconnect();
    };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (message) => {
    const newMessage = { text: message, isMine: true };
    setMessages((prev) => [...prev, newMessage]);

    if (stompClient && isConnected) {
      stompClient.send('/app/chat', {}, JSON.stringify(newMessage));
    } else {
      console.error('STOMP client is not connected.');
    }
  };

  return (
    <>
      <TopHeader /> {/* You can show the username in the header if needed */}
      <h2>Welcome, {username}!</h2> {/* Display username here */}
      <ChatContainer>
        <MessageList>
          {messages.map((msg, index) => (
            <ChatBubble key={index} message={msg.text} isMine={msg.isMine} />
          ))}
          <div ref={chatEndRef} />
        </MessageList>
        <ChatInput onSendMessage={handleSendMessage} />
      </ChatContainer>
    </>
  );
};

export default ChatScreen;
