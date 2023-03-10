import Card from "../components/Card";
import { useEffect, useState } from "react";
import styled from "styled-components";
import colors from "../utils/styles/colors";
import Advert from "../components/Advert";
import { useFetch } from "../utils/hooks/Fetch";
import imgMainPage from "../assets/ImgMainPage.png";

const CardContainer = styled.div`
  width: 100%;
  background-color: ${colors.background};
  display: flex;
  justify-content: space-between;
  margin-top: 30%;
  gap: 60px;
  flex-wrap: wrap;
`;

function App() {
  //TODO : demander explications
  const { data } = useFetch("data.json");
  const { homeData } = data;
  console.log(data);

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
