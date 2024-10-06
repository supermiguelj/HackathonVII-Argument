import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import ChatBubble from './ChatBubble';  // Component for individual chat bubbles
import ChatInput from './ChatInput';    // Component for the chat input field
import SockJS from 'sockjs-client';     // Library for SockJS WebSocket client
import { Stomp } from '@stomp/stompjs'; // Stomp client for WebSocket messaging
import TopHeader from './TopHeader';    // Component for the top header
import { useParams } from 'react-router-dom'; // Import useParams to access route parameters


// Styled component for the overall chat container
const ChatContainer = styled.div`
  height: 580px;
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  padding: 10px;
  margin-left: 21%;
  width: 80%;
`;

// Styled component for the message list container
const MessageList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
`;

// Styled component for the welcome message container
const WelcomeContainer = styled.div`
  margin-left: 15%;
`;

const ChatScreen = ({ username }) => {  
  const { chatRoom } = useParams(); // Get the chat room name from URL parameters
  const [messages, setMessages] = useState([]); // State to store the list of chat messages
  const [stompClient, setStompClient] = useState(null); // State to store the STOMP client for WebSocket communication
  const [isConnected, setIsConnected] = useState(false); // State to check if the WebSocket client is connected
  const chatEndRef = useRef(null); // Ref to manage the scroll position at the bottom of the chat

  // useEffect to initialize WebSocket connection and subscribe to message updates
  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/websocket'); // Create SockJS connection
    const client = Stomp.over(socket);  // Wrap it with STOMP protocol

    // Connect to the server and subscribe to the message topic
    client.connect({}, () => {
      setIsConnected(true);  // Set connection state to true
      // Event listener
      client.subscribe('/topic/general', (message) => {
        // console.log("message received at ", chatRoom);
        const receivedMessage = JSON.parse(message.body);
        setMessages((prev) => [...prev, { sender: receivedMessage.sender, content: receivedMessage.content, timeStamp: receivedMessage.timeStamp, destination: receivedMessage.destination }]);
      });
      client.subscribe('/topic/economics', (message) => {
        // console.log("message received at ", chatRoom);
        const receivedMessage = JSON.parse(message.body);
        setMessages((prev) => [...prev, { sender: receivedMessage.sender, content: receivedMessage.content, timeStamp: receivedMessage.timeStamp, destination: receivedMessage.destination }]);
      });
      client.subscribe('/topic/climate-change', (message) => {
        // console.log("message received at ", chatRoom);
        const receivedMessage = JSON.parse(message.body);
        setMessages((prev) => [...prev, { sender: receivedMessage.sender, content: receivedMessage.content, timeStamp: receivedMessage.timeStamp, destination: receivedMessage.destination }]);
      });
      client.subscribe('/topic/government', (message) => {
        // console.log("message received at ", chatRoom);
        const receivedMessage = JSON.parse(message.body);
        setMessages((prev) => [...prev, { sender: receivedMessage.sender, content: receivedMessage.content, timeStamp: receivedMessage.timeStamp, destination: receivedMessage.destination }]);
      });
      client.subscribe('/topic/capital-punishment', (message) => {
        // console.log("message received at ", chatRoom);
        const receivedMessage = JSON.parse(message.body);
        setMessages((prev) => [...prev, { sender: receivedMessage.sender, content: receivedMessage.content, timeStamp: receivedMessage.timeStamp, destination: receivedMessage.destination }]);
      });
      client.subscribe('/topic/euthanasia', (message) => {
        // console.log("message received at ", chatRoom);
        const receivedMessage = JSON.parse(message.body);
        setMessages((prev) => [...prev, { sender: receivedMessage.sender, content: receivedMessage.content, timeStamp: receivedMessage.timeStamp, destination: receivedMessage.destination }]);
      });
    });

    setStompClient(client); // Store the STOMP client instance

    // Cleanup function to disconnect the STOMP client when the component unmounts
    return () => {
      if (client) client.disconnect();
    };
  }, [chatRoom]); // Empty dependency array ensures this runs only once on mount

  // useEffect to auto-scroll the chat to the latest message whenever a new message is added
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]); // Triggered whenever the messages array updates

  // Function to handle sending a new message
  const handleSendMessage = (message) => {
    const newMessage = { sender: username, content: message, destination: chatRoom}; // Create a new message object
    if (stompClient && isConnected) {
      stompClient.send('/app/chat.send', {}, JSON.stringify(newMessage)); // Send message to server
    } else {
      console.error('STOMP client is not connected.'); // Error handling if the client is disconnected
    }
  };

  return (
    <>
      <TopHeader /> {/* Top header component, optional for showing username or other info */}
      <WelcomeContainer>
        <h2>{(chatRoom.replace('-', ' ').toUpperCase())}</h2> {/* Display welcome message with username */}
      </WelcomeContainer>
      
      <div style={{ display: 'flex' }}>
        <Sidebar /> {/* Include the Sidebar component here */}
        <ChatContainer>
          <MessageList>
            {/* Loop through the messages array and render a ChatBubble for each message */}
            {messages.filter(msg => msg.destination == chatRoom).map((msg, index, filteredMessages) => {
              const prevMsg = filteredMessages[index - 1];
              // console.log("iteration");
              // console.log("prevmsg ", prevMsg);
              // Show sender and timestamp only if it's the first message or the sender is different from the previous one
              const showSender = !prevMsg || prevMsg.sender !== msg.sender;
              // console.log("showsender ", showSender);

              return (
                <ChatBubble
                  key={index}
                  message={msg.content}
                  sender={msg.sender}
                  timeStamp={msg.timeStamp}
                  isMine={username === msg.sender}
                  showSender={showSender} // Pass the showSender flag to ChatBubble
                />
              );
            })}
            {/* Dummy div to scroll to the bottom of the chat */}
            <div ref={chatEndRef} />
          </MessageList>
          {/* Chat input field for sending messages */}
          <ChatInput onSendMessage={handleSendMessage} />
        </ChatContainer>
      </div>
    </>
  );
};

export default ChatScreen;
