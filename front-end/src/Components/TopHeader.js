import React from 'react'; 
import styled from 'styled-components';
import logo from '../images/argue.png';  // Import the argue.png image from the public folder

// Styled component for the header
const Header = styled.header`
  background-color: #333;  // Dark background color
  color: white;            // White text color
  padding: 2%;             // Padding for the header
  display: flex;           // Flexbox for layout
  align-items: center;     // Center items vertically
  justify-content: flex-start;  // Align items to the start (left side)
  position: sticky;        // Sticky positioning to keep the header fixed at the top
  top: 0;                  // Stick to the top of the page
  width: 96%;              // Take up most of the page width
  z-index: 1000;           // Make sure the header stays above other content
`;

// Styled component for the logo image
const Logo = styled.img`
  width: 40px;            // Set a fixed width for the logo
  height: auto;           // Maintain the aspect ratio
  margin-right: 10px;     // Space between the logo and the title
`;

// Title styling
const Title = styled.h1`
  margin: 0;              // Remove default margin
  font-size: 24px;        // Set the font size
`;

// The TopHeader component with logo and title
const TopHeader = () => {
  return (
    <Header>
      {/* Display the logo image */}
      <Logo src={logo} alt="Argument Logo" /> 
      
      {/* Display the title of the webpage */}
      <Title>Argument</Title>
    </Header>
  );
};

export default TopHeader;  // Export the component for use in other parts of the app