import LoginForm from "../layout/connexion/Login";
import { useContext } from "react";
import { HomiContext } from "../utils/context/Provider";

function Login() {
  return <LoginForm />;
}

export default Login;

// const { darkTheme, jwToken, userId } = useContext(HomiContext);
//   console.log(darkTheme, jwToken, userId);
