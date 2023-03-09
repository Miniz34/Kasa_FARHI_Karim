import * as React from "react";

import { Link } from "react-router-dom";

import logo from "../assets/LOGO.svg";
import styled, { keyframes } from "styled-components";
import colors from "../utils/styles/colors";

export const StyledLink = styled(Link)`
  padding: 10px 15px;
  color: ${colors.primary};
  text-decoration: none;
  font-size: 18px;
  text-align: center;
  ${(props) =>
    props.$isFullLink &&
    `color: white; 
    border-radius: 30px; 
    background-color: ${colors.primary};`}
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: rows;
  justify-content: space-between;
  margin-top: 2%;
`;

const NavContainer = styled.nav`
display: flex;
flex-direction: rows;
align-self: center;
margin-right : 25px;
gap: 30px;
text-decoration:
color: ${colors.primary};
`;

function Header() {
  return (
    <HeaderContainer>
      <Link to="/">
        <img src={logo} alt="logo principal" />
      </Link>

      <NavContainer>
        <StyledLink to="/">Accueil</StyledLink>
        <StyledLink to="/about">A Propos</StyledLink>
      </NavContainer>
    </HeaderContainer>
  );
}

export default Header;
