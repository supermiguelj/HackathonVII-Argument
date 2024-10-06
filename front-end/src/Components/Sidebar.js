import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; // Import Link for navigation

// Styled component for the Sidebar
const SidebarContainer = styled.div`
  width: 20%;
  height: 100%; /* Full height of the viewport */
  position: fixed; /* Fixed position for the sidebar */
  top: 0; /* Align to the top */
  left: 0;
  background-color: #EEEEEE; /* Light background color */
  padding: 10px;
  display: flex;
  flex-direction: column; /* Stack divs vertically */
  justify-content: space-between; /* Evenly space the sections */
`;

// Styled component for navigation links
const NavLink = styled(Link)`
  font-family: "Verdana";
  margin: 10px 0;
  padding: 10%;
  text-decoration: none; /* Remove underline */
  color: #007bff; /* Link color */
  font-size: 18px;
  &:hover {
    background-color: #CCCCCC; /* Light background for divs */
    /*text-decoration: underline; /* Underline on hover */
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <NavLink> </NavLink>
      <NavLink to="/LoginScreen.js">General</NavLink>
      <NavLink to="/chat2">Economics</NavLink>
      <NavLink to="/chat3">Climate change</NavLink>
      <NavLink to="/chat3">Big or small gov</NavLink>
      <NavLink to="/chat3">Capital punishment</NavLink>
      <NavLink to="/chat3">Assisted euthanasia</NavLink>
      <NavLink> </NavLink>
    </SidebarContainer>
  );
};

export default Sidebar;