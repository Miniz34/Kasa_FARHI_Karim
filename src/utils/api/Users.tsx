import React, { useContext } from "react";
import { useFetch } from "../hooks/Fetch";

const Login = async ({ email, password }) => {
  // const {contextLogin} = useContext(Context)
  return await fetch(process.env.REACT_APP_API_URL_DEV + "/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(async (response) => {
      if (response.ok) {
        if (response.status === 200)
          // good response
          return response.json();
      }
      const err = await response.json();
      throw { code: err.code, error: err.message, status: response.status };
    })
    .then((user) => {
      const id = user.id;
      const token = user.newToken;
      //TODO appeler contexte
      // contextLogin (id, token)
      // localStorage.setItem("id", id);
      // localStorage.setItem("token", token);
      // return code 200 -> connection ok
      return {
        code: 200,
        success: true,
        id,
        token,
      };
    })
    .catch((error) => ({ ...error, success: false }));
};

async function Register({ firstName, lastName, email, password }) {
  return await fetch(process.env.REACT_APP_API_URL_DEV + "/user/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ firstName, lastName, email, password }),
  })
    .then(async (response) => {
      if (response.ok) {
        if (response.status === 201) return response.json();
      }
      const err = await response.json();
      throw { code: err.code, error: err.message, status: response.status };
    })
    .then((user) => {
      const id = user.id;
      const token = user.newToken;
      //TODO : peut être contexte ici
      return {
        code: 200,
        success: true,
        id,
        token,
      };
    })
    .catch((error) => ({
      ...error,
      succes: false,
      message: "User already exists",
    }));
}

async function GetOneUser({ userId }: { userId: number }) {
  return await fetch(process.env.REACT_APP_API_URL_DEV + `/user/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (response) => {
      if (response.ok) {
        if (response.status === 200)
          // good response
          return response.json();
      }
      const err = await response.json();
      throw { code: 404, error: err.message, status: response.status };
    })
    .then((user) => {
      return {
        code: 200,
        success: true,
        user,
      };
    })
    .catch((error) => ({ ...error, success: false }));
}

async function UpdateAvatar({ userId, formData, jwToken }) {
  const requestHeaders = {
    Authorization: `Bearer ${jwToken}`,
  };

  let apiUrl = process.env.REACT_APP_API_URL_DEV + `/user/${userId}/avatar`;

  if (formData.get("avatarUrl")) {
    // If formData contains an avatar URL, send a different API request
    apiUrl = process.env.REACT_APP_API_URL_DEV + `/user/${userId}/avatar`;
  }

  return await fetch(apiUrl, {
    method: "PUT",
    headers: requestHeaders,
    body: formData,
  })
    .then(async (response) => {
      if (response.ok) {
        if (response.status === 200)
          // Good response
          return response.json();
      }
      const err = await response.json();
      throw { code: err.code, error: err.message, status: response.status };
    })
    .then((user) => {
      return {
        code: 200,
        success: true,
        avatar: formData.get("inputFile") || formData.get("avatarUrl"),
        NewUser: user,
      };
    })
    .catch((error) => ({ ...error, success: false }));
}

async function UpdateUser({ userId, jwToken, firstName, lastName, email }) {
  console.log(firstName, lastName, email);

  const response = await fetch(
    process.env.REACT_APP_API_URL_DEV + `/user/${userId}/updateuser`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        //TODO : absurde, j'ajoute 2x le token manuellement
        Authorization: `Bearer ${jwToken}`,
      },
      body: JSON.stringify({ jwToken, firstName, lastName, email }),
    }
  );
  if (response.ok) {
    if (response.status === 200 || response.status === 201) {
      const res = await response.json();
      return {
        code: 200,
        success: true,
        res,
      };
    } else if (response.status === 403) {
      const message = await response.json();
      return {
        code: 403,
        success: false,
        message,
      };
    }
  } else {
    const err = await response.json();
    throw { code: err.code, error: err.message, status: response.status };
  }

  // .catch((error) => ({ ...error, success: false }));
}

async function Logout() {
  try {
    console.log("COME HERE TO DELETE THIS SHIT AT SOME POINT");

    return { code: 200, success: true };
  } catch (error) {
    console.error("Error while removing cookies:", error);
    return {
      code: 500,
      success: false,
      error: "Outside the try, so in the catch",
    };
  }
}

//TODO
async function Unsubscribe() {
  return { code: 203 };
}

async function RetrievePassword({ email }) {
  console.log("test email in api:", email);

  return await fetch(
    process.env.REACT_APP_API_URL_DEV + `/user/retrievepassword`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //TODO : absurde, j'ajoute 2x le token manuellement
      },
      body: JSON.stringify({ email }),
    }
  )
    .then(async (response) => {
      if (response.ok && (response.status === 200 || response.status === 201))
        return response.json();
      throw { response: response, code: response.status };
    })

    .then((res) => ({
      code: 200,
      success: true,
      email,
      res,
    }))

    .catch(async (err) => {
      if (!err.response) {
        return { code: 500, success: false, message: "cassé", email };
      }
      const result = await err.response.json();
      console.log(err.code);
      return {
        code: err.code,
        success: false,
        email,
        message: result.message,
      };
    });
}

async function ResetPassword({ password, repeatPassword, token }) {
  console.log("called");
  return await fetch(
    process.env.REACT_APP_API_URL_DEV + `/user/resetpassword`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        //TODO : absurde, j'ajoute 2x le token manuellement
      },
      body: JSON.stringify({ password, repeatPassword, token }),
    }
  )
    .then(async (response) => {
      if (response.ok) {
        if (response.status === 200) {
          return response.json();
        }
        const err = await response.json();
        console.log("raté");

        throw { code: err.code, error: err.message, status: response.status };
      }
    })
    .then((user) => {
      return {
        code: 200,
        success: true,
        user,
      };
    })
    .catch((error) => ({
      ...error,
      success: false,
      message: "issue with the password i don't know",
    }));
}

const USER_API = {
  login: Login,
  logout: Logout,
  register: Register,
  unsubscribe: Unsubscribe,
  retrievePassword: RetrievePassword,
  getOneUser: GetOneUser,
  updateAvatar: UpdateAvatar,
  updateUser: UpdateUser,
  resetPassword: ResetPassword,
};

export default USER_API;
