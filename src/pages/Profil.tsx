import { useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import Error from "./Error";
import { useFetch } from "../utils/hooks/Fetch";
import USER_API from "../utils/api/Users";
import ProfileCard from "../components/ProfilCard/ProfilCard";
import ProfileHouseCard from "../components/ProfileHouseCard/ProfileHouseCard";

const Profil: React.FC = () => {
  const { id } = useParams();
  const userId = parseInt(id, 10);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    userId: "",
    avatar:
      "https://pro.destination-vendeegrandlittoral.com/wp-content/uploads/sites/2/2019/09/avatar.jpg",
    email: "",
    houseData: [],
  });

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
            houseData: response.user.houseData,
          });
          console.log(user);
        } else {
          console.log("not connected for some reason ...", response);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
    getUser();
  }, [userId]);

  console.log(user);

  //TODO : finir display des houses
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

        {user.houseData.map((house, index) => (
          <ProfileHouseCard
            key={index}
            id={house.houseId}
            title={house.title}
            description={house.description}
            picture={house.firstPicture}
          />
        ))}

        {/* 
        <div className="house-wrapper">
          {user.houseData.map((house, index) => (
            <div key={index}>
              <p>House title: {house.title}</p>
              <p>House description: {house.description}</p>
            </div>
          ))}
        </div> */}
      </>
    </>
  );
};

export default Profil;
