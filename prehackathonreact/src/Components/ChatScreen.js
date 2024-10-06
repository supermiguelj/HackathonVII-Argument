import React, { useState, useEffect, useRef } from 'react'; // Import necessary React hooks
import styled from 'styled-components'; // Import styled-components for styling
import Sidebar from './Sidebar'; // Import the Sidebar component
import ChatBubble from './ChatBubble'; // Import the ChatBubble component for displaying messages
import ChatInput from './ChatInput'; // Import the ChatInput component for sending messages
import SockJS from 'sockjs-client'; // Import SockJS for WebSocket communication
import { Stomp } from '@stomp/stompjs'; // Import STOMP protocol for WebSocket messaging
import TopHeader from './TopHeader'; // Import the TopHeader component

// Styled component for the overall chat container
const ChatContainer = styled.div`
  height: 580px; // Set fixed height for the chat container
  display: flex; // Use flexbox for layout
  flex-direction: column; // Arrange children in a column
  border: 1px solid #ddd; // Add a light border around the container
  padding: 10px; // Add padding inside the container
  margin-left: 21%; /* Adjusted for sidebar width */
  width: 80%; // Set width of the chat container
`;

// Styled component for the message list
const MessageList = styled.div`
  flex: 1; // Allow this component to grow and fill available space
  overflow-y: auto; // Enable vertical scrolling
  padding: 10px; // Add padding inside the message list
`;

// Styled component for the welcome message container
const WelcomeContainer = styled.div`
  margin-left: 15%; // Add margin for proper alignment
`;

// Main ChatScreen component
const ChatScreen = ({ username }) => {  
  // State variables for messages, stompClient, and connection status
  const [messages, setMessages] = useState([]); // Store chat messages
  const [stompClient, setStompClient] = useState(null); // Store STOMP client instance
  const [isConnected, setIsConnected] = useState(false); // Track connection status
  const chatEndRef = useRef(null); // Reference to scroll to the bottom of the chat

  useEffect(() => {
    // Initialize WebSocket connection when the component mounts
    const socket = new SockJS('http://localhost:8080/ws'); // Create a SockJS connection
    const client = Stomp.over(socket); // Create a STOMP client over the SockJS connection

    // Connect to the WebSocket server
    client.connect({}, () => {
      setIsConnected(true); // Update connection status
      // Subscribe to the messages topic
      client.subscribe('/topic/messages', (message) => {
        const receivedMessage = JSON.parse(message.body); // Parse received message
        // Update the messages state with the new message
        setMessages((prev) => [...prev, { text: receivedMessage.text, isMine: false }]);
      });
    });

    setStompClient(client); // Store the STOMP client instance

    // Cleanup function to disconnect from the server when the component unmounts
    return () => {
      if (client) client.disconnect(); // Disconnect the client if it exists
    };
  }, []); // Empty dependency array to run effect only on mount and unmount

  useEffect(() => {
    // Scroll to the bottom of the message list when new messages arrive
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]); // Run effect when messages state changes

  // Function to handle sending messages
  const handleSendMessage = (message) => {
    const newMessage = { text: message, isMine: true }; // Create new message object
    // Update messages state with the new message
    setMessages((prev) => [...prev, newMessage]);

    // Check if the STOMP client is connected before sending the message
    if (stompClient && isConnected) {
      stompClient.send('/app/chat', {}, JSON.stringify(newMessage)); // Send the new message
    } else {
      console.error('STOMP client is not connected.'); // Log error if not connected
    }
  };

  return (
    <>
      <TopHeader /> {/* Render the TopHeader component */}
      <WelcomeContainer>
        <h2>Welcome, {username}!</h2> {/* Display welcome message with username */}
      </WelcomeContainer>

      <div style={{ display: 'flex' }}> {/* Flex container for Sidebar and ChatContainer */}
        <Sidebar /> {/* Include the Sidebar component here */}
        <ChatContainer>
          <MessageList>
            {/* Render list of messages using ChatBubble component */}
            {messages.map((msg, index) => (
              <ChatBubble key={index} message={msg.text} isMine={msg.isMine} />
            ))}
            <div ref={chatEndRef} /> {/* Reference for scrolling to the bottom */}
          </MessageList>
          <ChatInput onSendMessage={handleSendMessage} /> {/* Render ChatInput for message input */}
        </ChatContainer>
      </div>
    </>
  );
};

export default ChatScreen; // Export the ChatScreen component for use in other parts of the application
