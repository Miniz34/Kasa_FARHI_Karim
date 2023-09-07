import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./utils/styles/style.css";

import Home from "./pages/Home.tsx";
import Error from "./pages/Error";
import About from "./pages/About";
import styled from "styled-components";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import CreateUser from "./pages/CreateUser.tsx";

import NewHouse from "./pages/CreateHouse/CreateHouse.tsx";

import { useFetch } from "./utils/hooks/Fetch.tsx";
import NewFooter from "./layout/NewFooter.tsx";

import AuthPage from "./pages/AuthPage.tsx";
import Profil from "./pages/Profil.tsx";

import HomiProvider from "./utils/context/Provider.tsx";
import { CookiesProvider } from "react-cookie";
import House from "./pages/House/House.tsx";

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
    process.env.REACT_APP_API_URL_DEV + "/user/all/"
  );

  const tokenPw = data.map((e) => e.resetPw).filter((value) => value !== "");

  // const routeComponents = tokenPw.map((url) => (
  //   <Route key={url} path={url} element={<ResetPw />} />
  // ));

  return (
    <BrowserRouter basename="/Kasa_FARHI_Karim">
      <Wrapper>
        <Header />
        <Routes>
          {/* {routeComponents} */}

          <Route path="/" element={<Home />} />

          <Route path="/house/:id" element={<House />} />
          <Route path="/about" element={<About />} />
          <Route path="/CreateUser" element={<CreateUser />} />
          {/* <Route path="/RetrievePw" element={<RetrievePw />} /> */}
          <Route path="/NewHouse" element={<NewHouse />} />
          <Route path="/profil/:id" element={<Profil />} />

          <Route path="/auth/*" element={<AuthPage />} />

          <Route path="*" element={<Error />} />

          {/* <Route path="/ResetPw" element={<ResetPw />} /> */}
          {/* <Route path="/home/*" element={<Error />} /> */}
        </Routes>

        {/* <Footer /> */}
        <NewFooter />
      </Wrapper>
    </BrowserRouter>
  );
}
export default Router;
