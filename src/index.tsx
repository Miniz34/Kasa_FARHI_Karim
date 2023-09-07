import React from "react";
import ReactDOM from "react-dom/client";
import "./utils/styles/style.css";

import Router from "./Router";
import ModalProvider from "modal-kf-react/ModalProvider";
import HomiProvider from "./utils/context/Provider";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <HomiProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </HomiProvider>
  </React.StrictMode>
);
