import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import App from "./App";

function AppWithNavigation() {
  const navigate = useNavigate();

  const storage = localStorage.getItem("token");

  useEffect(() => {
    if (!storage) {
      navigate("/login");
    }
  }, [storage, navigate]);

  return <App />;
}

export default AppWithNavigation;
