import { useCookies } from "react-cookie";
import React, { createRef, useContext, useState } from "react";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import { Validations } from "../../../src/utils/validation/validation";

import USER_API from "../../utils/api/Users";
import { ModalContext } from "modal-kf-react/ModalProvider";
import "./ProfilUpdateAvatar.css";

interface ProfileUpdateAvatarProps {
  userId: number;
}

function ProfilUpdateAvatar({ userId }: ProfileUpdateAvatarProps) {
  const id = userId;
  const { DisplayModal } = useContext(ModalContext);
  const { open } = useContext(ModalContext);

  const [cookies] = useCookies(["darkTheme", "userId", "jwToken"]);
  const jwTokenCookie = cookies.jwToken;

  const [errorAvatar, setErrorAvatar] = useState(false);
  const [filePreview, setFilePreview] = useState(null);
  const [urlPreview, setUrlPreview] = useState(null);

  const refAvatar = createRef<HTMLInputElement>();
  const refAvatarUrl = createRef<HTMLInputElement>();

  // const multer = async (e) => {
  //   e.preventDefault();
  //   const avatarFile = refAvatar.current.files[0];

  //   // if (userIdCookie === user_Id) {
  //   const formData = new FormData();
  //   console.log(avatarFile);
  //   if (avatarFile) {
  //     formData.append("inputFile", avatarFile);

  //     console.log("refAvatar:", refAvatar);
  //     console.log("avatarFile:", avatarFile);

  //       console.log("formData:", formData);

  //       const response = await USER_API.testMulter({
  //         userId: user_Id,
  //         formData,
  //         jwToken: jwTokenCookie,
  //       });
  //       console.log(response);

  //       if (response.success) {
  //         console.log(response);
  //         console.log(formData);
  //       }
  //   }

  //   // }
  // };

  const handleFileChange = (e) => {
    setErrorAvatar(false);
    const file = e.target.files[0];

    if (file) {
      // Read the selected file and set it as a data URL
      const reader = new FileReader();
      reader.onload = (event) => {
        setFilePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  //TODO : valider ici ? ça me parait très chiant
  // const handleInputChange = (e) => {
  //   const urlValue = e.target.value;
  //   if (urlValue) {
  //     setInputChange(false);
  //   } else {
  //     setInputChange(true);
  //   }
  //   console.log(inputChange);
  // };

  const handleInputChange = (e) => {
    const urlValue = e.target.value;
    setUrlPreview(urlValue);
  };

  const multer = async (e, avatar) => {
    e.preventDefault();

    const formData = new FormData();

    if (avatar instanceof File) {
      formData.append("inputFile", avatar);
    } else if (typeof avatar === "string" && e.target.isUrl.value === "true") {
      formData.append("avatarUrl", avatar);
    } else if (!avatar) {
      setErrorAvatar(true);
    }

    const response = await USER_API.testMulter({
      userId: id,
      formData,
      jwToken: jwTokenCookie,
    });
    console.log(response);

    if (response.success) {
      DisplayModal({
        mode: "info",
        title: "Avatar modified ! ",
        children: "The avatar has been changed",
        onClosed: () => {
          window.location.reload();
        },
      });
    } else {
      DisplayModal({
        mode: "error",
        title: "Error",
        children:
          "Unable to update the avatar for some reason, i can't help you guy",
      });
    }

    // }
  };

  return (
    <>
      <div className="avatar-form">
        <img
          src={filePreview}
          className={filePreview !== null ? "preview-img" : "previw-img-hidden"}
        />
        <form
          encType="multipart/form-data"
          onSubmit={(e) =>
            multer(e, (e.target as HTMLFormElement).inputFile.files[0])
          }
        >
          <input
            type="file"
            name="inputFile"
            ref={refAvatar}
            onChange={handleFileChange}
          />
          <input type="submit" />
        </form>
        <div
          className={
            errorAvatar ? "avatar-form-error" : "avatar-form-error-hide"
          }
        >
          please select a file
        </div>
        <span>or add directly an URL</span>
        <img
          src={urlPreview}
          className={urlPreview !== null ? "preview-img" : "previw-img-hidden"}
        />{" "}
        <form
          encType="multipart/form-data"
          onSubmit={(e) => multer(e, refAvatarUrl.current.value)}
          onChange={handleInputChange}
        >
          <input type="text" name="avatarUrl" ref={refAvatarUrl} />
          <input type="hidden" name="isUrl" value="true" />
          <input type="submit" />
        </form>
      </div>
    </>
  );
}

export default ProfilUpdateAvatar;
