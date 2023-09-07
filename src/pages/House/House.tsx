import { useParams } from "react-router-dom";
import styled from "styled-components";
import "./House.css";

import { useFetch } from "../../utils/hooks/Fetch";

import Gallery from "../../components/Gallery";
import Description from "../../components/Description";
import colors from "../../utils/styles/colors";
import Rating from "../../components/Rating";
import Tags from "../../components/Tags";
import Error from "./../Error";
import Loading from "../../components/Loading";
import RatingProps from "../../components/Rating";
import { useEffect, useState } from "react";
import USER_API from "../../utils/api/Users";
import HOUSE_API from "../../utils/api/House";

interface HouseData {
  title: string;
  description: string;
  location: string;
  equipments: string[];
  pictures: string[];
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
}

function House() {
  const getId = useParams();
  const homeId = getId.id;
  console.log(getId);

  const [data, setData] = useState<HouseData>({
    title: "",
    description: "",
    location: "",
    equipments: [],
    pictures: [],
    firstName: "",
    lastName: "",
    email: "",
    avatar: "",
  });

  useEffect(() => {
    const getHouse = async () => {
      console.log("in function");
      try {
        const response = await HOUSE_API.findOne({ id: homeId });
        if (response.success) {
          setData({
            title: response.data.title,
            description: response.data.description,
            location: response.data.location,
            equipments: response.data.equipments,
            pictures: response.data.pictures,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.email,
            avatar: response.data.avatar,
          });
        } else {
          console.log("not connected for some reason ...", response);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getHouse();
  }, []);

  console.log("DATA HERE  :", data);

  console.log("DATA EQUIPMENTRS HERE  :", data.equipments);

  return (
    <div>
      {" "}
      {data && (
        <>
          <Gallery img={data.pictures} id={homeId} />
          <div className="content-container">
            <div className="location-container">
              <h1>{data.title}</h1>
              <h2>{data.location}</h2>
              {/* <Tags tags={findHouse.tags} /> */}
            </div>
            <div className="renter-container">
              <div className="renter-data">
                <span className="renter-text">
                  {data.firstName} {data.lastName}
                </span>
                <img src={`${data.avatar}`} alt="host" className="renter-img" />
              </div>
              {/* <Rating rating={data.rating}></Rating> */}
            </div>
          </div>
          <div className="description-container">
            <Description
              description={data.description}
              title="Description"
              content={data.description}
            />

            <Description
              equipments={data.equipments}
              title="Equipments"
              content={data.equipments}
            />
          </div>
        </>
      )}{" "}
    </div>
  );
}

export default House;
