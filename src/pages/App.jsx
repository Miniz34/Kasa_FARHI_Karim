import Card from "../components/Card";
import { useEffect, useState } from "react";
import styled from "styled-components";
import colors from "../utils/styles/colors";
import Advert from "../components/Advert";
import { useFetch } from "../utils/hooks/Fetch";
import imgMainPage from "../assets/ImgMainPage.png";
import Loading from "../components/Loading";

const CardContainer = styled.div`
  width: 100%;
  background-color: ${colors.background};
  display: flex;
  justify-content: space-between;
  margin-top: 30%;
  gap: 60px;
  flex-wrap: wrap;
  @media only screen and (max-width: 1156px) {
    justify-content: space-around;
    margin-top: 35%;
  }
  @media only screen and (max-width: 700px) {
    justify-content: center;
  } ;
`;

function App() {
  //TODO : demander explications
  const { data, isLoading } = useFetch("data.json");
  const { homeData } = data;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Advert img={imgMainPage} text="Chez vous, partout et ailleurs" />
      <CardContainer>
        {data.map((home, index) => (
          <Card key={`${home.id}-${index}`} id={home.id} title={home.title} />
        ))}
      </CardContainer>
    </div>
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
