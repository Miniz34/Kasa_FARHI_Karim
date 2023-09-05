import React, { createRef, useContext } from "react";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import { Validations } from "../../../src/utils/validation/validation";
import { useCookies } from "react-cookie";

import USER_API from "../../utils/api/Users";
import { ModalContext } from "modal-kf-react/ModalProvider";
import "./ProfileUpdateForm.css";

interface ProfileUpdateFormProps {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
}

function ProfileUpdateForm({
  userId,
  email,
  firstName,
  lastName,
}: ProfileUpdateFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    Validations.EmailValidation.test(refEmail.current.value);
    // if fail -> show error message
  };

  const [cookies] = useCookies(["darkTheme", "userId", "jwToken"]);

  const userIdCookie = cookies.userId;
  const jwTokenCookie = cookies.jwToken;
  const id = userId;
  const { open } = useContext(ModalContext);
  const { DisplayModal } = useContext(ModalContext);

  const refEmail = createRef<HTMLInputElement>();
  const refFirstName = createRef<HTMLInputElement>();
  const refLastName = createRef<HTMLInputElement>();
  const refAvatar = createRef<HTMLInputElement>();

  const updateUser = async (e) => {
    e.preventDefault();

    const email = refEmail.current.value;
    const firstName = refFirstName.current.value;
    const lastName = refLastName.current.value;
    const response = await USER_API.updateUser({
      userId: id,
      email: email,
      firstName: firstName,
      lastName: lastName,
      jwToken: jwTokenCookie,
    });
    //TODO : response toujours success, faire validations, conditions dans l'api et le backend
    if (response.success) {
      if (response.code === 200) {
        console.log(response);
        DisplayModal({
          mode: "info",
          children: "Compte modifié",
          onClosed: () => {
            console.log("closed");
            window.location.reload();
          },
        });
      } else if (response.code === 403) {
        //Unreachable code
        console.log(response);
      }
    } else {
      alert("veuillez remplir tous les champs");
    }
  };

  return (
    <>
      <form className={"profile-update-form"} onSubmit={updateUser}>
        <h2 className="profile-update-title ">Mise à jour des informations</h2>

        <label htmlFor="email" className="login-label">
          Email
        </label>
        <input
          ref={refEmail}
          type="email"
          id="email"
          name="email"
          defaultValue={email}
          onChange={handleChange}
          className="login-input"
          autoComplete="plopo@gmail.com"
        />

        <label htmlFor="firstName" className="login-label">
          firstName
        </label>
        <input
          ref={refFirstName}
          type="firstName"
          id="firstName"
          name="firstName"
          defaultValue={firstName}
          className="login-input"
          autoComplete="plopo"
        />

        <label htmlFor="lastName" className="login-label">
          lastName
        </label>
        <input
          ref={refLastName}
          type="lastName"
          id="lastName"
          name="lastName"
          defaultValue={lastName}
          className="login-input"
          autoComplete="plopo"
        />

        <button type="submit" className="login-submit">
          Submit
        </button>
      </form>
    </>
  );
}

export default ProfileUpdateForm;
