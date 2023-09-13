import React, { useContext } from "react";
import { useFetch } from "../hooks/Fetch";

//RENAME
const FindOne = async ({ id }) => {
  console.log("called");
  return await fetch(process.env.REACT_APP_API_URL_DEV + `/house/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      //TODO : absurde, j'ajoute 2x le token manuellement
    },
  }).then(async (response) => {
    if (response.ok) {
      const res = await response.json();
      return {
        code: 200,
        success: true,
        data: res,
      };
    }
    const err = await response.json();
    console.log("raté");
    throw { code: err.code, error: err.message, status: response.status };
  });
};

const CreateHouse = async ({ formData }) => {
  console.log("CREATE HOUSE CALLED");
  console.log(formData);
  const data = new FormData();
  data.append("title", formData.title);
  data.append("description", formData.description);
  data.append("location", formData.location);
  data.append("userId", formData.userId);
  data.append("houseId", formData.houseId);
  // Append equipment strings to the FormData object
  formData.equipments.forEach((equipment, index) => {
    data.append(`equipments[${index}]`, equipment);
  });

  // Append picture files to the FormData object
  //TODO : fonctionne pas avec index dans le payload
  formData.pictures.forEach((file, index) => {
    data.append(`inputFiles`, file);
  });

  return await fetch(process.env.REACT_APP_API_URL_DEV + `/house/`, {
    method: "POST",
    body: data,
  }).then(async (response) => {
    if (response.ok) {
      return response.json();
    }
    const err = await response.json();
    console.log("Failed");
    throw { code: err.code, error: err.message, status: response.status };
  });
};

const HOUSE_API = {
  findOne: FindOne,
  createHouse: CreateHouse,
};

export default HOUSE_API;
