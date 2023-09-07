// import { useParams } from "react-router-dom";
// import styled from "styled-components";

// import { useFetch } from "../utils/hooks/Fetch";

// import Gallery from "../components/Gallery";
// import Description from "../components/Description";
// import colors from "../utils/styles/colors";
// import Rating from "../components/Rating";
// import Tags from "../components/Tags";
// import Error from "./Error";
// import Loading from "../components/Loading";
// import RatingProps from "../components/Rating";
// import { useEffect, useState } from "react";
// import USER_API from "../utils/api/Users";
// import HOUSE_API from "../utils/api/House";

// function HouseTest() {
//   const getId = useParams();
//   const homeId = getId.id;
//   console.log(getId);

//   const [data, setData] = useState({
//     title: "",
//     description: "",
//     location: "",
//     equipments: [],
//     pictures: [],
//     firstName: "",
//     lastName: "",
//     email: "",
//   });

//   useEffect(() => {
//     const getHouse = async () => {
//       console.log("in function");
//       try {
//         const response = await HOUSE_API.findOnet({ id: homeId });
//         if (response.success) {
//           console.log(response.data);
//           setData({
//             title: response.data.title,
//             description: response.data.description,
//             location: response.data.location,
//             equipments: response.data.equipments,
//             pictures: response.data.pictures,
//             firstName: response.data.firstName,
//             lastName: response.data.lastName,
//             email: response.data.email,
//           });
//         } else {
//           console.log("not connected for some reason ...", response);
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getHouse();
//   }, []);

//   console.log("DATA HERE ;;;", data.title);

//   return (
//     <div>
//       sup
//       <p>{homeId}</p>
//     </div>
//   );
// }

// export default HouseTest;
