import React, { createRef, useContext, useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { HomiContext } from "../../utils/context/Provider";

// modal
// import colors from "../../utils/styles/colors";
import { ModalContext } from "modal-kf-react/ModalProvider";

// validation
import { Validations } from "../../utils/validation/validation";

// user API
import API_USER from "../../utils/api/Users";

const Register: React.FC = () => {
  const { UpdateContext } = useContext(HomiContext);
  const { open } = useContext(ModalContext);
  const { DisplayModal } = useContext(ModalContext);
  const { darkTheme, userId, jwToken } = useContext(HomiContext);

  const [emailValid, setEmailValid] = useState(true);
  const [firstNameValid, setFirstNameValid] = useState(true);
  const [lastNameValid, setLastNameValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [formValid, setFormValid] = useState(false);

  const navigate = useNavigate();
  const refEmail = createRef<HTMLInputElement>();
  const refPassword = createRef<HTMLInputElement>();
  const refFirstname = createRef<HTMLInputElement>();
  const refLastName = createRef<HTMLInputElement>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmailValid(Validations.EmailValidation.test(value));
      console.log("STATUS DU FORM : ", formValid);
    }
    if (name === "firstName") {
      setFirstNameValid(Validations.FirstNameValidation.test(value));
    }
    if (name === "lastName") {
      setLastNameValid(Validations.LastNameValidation.test(value));
    }
    if (name === "password") {
      setPasswordValid(Validations.PasswordValidation.test(value));
    }
  };

  useEffect(() => {
    if (
      refFirstname.current.value &&
      refLastName.current.value &&
      refEmail.current.value &&
      refPassword.current.value
    ) {
      const isFormValid =
        emailValid && firstNameValid && lastNameValid && passwordValid;
      setFormValid(isFormValid);
    }
  }, [emailValid, firstNameValid, lastNameValid, passwordValid]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // if (isFormValid) {
    try {
      const firstName = refFirstname.current.value;
      const lastName = refLastName.current.value;
      const email = refEmail.current.value;
      const password = refPassword.current.value;
      // if (isFormValid) {
      const response = await API_USER.register({
        firstName,
        lastName,
        email,
        password,
      });
      if (response.success) {
        console.log(response);
        console.log(response.id);
        console.log(response.succes);
        UpdateContext({
          darkTheme: true,
          userId: response.id,
          jwToken: response.token,
        });

        console.log(darkTheme, userId, jwToken);
        DisplayModal({
          mode: "info",
          title: "Account created ! ",
          children: "You are now logged in",
          borderRadius: "0px",
          enableFadeIn: false,
          enableFadeOut: false,
          onClosed: () => {
            navigate("/");
          },
        });

        return;
      } else if (response.status === 409) {
        console.log("not connected for some reason ...", response);
        DisplayModal({
          mode: "error",
          title: "Error",
          children: "Email already exists",
          borderRadius: "0px",
          enableFadeIn: false,
          enableFadeOut: false,
        });
      } else {
        console.log("random error");
      }
      // } else {
      //   console.log(isFormValid);

      //   console.log("invalid email"); // --> DisplayModal (error)
      // }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <form
      className={open ? "login-form-hide" + " " + "login-form" : "login-form"}
    >
      <h2 className="login-title">Register</h2>

      <label htmlFor="firstName" className="login-label">
        First Name
      </label>
      <input
        ref={refFirstname}
        type="firstName"
        id="firstName"
        name="firstName"
        defaultValue=""
        onChange={handleChange}
        // className="login-input"
        className={
          !firstNameValid
            ? "login-input-error" + " " + "login-input"
            : "login-input"
        }
        autoComplete="plopo@gmail.com"
      />

      {!firstNameValid && <p className="error-message">Invalid First Name</p>}

      <label htmlFor="lastName" className="login-label">
        Last Name
      </label>
      <input
        ref={refLastName}
        type="lastName"
        id="lastName"
        name="lastName"
        defaultValue=""
        onChange={handleChange}
        className={
          !lastNameValid
            ? "login-input-error" + " " + "login-input"
            : "login-input"
        }
        autoComplete="plopo@gmail.com"
      />

      {!lastNameValid && <p className="error-message">Invalid Last Name</p>}

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
        className={
          !emailValid
            ? "login-input-error" + " " + "login-input"
            : "login-input"
        }
        autoComplete="plopo@gmail.com"
      />

      {!emailValid && <p className="error-message">Invalid Email Adress</p>}

      <label htmlFor="password" className="login-label">
        password
      </label>
      <input
        ref={refPassword}
        type="password"
        id="password"
        name="password"
        defaultValue=""
        onChange={handleChange}
        className={
          !passwordValid
            ? "login-input-error" + " " + "login-input"
            : "login-input"
        }
        autoComplete="plopo@gmail.com"
      />

      {!passwordValid && <p className="error-message">Invalid Password</p>}

      <div className="login-redirect">
        <NavLink to={"/auth/login"}>Already an account ?</NavLink>
      </div>

      <button
        type="submit"
        onClick={handleSubmit}
        className={
          !formValid
            ? "login-submit" + " " + "login-submit-disable"
            : "login-submit"
        }
        disabled={!formValid ? true : false}
      >
        Submit
      </button>
    </form>
  );
};

export default Register;
