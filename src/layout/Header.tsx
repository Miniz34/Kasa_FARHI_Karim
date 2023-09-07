import * as React from "react";

import { Link } from "react-router-dom";
import "./Header.scss";

import logo from "../assets/LOGO.svg";
import styled, { keyframes } from "styled-components";
import colors from "../utils/styles/colors";
import { useContext } from "react";

import ModalProvider, { ModalContext } from "modal-kf-react/ModalProvider";
import { HomiContext } from "../utils/context/Provider";

function Header() {
  const { open } = useContext(ModalContext);
  const { DisplayModal } = useContext(ModalContext);

  const { darkTheme, userId, jwToken } = useContext(HomiContext);

  const storedUserId = localStorage.getItem("userId");
  const storedJwToken = localStorage.getItem("jwToken");

  //TODO : ne fonctionne pas soit sur la page profil, soit sur l'userId1
  const logout = () => {
    // localStorage.removeItem("token");
    // localStorage.removeItem("id");
    // window.location.reload();
    localStorage.removeItem("userId");
    localStorage.removeItem("jwToken");

    localStorage.removeItem("darkTheme");

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
      {/* <Link to="/">
        <img src={logo} alt="logo principal" className="header-logo" />
      </Link> */}

      <Link to="/" className="header-title">
        <h1 className="header-title-content">HOMI</h1>
      </Link>

      <div className="testing-cookies-and-shit">
        {userId !== "" ? <span>CONTEXT ON</span> : <span>CONTEXT OFF</span>}
        {storedUserId ? <span>COOKIE ON</span> : <span>COOKIE OFF</span>}
      </div>

      <nav className="nav-container">
        <Link to="/" className="header-link">
          Accueil
        </Link>
        <Link to="/about" className="header-link">
          A Propos
        </Link>

        {storedUserId ? (
          <>
            <Link to={`/profil/${storedUserId}`} className="header-link">
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
