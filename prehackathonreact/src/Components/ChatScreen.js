import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const ChatContainer = styled.div`
  height: 750px; // Fixed height for the chat area
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  padding: 10px;
`;

const MessageList = styled.div`
  flex: 1; // Takes up remaining space
  overflow-y: auto; // Allows scrolling
  padding: 10px;
`;

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false); // Track connection status
  const chatEndRef = useRef(null);

  useEffect(() => {
    // Establish WebSocket connection
    const socket = new SockJS('http://localhost:8080/ws');
    const client = Stomp.over(socket);

    client.connect({}, () => {
      setIsConnected(true); // Set connection status to true when connected
      // Subscribe to a topic
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
    // Scroll to the bottom whenever messages change
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (message) => {
    const newMessage = { text: message, isMine: true };
    setMessages((prev) => [...prev, newMessage]);

    // Send the message only if stompClient is connected
    if (stompClient && isConnected) {
      stompClient.send('/app/chat', {}, JSON.stringify(newMessage));
    } else {
      console.error('STOMP client is not connected.');
    }
  };

  return (
    <ChatContainer>
      <MessageList>
        {messages.map((msg, index) => (
          <ChatBubble key={index} message={msg.text} isMine={msg.isMine} />
        ))}
        <div ref={chatEndRef} /> {/* Empty div to scroll to */}
      </MessageList>  
      <ChatInput onSendMessage={handleSendMessage} />
    </ChatContainer>
  );
};

export default ChatScreen;
