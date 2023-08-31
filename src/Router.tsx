import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./utils/styles/style.css";

import App from "./pages/App.tsx";
import Home from "./pages/Home";
import Error from "./pages/Error";
import About from "./pages/About";
import styled from "styled-components";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import CreateUser from "./pages/CreateUser.tsx";
import Login from "./pages/Login.tsx";
import AppWithNavigation from "./pages/AppNavigation.tsx";
import TestBack from "./pages/TestBack.tsx";
import NewAccount from "./pages/NewAccount.tsx";
import RetrievePw from "./pages/RetrievePw.tsx";
import ResetPw from "./pages/ResetPw.tsx";
import NewHouse from "./pages/NewHouse.tsx";

import { useFetch } from "./utils/hooks/Fetch.tsx";
import NewFooter from "./layout/NewFooter.tsx";

import HomiProvider from "./utils/context/Provider.tsx";

const Wrapper = styled.div`
  max-width: 1440px;
  margin: 0 100px;
  background: #fff;
  @media only screen and (max-width: 1250px) {
    margin: 0 50px;
  }

  @media only screen and (max-width: 762px) {
    margin: 0 20px;
  }
`;

function Router() {
  const { data, isLoading } = useFetch(
    process.env.REACT_APP_API_URL_DEV + "/users"
  );

  const tokenPw = data.map((e) => e.resetPw).filter((value) => value !== "");

  const routeComponents = tokenPw.map((url) => (
    <Route key={url} path={url} element={<ResetPw />} />
  ));

  return (
    <React.StrictMode>
      <BrowserRouter basename="/Kasa_FARHI_Karim">
        <HomiProvider>
          <Wrapper>
            <Header />
            <Routes>
              {routeComponents}
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<App />} />
              <Route path="/home/:id" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/CreateUser" element={<CreateUser />} />
              <Route path="/NewAccount" element={<NewAccount />} />
              <Route path="/RetrievePw" element={<RetrievePw />} />
              <Route path="/NewHouse" element={<NewHouse />} />

              <Route path="*" element={<Error />} />

              {/* <Route path="/ResetPw" element={<ResetPw />} /> */}
              <Route path="/testBack" element={<TestBack />} />
              {/* <Route path="/home/*" element={<Error />} /> */}
            </Routes>

            {/* <Footer /> */}
            <NewFooter />
          </Wrapper>
        </HomiProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}
export default Router;
