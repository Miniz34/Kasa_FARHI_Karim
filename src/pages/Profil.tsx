import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import React, { useContext, useEffect, useState } from "react";
import Error from "./Error";
import { useFetch } from "../utils/hooks/Fetch";
import USER_API from "../utils/api/Users";
import ProfileCard from "../components/ProfilCard/ProfilCard";

const Profil: React.FC = () => {
  const { id } = useParams();
  const userId = parseInt(id, 10);

  const [cookies] = useCookies(["darkTheme", "userId", "jwToken"]);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    userId: "",
    avatar:
      "https://pro.destination-vendeegrandlittoral.com/wp-content/uploads/sites/2/2019/09/avatar.jpg",
    email: "",
  });

  const userIdCookie = cookies.userId;

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await USER_API.getOneUser({ userId: userId });
        if (response.success) {
          setUser({
            firstName: response.user.firstName,
            lastName: response.user.lastName,
            userId: response.user.userId,
            avatar: response.user.avatar,
            email: response.user.email,
          });
        } else {
          console.log("not connected for some reason ...", response);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
    getUser();
  }, [userId]);

  return (
    <>
      <>
        <ProfileCard
          email={user.email}
          firstName={user.firstName}
          lastName={user.lastName}
          userId={user.userId}
          avatar={user.avatar}
        />
      </>
    </>
  );
};

export default Profil;
