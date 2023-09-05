import * as React from "react";

import { Link } from "react-router-dom";
import "./Header.css";

import logo from "../assets/LOGO.svg";
import styled, { keyframes } from "styled-components";
import colors from "../utils/styles/colors";
import { useContext } from "react";

import ModalProvider, { ModalContext } from "modal-kf-react/ModalProvider";
import { useCookies } from "react-cookie";
import { HomiContext } from "../utils/context/Provider";

function Header() {
  const { open } = useContext(ModalContext);
  const { DisplayModal } = useContext(ModalContext);

  const { darkTheme, userId, jwToken } = useContext(HomiContext);

  const [cookies, setCookie, removeCookie] = useCookies([
    "darkTheme",
    "userId",
    "jwToken",
  ]);

  const storage = localStorage.getItem("token");
  const tokenCookie = cookies.jwToken;
  const userIdCookie = cookies.userId;

  //TODO : ne fonctionne pas soit sur la page profil, soit sur l'userId1
  const logout = () => {
    // localStorage.removeItem("token");
    // localStorage.removeItem("id");
    // window.location.reload();
    removeCookie("darkTheme");
    removeCookie("jwToken");
    removeCookie("userId");

    DisplayModal({
      backgroundColor: "red",
      children: "Déconnecté",
      // onClosed: () => window.location.reload(),
    });

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

      <div className="testing-cookies-and-shit">
        {userId !== "" ? <span>CONTEXT ON</span> : <span>CONTEXT OFF</span>}
        {userIdCookie ? <span>COOKIE ON</span> : <span>COOKIE OFF</span>}
      </div>

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
        {userIdCookie ? (
          <>
            <Link to={`/profil/${userIdCookie}`} className="header-link">
              Profil
            </Link>
            <button className="header-button" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/auth/login" className="header-link">
            Login
          </Link>
        )}
      </nav>
    </div>
  );
}

export default Header;
