import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ChatBubble from './ChatBubble';  // Component for individual chat bubbles
import ChatInput from './ChatInput';    // Component for the chat input field
import SockJS from 'sockjs-client';     // Library for SockJS WebSocket client
import { Stomp } from '@stomp/stompjs'; // Stomp client for WebSocket messaging
import TopHeader from './TopHeader';    // Component for the top header

// Styled component for the overall chat container
const ChatContainer = styled.div`
  height: 700px;
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  padding: 10px;
`;

// Styled component for the message list container
const MessageList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
`;

// ChatScreen component, receives the username as a prop
const ChatScreen = ({ username }) => {  
  // State to store the list of chat messages
  const [messages, setMessages] = useState([]);

  // State to store the STOMP client for WebSocket communication
  const [stompClient, setStompClient] = useState(null);

  // State to check if the WebSocket client is connected
  const [isConnected, setIsConnected] = useState(false);

  // Ref to manage the scroll position at the bottom of the chat
  const chatEndRef = useRef(null);

  // useEffect to initialize WebSocket connection and subscribe to message updates
  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws'); // Create SockJS connection
    const client = Stomp.over(socket);                     // Wrap it with STOMP protocol

    // Connect to the server and subscribe to the message topic
    client.connect({}, () => {
      setIsConnected(true);  // Set connection state to true
      client.subscribe('/topic/messages', (message) => {
        // Parse and handle the incoming message
        const receivedMessage = JSON.parse(message.body);
        setMessages((prev) => [...prev, { text: receivedMessage.text, isMine: false }]);
      });
    });

    setStompClient(client); // Store the STOMP client instance

    // Cleanup function to disconnect the STOMP client when the component unmounts
    return () => {
      if (client) client.disconnect();
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  // useEffect to auto-scroll the chat to the latest message whenever a new message is added
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]); // Triggered whenever the messages array updates

  // Function to handle sending a new message
  const handleSendMessage = (message) => {
    const newMessage = { text: message, isMine: true }; // Create a new message object
    setMessages((prev) => [...prev, newMessage]);       // Add the message to the local state

    // Send the message via the STOMP client if connected
    if (stompClient && isConnected) {
      stompClient.send('/app/chat', {}, JSON.stringify(newMessage)); // Send message to server
    } else {
      console.error('STOMP client is not connected.'); // Error handling if the client is disconnected
    }
  };

  // Return the UI structure of the chat screen
  return (
    <>
      <TopHeader /> {/* Top header component, optional for showing username or other info */}
      <h2>Welcome, {username}!</h2> {/* Display the username passed in as a prop */}
      
      <ChatContainer>
        <MessageList>
          {/* Loop through the messages array and render a ChatBubble for each message */}
          {messages.map((msg, index) => (
            <ChatBubble key={index} message={msg.text} isMine={msg.isMine} />
          ))}
          {/* Dummy div to scroll to the bottom of the chat */}
          <div ref={chatEndRef} />
        </MessageList>
        {/* Chat input field for sending messages */}
        <ChatInput onSendMessage={handleSendMessage} />
      </ChatContainer>
    </>
  );
};

export default ChatScreen; // Export the ChatScreen component to be used in other parts of the app
