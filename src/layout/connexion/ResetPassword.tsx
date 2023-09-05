import React, { createRef, useContext } from "react";
import USER_API from "../../utils/api/Users";
import { Validations } from "../../utils/validation/validation";

import { useNavigate, useParams } from "react-router-dom";
import { ModalContext } from "modal-kf-react/ModalProvider";

const currentLocation = window.location.href;
const urlParts = currentLocation.split("/");
const id = urlParts[urlParts.length - 1];

function RetrievePassword() {
  const { DisplayModal } = useContext(ModalContext);
  const refPassword = createRef<HTMLInputElement>();
  const refRepeatPassword = createRef<HTMLInputElement>();
  const navigate = useNavigate();

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   Validations.EmailValidation.test(refEmail.current.value);
  // };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //TODO: validation, modale, virer erreurs (aussi dans l'API, et dans le back (virer post not found 404))
    const password = refPassword.current.value;
    const repeatPassword = refRepeatPassword.current.value;

    if (password === repeatPassword) {
      try {
        const response = await USER_API.resetPassword({
          password,
          repeatPassword,
          token: id,
        });
        if (response.success) {
          console.log(response);
          DisplayModal({
            title: "Mot de passe modifié",
            mode: "info",
            children: "Votre mot de passe a été modifié",
            enableFadeIn: false,
            enableFadeOut: false,
            borderRadius: "0px",
            onClosed: () => {
              navigate("/auth/login");
            },
          });
        } else {
          console.log("respose différent à success avec 2 s");
        }

        //TODO : validate
      } catch (error) {
        console.log(password, repeatPassword);
        console.log(error);
      }
    } else {
      DisplayModal({
        title: "Error",
        mode: "error",
        children: "Your passwords do not match",
        enableFadeIn: false,
        enableFadeOut: false,
        borderRadius: "0px",
      });
    }
  };

  return (
    <>
      <form className="login-form">
        <h2 className="login-title">New Password</h2>

        <label htmlFor="password" className="login-label">
          Password
        </label>
        <input
          ref={refPassword}
          type="password"
          id="password"
          name="password"
          defaultValue=""
          // onChange={handleChange}
          className="login-input"
        />
        <label htmlFor="repeatPassword" className="login-label">
          Repeat Password
        </label>
        <input
          ref={refRepeatPassword}
          type="password"
          id="repeatPassword"
          name="repeatPassword"
          defaultValue=""
          // onChange={handleChange}
          className="login-input"
        />
        <button type="submit" onClick={handleSubmit} className="login-submit">
          Submit
        </button>
      </form>
    </>
  );
}

export default RetrievePassword;
