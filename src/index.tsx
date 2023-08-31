import React from "react";
import ReactDOM from "react-dom/client";
import "./utils/styles/style.css";

import Router from "./Router";
import ModalProvider from "modal-kf-react/ModalProvider";
import { CookiesProvider } from "react-cookie";
import HomiProvider from "./utils/context/Provider";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <CookiesProvider>
      <HomiProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </HomiProvider>
    </CookiesProvider>
  </React.StrictMode>
);
