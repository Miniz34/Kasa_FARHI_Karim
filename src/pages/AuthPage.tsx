import React, { useState, useEffect } from "react";
import { useLocation, Outlet, Route, Routes } from "react-router-dom";
import Login from "../layout/connexion/Login";
import Register from "../layout/connexion/Register";
import RetrievePassword from "../layout/connexion/RetrievePassword";
import { useFetch } from "../utils/hooks/Fetch";
import ResetPassword from "../layout/connexion/ResetPassword";
import "../layout/connexion/LoginForm.css";

const AuthPage: React.FC = () => {
  const location = useLocation();

  const [routeComponents, setRouteComponents] = useState([]);

  const { data, isLoading } = useFetch(
    process.env.REACT_APP_API_URL_DEV + "/user/all/"
  );

  useEffect(() => {
    const tokenPw = data.map((e) => e.resetPw).filter((value) => !!value);
    tokenPw.map((url) => {
      console.log(url);
    });
    setRouteComponents(
      tokenPw.map((url) => (
        <Route key={url} path={url} element={<ResetPassword />} />
      ))
    );
  }, [data]);

  return (
    <>
      {!isLoading && (
        <>
          <h1>Authentication Page</h1>
          <Routes>
            <Route path="/" element={<Outlet />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/retrievepassword" element={<RetrievePassword />} />
              {routeComponents}
            </Route>
          </Routes>
        </>
      )}
    </>
  );
};

export default AuthPage;
