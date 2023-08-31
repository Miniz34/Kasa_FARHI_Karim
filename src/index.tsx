import React from "react";
import ReactDOM from "react-dom/client";
import "./utils/styles/style.css";

import Router from "./Router";
import ModalProvider from "modal-kf-react/ModalProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ModalProvider>
      <Router />
    </ModalProvider>
  </React.StrictMode>
);
