import React, { useContext } from "react";
import { useFetch } from "../hooks/Fetch";
import { useCookies } from "react-cookie";

const Login = async ({ email, password }) => {
  // const {contextLogin} = useContext(Context)

  return await fetch(process.env.REACT_APP_API_URL_DEV + "/users/login", {
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
  return await fetch(process.env.REACT_APP_API_URL_DEV + "/users/new", {
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
  return await fetch(process.env.REACT_APP_API_URL_DEV + `/users/${userId}`, {
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

async function ModifyAvatar({ userId, avatar, jwToken }) {
  // const {contextLogin} = useContext(Context)

  return await fetch(
    process.env.REACT_APP_API_URL_DEV + `/users/${userId}/modifyavatar`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //TODO : absurde, j'ajoute 2x le token manuellement
        Authorization: `Bearer ${jwToken}`,
      },
      body: JSON.stringify({ avatar, jwToken }),
    }
  )
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
      return {
        code: 200,
        success: true,
        avatar: avatar,
        NewUser: user,
      };
    })
    .catch((error) => ({ ...error, success: false }));
}

async function TestMulter({ userId, formData, jwToken }) {
  const requestHeaders = {
    Authorization: `Bearer ${jwToken}`,
  };

  let apiUrl = process.env.REACT_APP_API_URL_DEV + `/users/${userId}/avatar`;

  if (formData.get("avatarUrl")) {
    // If formData contains an avatar URL, send a different API request
    apiUrl = process.env.REACT_APP_API_URL_DEV + `/users/${userId}/avatar`;
  }

  return await fetch(apiUrl, {
    method: "POST",
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
    process.env.REACT_APP_API_URL_DEV + `/users/${userId}/updateuser`,
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
  const [cookies, setCookie, removeCookie] = useCookies([
    "darkTheme",
    "userId",
    "jwToken",
  ]);

  const darkThemeCookie = cookies.darkTheme;
  const userIdCookie = cookies.userId;
  const jwTokenCookie = cookies.jwToken;

  try {
    removeCookie("darkTheme");
    removeCookie("jwToken");
    removeCookie("userId");

    return { code: 200, success: true };
  } catch (error) {
    // Handle any errors that occur during cookie removal
    console.error("Error while removing cookies:", error);
    return {
      code: 500,
      success: false,
      error: "Outside the try, so in the catch",
    };
  }
}

async function Unsubscribe() {
  return { code: 203 };
}

async function RetrievePassword({ email }) {
  console.log("test email in api:", email);

  const response = await fetch(
    process.env.REACT_APP_API_URL_DEV + `/users/retrievepw`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //TODO : absurde, j'ajoute 2x le token manuellement
      },
      body: JSON.stringify({ email }),
    }
  );

  if (response.ok) {
    if (response.status === 200 || response.status === 201) {
      const res = await response.json();
      return {
        code: 200,
        success: true,
        email,
        res,
      };
    } else if (response.status === 400) {
      //TODO : pourquoi j'arrive pas à récup ces données ? (retrievePassword.tsx ligne 42)
      const message = await response.json();
      return {
        code: 400,
        success: false,
        message,
      };
    }
  } else {
    const err = await response.json();
    throw { code: err.code, error: err.message, status: response.status };
  }
}

async function ResetPassword({ password, repeatPassword, token }) {
  console.log("called");
  return await fetch(
    process.env.REACT_APP_API_URL_DEV + `/users/resetpassword`,
    {
      method: "POST",
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
  modifyAvatar: ModifyAvatar,
  testMulter: TestMulter,
  updateUser: UpdateUser,
  resetPassword: ResetPassword,
};

export default USER_API;
