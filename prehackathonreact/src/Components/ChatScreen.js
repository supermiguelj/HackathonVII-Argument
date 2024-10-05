import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 800px;
  margin: 0 auto;
  border: 1px solid #ddd;
`;

const MessageList = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [client, setClient] = useState(null);

  useEffect(() => {
    // Establish WebSocket connection
    const socket = new SockJS('http://localhost:8080/ws');
    const stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        stompClient.subscribe('/topic/messages', (message) => {
          const receivedMessage = JSON.parse(message.body);
          setMessages((prev) => [...prev, { text: receivedMessage.text, isMine: false }]);
        });
      },
    });

    stompClient.activate();
    setClient(stompClient);

    return () => {
      // Disconnect on component unmount
      if (client) client.deactivate();
    };
  }, []);

  const handleSendMessage = (message) => {
    const newMessage = { text: message, isMine: true };
    setMessages((prev) => [...prev, newMessage]);

    // Send the message to the backend
    if (client && client.connected) {
      client.publish({
        destination: '/app/chat',
        body: JSON.stringify(newMessage),
      });
    }
  };

  return (
    <ChatContainer>
      <MessageList>
        {messages.map((msg, index) => (
          <ChatBubble key={index} message={msg.text} isMine={msg.isMine} />
        ))}
      </MessageList>
      <ChatInput onSendMessage={handleSendMessage} />
    </ChatContainer>
  );
};

export default ChatScreen;
