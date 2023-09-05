import React from "react";

import Router from "./Router";

import { useEffect, useContext } from "react";
import { useCookies } from "react-cookie";
import { HomiContext } from "./utils/context/Provider";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies([
    "darkTheme",
    "userId",
    "jwToken",
  ]);
  const { darkTheme, userId, jwToken } = useContext(HomiContext);

  //TODO : à voir, je peux aussi simplement push dans le provider (le code est toujours commenter la bas), ou passer via localStorage ...
  useEffect(() => {
    if (darkTheme !== false && userId !== "" && jwToken !== "") {
      setCookie("darkTheme", darkTheme);
      setCookie("userId", userId);
      setCookie("jwToken", jwToken);
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
