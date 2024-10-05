import React, { useState, useEffect, useRef } from 'react'; // Import necessary React hooks
import styled from 'styled-components'; // Import styled-components for styling
import ChatBubble from './ChatBubble'; // Import ChatBubble component to display messages
import ChatInput from './ChatInput'; // Import ChatInput component for message input
import SockJS from 'sockjs-client'; // Import SockJS for WebSocket communication
import { Stomp } from '@stomp/stompjs'; // Import Stomp for messaging over WebSocket
import TopHeader from './TopHeader'; // Import the TopHeader component

// Styled component for the overall chat container
const ChatContainer = styled.div`
  height: 700px; // Fixed height for the chat area
  display: flex; // Use flexbox layout
  flex-direction: column; // Arrange children in a column
  border: 1px solid #ddd; // Light gray border around the chat area
  padding: 10px; // Padding inside the container

`;

// Styled component for the message list area
const MessageList = styled.div`
  flex: 1; // Takes up remaining space in the container
  overflow-y: auto; // Allows vertical scrolling when messages overflow
  padding: 10px; // Padding inside the message list
`;

// ChatScreen component to manage chat functionality
const ChatScreen = () => {
  const [messages, setMessages] = useState([]); // State for storing messages
  const [stompClient, setStompClient] = useState(null); // State for STOMP client
  const [isConnected, setIsConnected] = useState(false); // Track connection status
  const chatEndRef = useRef(null); // Ref to scroll to the end of messages

  // Effect for establishing WebSocket connection
  useEffect(() => {
    // Create a WebSocket connection
    const socket = new SockJS('http://localhost:8080/ws');
    const client = Stomp.over(socket); // Create STOMP client over the socket

    // Connect to the STOMP server
    client.connect({}, () => {
      setIsConnected(true); // Set connection status to true when connected
      // Subscribe to the messages topic
      client.subscribe('/topic/messages', (message) => {
        const receivedMessage = JSON.parse(message.body); // Parse the incoming message
        // Update messages state with the received message
        setMessages((prev) => [...prev, { text: receivedMessage.text, isMine: false }]);
      });
    });

    setStompClient(client); // Set the STOMP client in state

    // Cleanup function to disconnect the client on unmount
    return () => {
      if (client) client.disconnect(); // Disconnect the client if it exists
    };
  }, []); // Run this effect only once on mount

  // Effect to scroll to the bottom whenever messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to the end
  }, [messages]); // Depend on messages array

  // Function to handle sending messages
  const handleSendMessage = (message) => {
    const newMessage = { text: message, isMine: true }; // Create a new message object
    setMessages((prev) => [...prev, newMessage]); // Update messages state with the new message

    // Send the message only if stompClient is connected
    if (stompClient && isConnected) {
      stompClient.send('/app/chat', {}, JSON.stringify(newMessage)); // Send message to the server
    } else {
      console.error('STOMP client is not connected.'); // Log error if not connected
    }
  };

  return (
    <>
      <TopHeader /> {/* Render the TopHeader component */}
      <ChatContainer>
        <MessageList>
          {/* Map over messages and render ChatBubble for each message */}
          {messages.map((msg, index) => (
            <ChatBubble key={index} message={msg.text} isMine={msg.isMine} />
          ))}
          <div ref={chatEndRef} /> {/* Empty div to scroll to */}
        </MessageList>
        <ChatInput onSendMessage={handleSendMessage} /> {/* Render ChatInput for user input */}
      </ChatContainer>
    </>
  );
};

// Exporting the ChatScreen component for use in other parts of the application
export default ChatScreen;
