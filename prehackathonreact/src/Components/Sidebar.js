// src/Components/Sidebar.js
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; // Import Link for navigation

// Styled component for the Sidebar
const SidebarContainer = styled.div`
  width: 20%;
  height: 100vh; /* Full height of the viewport */
  position: fixed; /* Fixed position for the sidebar */
  top: 10%; /* Top margin */
  left: 0;
  background-color: #f8f9fa; /* Light background color */
  padding: 10px;
  /* box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); /* Optional shadow effect */
  display: flex;
  flex-direction: column; /* Stack links vertically */
`;

// Styled component for navigation links
const NavLink = styled(Link)`
  margin: 10px 0;
  text-decoration: none; /* Remove underline */
  color: #007bff; /* Link color */
  &:hover {
    text-decoration: underline; /* Underline on hover */
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <NavLink to="/chat1">Chat 1</NavLink>
      <NavLink to="/chat2">Chat 2</NavLink>
      <NavLink to="/chat3">Chat 3</NavLink>
      {/* Add more links as needed */}
    </SidebarContainer>
  );
};

export default Sidebar;
