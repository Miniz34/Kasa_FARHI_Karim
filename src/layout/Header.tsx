import * as React from "react";

import { Link } from "react-router-dom";
import "./Header.css";

import logo from "../assets/LOGO.svg";
import styled, { keyframes } from "styled-components";
import colors from "../utils/styles/colors";
import { useContext } from "react";

import { ModalContext } from "modal-kf-react/ModalProvider";

// export const StyledLink = styled(Link)`
//   padding: 10px 15px;
//   color: ${colors.primary};
//   text-decoration: none;
//   font-size: 18px;
//   text-align: center;
//   @media only screen and (max-width: 762px) {
//     font-size: 16px;
//     padding: 0 0;
//   }
//   &:hover {
//     text-decoration: underline;
//   }
// `;

// const Button = styled.button`
//   padding: 10px 15px;
//   color: ${colors.primary};
//   text-decoration: none;
//   font-size: 18px;
//   text-align: center;
//   border: none;
//   background-color: white;
//   cursor: pointer;
//   @media only screen and (max-width: 762px) {
//     font-size: 16px;
//     padding: 0 0;
//   }
//   &:hover {
//     text-decoration: underline;
//   }
// `;

// const MainLogo = styled.img`
//   @media only screen and (max-width: 762px) {
//     width: 150px;
//   }
// `;

// const HeaderContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   margin-top: 2%;
// `;

// const NavContainer = styled.nav`
// display: flex;
// flex-direction: rows;
// align-self: center;

// gap: 30px;
// text-decoration:
// color: ${colors.primary};
// @media only screen and (max-width: 762px) {
//   gap: 20px;
// }
// }
// `;

function Header() {
  const { open } = useContext(ModalContext);

  const storage = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    window.location.reload();
    return;
  };

  return (
    <div
      className={
        open
          ? "header-container" + " " + "header-container-hide"
          : "header-container"
      }
    >
      <Link to="/">
        <img src={logo} alt="logo principal" className="header-logo" />
      </Link>

      <nav className="nav-container">
        <Link to="/" className="header-link">
          Accueil
        </Link>
        <Link to="/about" className="header-link">
          A Propos
        </Link>
        <Link to="/CreateUser" className="header-link">
          test
        </Link>
        {storage && (
          <button className="header-button" onClick={logout}>
            Logout
          </button>
        )}{" "}
      </nav>
    </div>
  );
}

export default Header;
