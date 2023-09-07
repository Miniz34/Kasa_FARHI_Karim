import React, { createRef, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { HomiContext } from "../../utils/context/Provider";

// modal
// import colors from "../../utils/styles/colors";
// import { DisplayModalProps, ModalContext } from "modal-kf-react/ModalProvider";

// validation
import { Validations } from "../../utils/validation/validation";

// user API
import API_USER from "../../utils/api/Users";

const Login: React.FC = () => {
  const { UpdateContext } = useContext(HomiContext);
  // const { open } = useContext(ModalContext);
  // const { DisplayModal } = useContext(ModalContext);
  const open = false;
  const { darkTheme, userId, jwToken } = useContext(HomiContext);

  console.log(darkTheme, userId, jwToken);

  const navigate = useNavigate();
  const refEmail = createRef<HTMLInputElement>();
  const refPassword = createRef<HTMLInputElement>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    Validations.EmailValidation.test(refEmail.current.value);
    // if fail -> show error message
  };

  const validateForm = (email: string) => {
    const isEmailValid = Validations.EmailValidation.test(email);
    return isEmailValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // if (isFormValid) {
    try {
      const email = refEmail.current.value;
      const password = refPassword.current.value;
      const isFormValid = validateForm(email);
      if (isFormValid) {
        const response = await API_USER.login({
          email,
          password,
        });
        if (response.success) {
          UpdateContext({
            darkTheme: true,
            userId: response.id,
            jwToken: response.token,
          });

          console.log(darkTheme, userId, jwToken);

          navigate("/");
          // window.location.reload();
          return;
        } else {
          console.log("not connected for some reason ...", response);
        }
      } else {
        console.log("invalid email"); // --> DisplayModal (error)
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <form
      className={open ? "login-form-hide" + " " + "login-form" : "login-form"}
    >
      <h2 className="login-title">Connexion</h2>

      <label htmlFor="email" className="login-label">
        Email
      </label>
      <input
        ref={refEmail}
        type="email"
        id="email"
        name="email"
        defaultValue=""
        onChange={handleChange}
        className="login-input"
        autoComplete="plopo@gmail.com"
      />

      <label htmlFor="password" className="login-label">
        Password
      </label>
      <input
        ref={refPassword}
        type="password"
        id="password"
        name="password"
        defaultValue=""
        className="login-input"
        autoComplete="plopo"
      />

      {/* Retrieve password */}
      <div className="login-redirect">
        <NavLink to={"/auth/retrievepassword"}>Mot de passe oublié</NavLink>
        <NavLink to={"/auth/register"}>Créer un compte</NavLink>
      </div>

      <button type="submit" onClick={handleSubmit} className="login-submit">
        Submit
      </button>
    </form>
  );
};

export default Login;
