import React, { useContext } from "react";

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

async function Logout() {
  return { code: 200, success: true };
}

async function Register({ email, username, password, firstname, lastname }) {
  return { code: 201, success: true };
}

async function Unsubscribe() {
  return { code: 203 };
}

async function ResetPassword() {
  return { code: 200 };
}

const USER_API = {
  login: Login,
  logout: Logout,
  register: Register,
  unsubscribe: Unsubscribe,
  resetPassword: ResetPassword,
};

export default USER_API;
