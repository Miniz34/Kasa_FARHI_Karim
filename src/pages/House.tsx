import { useParams } from "react-router-dom";
import styled from "styled-components";

import { useFetch } from "../utils/hooks/Fetch";

import Gallery from "../components/Gallery";
import Description from "../components/Description";
import colors from "../utils/styles/colors";
import Rating from "../components/Rating";
import Tags from "../components/Tags";
import Error from "./Error";
import Loading from "../components/Loading";
import RatingProps from "../components/Rating";
import { useEffect, useState } from "react";
import USER_API from "../utils/api/Users";
import HOUSE_API from "../utils/api/House";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: rows;
  margin-top: 20px;
  color: ${colors.primary};
  @media only screen and (max-width: 740px) {
    flex-direction: column;
    align-items: center;
  }
`;
const LocationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 100%;
`;

const RenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 740px) {
    flex-direction: row-reverse;
    width: 100%;
    justify-content: space-around;

`;

const RenterData = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-end;
  width: 200px;
  height: 64px;
  @media only screen and (max-width: 740px) {
    flex-direction: row;
    width: 100%;
    justify-content: flex-end;
    margin-top: 30px;
`;

const RenterText = styled.span`
  display: inline;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 25px;
  margin-top: 8px;
  width: 90px;
  margin-right: 10px;
  text-align: end;
  @media only screen and (max-width: 740px) {
    font-size: 14px;
    text-align: end;
    min-width: 90px;

`;

const RenterImg = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  @media only screen and (max-width: 740px) {
    width: 46px;
    height: 46px;
  }
`;

const DescriptionContainer = styled.div`
  display: flex;
  gap: 25px;
  @media only screen and (max-width: 740px) {
    flex-direction: column;
    margin-top: 20px
`;

function House() {
  const getId = useParams();
  const homeId = getId.id;
  console.log(getId);
  // const { data, isLoading } = useFetch(
  //   process.env.REACT_APP_API_URL_DEV + "/house/getall"
  // );

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    userId: "",
    avatar:
      "https://pro.destination-vendeegrandlittoral.com/wp-content/uploads/sites/2/2019/09/avatar.jpg",
    email: "",
  });

  // const findHouse = data.find((i) => i.houseId === parseInt(homeId));

  useEffect(() => {
    const getHouse = async () => {
      try {
        const response = await HOUSE_API.findOne({ id: homeId });
        if (response.success) {
          console.log(response);
        } else {
          console.log("help ", response);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
    getHouse();
  }, [homeId]);

  // useEffect(() => {
  //   const findHouse = data.find((i) => i.houseId === parseInt(homeId));
  //   if (findHouse && user.userId !== findHouse.userId) {
  //     USER_API.getOneUser({
  //       userId: findHouse.userId,
  //     })
  //       .then((response) => {
  //         console.log("respônse here : ", response);
  //         console.log("data here", data);
  //         if (response.success) {
  //           setUser({
  //             firstName: response.user.firstName,
  //             lastName: response.user.lastName,
  //             userId: response.user.userId,
  //             avatar: response.user.avatar,
  //             email: response.user.email,
  //           });
  //         } else {
  //           console.log("not connected for some reason ...", response);
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }, [data, homeId, user]);

  // USER_API.getOneUser({
  //   userId: findHouse.userId,
  // }).then((response) => {
  //   if (response.success) {
  //     console.log(response);
  //     setUser({
  //       firstName: response.user.firstName,
  //       lastName: response.user.lastName,
  //       userId: response.user.userId,
  //       avatar: response.user.avatar,
  //       email: response.user.email,
  //     });
  //   } else {
  //     console.log("not connected for some reason ...", response);
  //   }
  // });

  // if (isLoading) {
  //   return <Loading />;
  // }

  // if (!findHouse) {
  //   return <Error />;
  // }

  return (
    <div>
      {/* <Gallery img={findHouse.pictures} id={homeId} />
      <ContentContainer>
        <LocationContainer>
          <h1>{findHouse.title}</h1>
          <h2>{findHouse.location}</h2>
          <Tags tags={findHouse.tags} />
        </LocationContainer>
        <RenterContainer>
          <RenterData>
            <RenterText>{findHouse.host.name}</RenterText>
            <RenterImg src={`${findHouse.host.picture}`} alt="host" />
          </RenterData>
          <Rating rating={findHouse.rating}></Rating>
        </RenterContainer>
      </ContentContainer>
      <DescriptionContainer>
        <Description
          description={findHouse.description}
          title="Description"
          content={findHouse.description}
        />
        <Description
          equipments={findHouse.equipments}
          title="Equipments"
          content={findHouse.equipments}
        />
      </DescriptionContainer> */}
    </div>
  );
}

export default House;
