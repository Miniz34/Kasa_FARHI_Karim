import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./utils/styles/style.css";

import App from "./pages/App.jsx";
import Home from "./pages/Home";
import Error from "./pages/Error";
import About from "./pages/About";

import Header from "./layout/Header";
import Footer from "./layout/Footer";

function Router() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        {/* TODO : creer bannière pour "/" et page about */}
        <Header />
        <Routes>
          <Route path="/home/:id" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/" element={<App />} />
          <Route path="*" element={<Error />} />
          {/* TODO: Ajouter les erreurs sur /home/randomid */}
          <Route path="/home/*" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default Router;
