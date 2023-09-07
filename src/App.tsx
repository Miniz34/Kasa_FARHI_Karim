import React from "react";

import Router from "./Router";

import { useEffect, useContext } from "react";
import { HomiContext } from "./utils/context/Provider";

function App() {
  const { darkTheme, userId, jwToken } = useContext(HomiContext);

  //TODO : à voir, je peux aussi simplement push dans le provider (le code est toujours commenter la bas), ou passer via localStorage ...
  useEffect(() => {
    if (darkTheme !== false && userId !== "" && jwToken !== "") {
      localStorage.setItem("darkTheme", darkTheme.toString());
      localStorage.setItem("userId", userId);
      localStorage.setItem("jwToken", jwToken);
    }
  }, [darkTheme, userId, jwToken]);

  // useEffect(() => {
  //   setCookie();
  // }, []);

  return <Router />;
}
export default App;
