// TopHeader.js
import React from 'react';
import styled from 'styled-components';

// Styled component for the header
const Header = styled.header`
  background-color: #333;  // Dark background color
  color: white;             // White text color
  padding: 10px;           // Padding for the header
  display: flex;           // Flexbox for layout
  align-items: center;     // Center items vertically
  justify-content: flex-start; // Align items to the start
  position: sticky;        // Sticky positioning
  top: 0;                  // Sticks to the top
  width: 100%;             // Full width
  z-index: 1000;          // Ensure it stays above other content
`;

// Title styling
const Title = styled.h1`
  margin: 0;              // Remove default margin
  font-size: 24px;       // Font size
`;

// Actual Title of Webpage
const TopHeader = () => {
  return (
    <Header>
      <Title>Argument</Title>
    </Header>
  );
};

export default TopHeader;  // Export the component
