import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./utils/styles/style.css";

import App from "./pages/App.jsx";
import Home from "./pages/Home";
import Error from "./pages/Error";
import About from "./pages/About";
import styled from "styled-components";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

const Wrapper = styled.div`
  max-width: 1440px;
  margin: 0 100px;
  background: #fff;
  @media only screen and (max-width: 1250px) {
    margin: 0 50px;
  }

  @media only screen and (max-width: 762px) {
    margin: 0 20px;
  }
`;

function Router() {
  return (
    <React.StrictMode>
      <BrowserRouter basename="/Kasa_FARHI_Karim">
        <Wrapper>
          <Header />
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/home/:id" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Error />} />
            {/* <Route path="/home/*" element={<Error />} /> */}
          </Routes>
          <Footer />
        </Wrapper>
      </BrowserRouter>
    </React.StrictMode>
  );
}
export default Router;
