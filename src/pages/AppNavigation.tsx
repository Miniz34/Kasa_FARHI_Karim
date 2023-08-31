import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Home from "./Home";

function AppWithNavigation() {
  const navigate = useNavigate();

  const storage = localStorage.getItem("token");

  useEffect(() => {
    if (!storage) {
      navigate("/login");
    }
  }, [storage, navigate]);

  return <Home />;
}

export default AppWithNavigation;
