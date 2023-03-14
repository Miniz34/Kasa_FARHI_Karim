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
  @media only screen and (max-width: 762px) {
    font-size: 16px;
    padding: 0 0;
  }
  &:hover {
    text-decoration: underline;
  }
`;

const MainLogo = styled.img`
  @media only screen and (max-width: 762px) {
    width: 150px;
  }
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

gap: 30px;
text-decoration:
color: ${colors.primary};
@media only screen and (max-width: 762px) {
  gap: 20px;
 
}
}

`;

function Header() {
  return (
    <HeaderContainer>
      <Link to="/">
        <MainLogo src={logo} alt="logo principal" />
      </Link>

      <NavContainer>
        <StyledLink to="/">Accueil</StyledLink>
        <StyledLink to="/about">A Propos</StyledLink>
      </NavContainer>
    </HeaderContainer>
  );
}

export default Header;
