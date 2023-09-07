import "./ProfilCard.css";
import React, { createRef, useContext, useState } from "react";
import USER_API from "../../utils/api/Users";
import { useParams } from "react-router-dom";

import { ModalContext } from "modal-kf-react/ModalProvider";
import ProfileUpdateForm from "../ProfilUpdateForm/ProfilUpdateForm";

import ProfilUpdateAvatar from "../ProfilUpdateAvatar/ProfilUpdateAvatar";

interface ProfileCardProps {
  firstName: string;
  lastName: string;
  avatar: string;
  userId: number | string;
  email?: string;
}

function ProfileCard({
  firstName,
  lastName,
  avatar,
  userId,
  email,
}: ProfileCardProps) {
  const { id } = useParams();
  const user_Id = parseInt(id, 10);
  const storedId = parseInt(localStorage.getItem("userId"));
  console.log(user_Id, storedId);
  const { DisplayModal } = useContext(ModalContext);
  const { open } = useContext(ModalContext);

  const showModal = () => {
    DisplayModal({
      mode: "custom",
      children: (
        <ProfileUpdateForm
          userId={user_Id}
          firstName={firstName}
          lastName={lastName}
          email={email}
        />
      ),

      onClosed: () => {
        window.location.reload();
      },
    });
  };

  const displayAvatarForm = () => {
    DisplayModal({
      mode: "custom",
      children: <ProfilUpdateAvatar userId={user_Id} />,
    });
  };

  return (
    <>
      <div
        className={
          open ? "profil-page-hide" + " " + "profil-page" : "profil-page"
        }
      >
        <div className="profil-wrapper">
          <div className="avatar-wrapper">
            <img src={`${avatar}`} className="avatar" alt="user avatar" />
          </div>
          <button onClick={displayAvatarForm}>change avatar</button>
          <div className="profil-content">
            <h1>User Profile</h1>
            <p>First Name: {firstName}</p>
            <p>Last Name: {lastName}</p>
            <p>Email: {email}</p>
          </div>
          {user_Id === storedId ? (
            <button onClick={showModal}>Update Profile</button>
          ) : null}
        </div>
        {/* <div className="house-wrapper">
          <p>First House :House name this is a house youhou description</p>
          <p>Second house :House name this is a house youhou description</p>
          <p>Third house :House name this is a house youhou description</p>
        </div> */}
      </div>
    </>
  );
}

export default ProfileCard;
