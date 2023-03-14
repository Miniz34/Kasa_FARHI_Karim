import Card from "../components/Card";
import { useEffect, useState } from "react";
import styled from "styled-components";
import colors from "../utils/styles/colors";
import Advert from "../components/Advert";
import { useFetch } from "../utils/hooks/Fetch";
import imgMainPage from "../assets/ImgMainPage.png";
import Loading from "../components/Loading";

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 43px auto 0 auto;
  justify-content: start;
  padding: 56px 50px;
  gap: 60px 5%;
  background-color: ${colors.background};
  border-radius: 25px;
  @media only screen and (max-width: 1250px) {
    padding: 56px 28px;
    justify-content: center;
  }
  @media only screen and (max-width: 762px) {
    padding: 0px 0px;
    background-color: #ffffff;
  }
`;

function App() {
  //TODO : demander explications
  const { data, isLoading } = useFetch("data.json");
  const { homeData } = data;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Advert img={imgMainPage} text="Chez vous, partout et ailleurs" />
      <CardContainer>
        {data.map((home, index) => (
          <Card key={`${home.id}-${index}`} id={home.id} title={home.title} />
        ))}
      </CardContainer>
    </>
  );
}

export default App;

// const [data, setData] = useState([])

// useEffect(()=> {
//   const f = ()=>{
//     fetch('data.json')
//     .then(response => response.json())
//     .then(dataHome => setData(current => current = dataHome))
//   }
//   f()
// }, [])
