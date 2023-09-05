import React, { createRef, useContext } from "react";
import USER_API from "../../utils/api/Users";
import { Validations } from "../../utils/validation/validation";
import { ModalContext } from "modal-kf-react/ModalProvider";

function RetrievePassword() {
  const refEmail = createRef<HTMLInputElement>();
  const { DisplayModal } = useContext(ModalContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    Validations.EmailValidation.test(refEmail.current.value);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const testEmail = Validations.EmailValidation.test(refEmail.current.value);
    const email = refEmail.current.value;
    let emailToSend = "";

    //TODO: validation, modale, virer erreurs (aussi dans l'API, et dans le back (virer post not found 404))
    if (!testEmail) {
      DisplayModal({
        title: "Error",
        mode: "error",
        children: "Please enter an email at the format xxxx@xxx.xx",
        enableFadeIn: false,
        enableFadeOut: false,
        borderRadius: "0px",
      });
    } else {
      emailToSend = email;
    }

    try {
      const response = await USER_API.retrievePassword({ email: emailToSend });
      if (response.success) {
        DisplayModal({
          mode: "info",
          children: "Un email a été envoyé à l'adresse indiquée",
        });
        console.log(response);
      } else {
        console.log(
          "erreur à cacher faut faire genre oui j'ai envoyé le mail nanana"
        );
      }

      //TODO : validate
    } catch (error) {
      console.log(error);
      console.log("indiquez un email valide");
    }

    // const validateForm = (
    //   email: string,
    //   firstName: string,
    //   lastName: string,
    //   password: string
    // ) => {
    //   const isEmailValid = Validations.EmailValidation.test(email);
    //   const isFirstNameValid = Validations.FirstNameValidation.test(firstName);
    //   const isLastNameValid = Validations.LastNameValidation.test(lastName);
    //   const isPasswordValid = Validations.PasswordValidation.test(password);

    //   if (
    //     isEmailValid &&
    //     isFirstNameValid &&
    //     isLastNameValid &&
    //     isPasswordValid
    //   ) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // };

    return null;
  };

  return (
    <>
      <form className="login-form">
        <h2 className="login-title">Retrieve Password</h2>

        <label htmlFor="email" className="login-label">
          Email
        </label>
        <input
          ref={refEmail}
          type="text"
          id="email"
          name="email"
          defaultValue=""
          onChange={handleChange}
          className="login-input"
        />
        <button type="submit" onClick={handleSubmit} className="login-submit">
          Envoyer
        </button>
      </form>
    </>
  );
}

export default RetrievePassword;
