import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import "./utils/styles/style.css";

import App from "./pages/App.jsx";
import Home from "./pages/Home";
import Error from "./pages/Error";
import About from "./pages/About";

import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Advert from "./components/Advert";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/home/:id" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<App />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
