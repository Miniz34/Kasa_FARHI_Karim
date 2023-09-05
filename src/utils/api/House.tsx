import React, { useContext } from "react";
import { useFetch } from "../hooks/Fetch";
import { useCookies } from "react-cookie";

const FindOne = async ({ id }) => {
  console.log("id here :", id);
  console.log("process env here:", process.env.REACT_APP_API_URL_DEV);
  return await fetch(
    process.env.REACT_APP_API_URL_DEV + `/house/gethouse/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then(async (response) => {
      console.log("RESPONSE HERE", response);
      if (response.ok) {
        if (response.status === 200) {
          const house = await response.json();
          const id = house.houseId;
          console.log(response);

          // Make a second fetch request here using the data from the first response
        }
      } else {
        const err = await response.json();
        throw { code: err.code, error: err.message, status: response.status };
      }
    })
    .then((secondResponseData) => {
      // You can return or process the data from the second response here
      return {
        code: 200,
        success: true,
        // Include the data from the second response if needed
        // ...
      };
    })
    .catch((error) => ({ ...error, success: false }));
};

const HOUSE_API = {
  findOne: FindOne,
};

export default HOUSE_API;
