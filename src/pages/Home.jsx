import { useParams } from "react-router-dom";
import Card from "../components/Card";
import styled from "styled-components";

import { useEffect, useState } from "react";

import { useFetch } from "../utils/hooks/Fetch";
import Description from "../components/Description";
import "./Home";
import colors from "../utils/styles/colors";
import Rating from "../components/Rating";
import Arrows from "../components/Arrows";
import Tags from "../components/Tags";

const ContainerImg = styled.div`
  position: relative;
`;

const MainImg = styled.img`
  width: 100%;
  max-width: 1440px;
  height: 415px;
  object-fit: cover;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: rows;
  margin-top: 20px;
  color: ${colors.primary};
`;
const LocationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 100%;
`;

const RenterContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const RenterData = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-end;
  width: 200px;
  height: 64px;
`;

const RenterText = styled.span`
  display: inline;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 25px;
  margin-top: 8px;
  width: 90px;
  margin-right: 10px;
  text-align: end;
`;

const RenterImg = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
`;

const Arrow = styled(Arrows)`
  fill: black;
`;

const ArrowContainer = styled.div`
  // position: absolute;
  // right: 40px;
  // top: 40px;
`;

const ImgCounter = styled.div`
  font-family: Montserrat;
  font-size: 18px;
  font-weight: 500;
  line-height: 26px;
  letter-spacing: 0em;
  text-align: center;
  color: ${colors.textcards};
`;

const Test = styled(Rating)`
  opacity: 0;
`;

function Home() {
  const getId = useParams();
  const homeId = getId.id;
  //TODO : rendre asychrone
  const { data, isLoading } = useFetch("../data.json");

  const [pictureCounter, setPictureCounter] = useState(0); // <-- add state for picture counter

  useEffect(() => {
    setPictureCounter(0); // reset picture counter on home change
  }, [homeId]);

  const handlePrevPicture = () => {
    if (pictureCounter === 0) {
      setPictureCounter(findHome.pictures.length - 1);
    } else {
      setPictureCounter(pictureCounter - 1);
    }
    console.log("cliquer");
  };

  const handleNextPicture = () => {
    if (pictureCounter === findHome.pictures.length - 1) {
      setPictureCounter(0);
    } else {
      setPictureCounter(pictureCounter + 1);
    }
    console.log("cliquer");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const findHome = data.find((i) => i.id === homeId);
  console.log(pictureCounter);

  return (
    <div>
      <ContainerImg>
        <MainImg
          src={`${findHome.pictures[pictureCounter]}`}
          alt="Appartement"
        />
        <ArrowContainer
          style={{ position: "absolute", left: "10px", top: "150px" }}
          onClick={handlePrevPicture}
        >
          <Arrow rotate="180" width="48" height="80" />
        </ArrowContainer>
        <ArrowContainer
          style={{ position: "absolute", right: "10px", top: "150px" }}
          onClick={handleNextPicture}
        >
          <Arrow rotate="0" width="48" height="80" />
        </ArrowContainer>
        <ImgCounter
          style={{ position: "absolute", left: "47%", bottom: "10px" }}
        >
          {pictureCounter + 1} /{findHome.pictures.length}
        </ImgCounter>
      </ContainerImg>
      <ContentContainer>
        <LocationContainer>
          <h1>{findHome.title}</h1>
          <h2>{findHome.location}</h2>
          <Tags tags={findHome.tags} />
        </LocationContainer>
        <RenterContainer>
          <RenterData>
            <RenterText>{findHome.host.name}</RenterText>
            <RenterImg src={`${findHome.host.picture}`} alt="host" />
          </RenterData>
          <Test rating={findHome.rating}>{findHome.rating}</Test>
        </RenterContainer>
      </ContentContainer>
      <div>
        <Description
          description={findHome.description}
          equipments={findHome.equipments}
        />
      </div>
    </div>
  );
}

export default Home;
