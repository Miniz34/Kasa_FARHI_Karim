import { useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import { useEffect, useState } from "react";

import { useFetch } from "../utils/hooks/Fetch";
import Description from "../components/Description";
import "./Home";
import colors from "../utils/styles/colors";
import Rating from "../components/Rating";
import Arrows from "../components/Arrows";
import Tags from "../components/Tags";
import Error from "./Error";
import Loading from "../components/Loading";

const ContainerImg = styled.div`
  position: relative;
`;

const fadeInUp = keyframes`
  from {
    opacity: 0.5;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const MainImg = styled.img`
  width: 100%;
  max-width: 1440px;
  height: 415px;
  object-fit: cover;
  border-radius: 25px;
  opacity: 1;
  transform: scale(1);
  animation: ${({ animate }) => (animate ? fadeInUp : "none")} 0.5s ease-in-out
    forwards;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: rows;
  margin-top: 20px;
  color: ${colors.primary};
  @media only screen and (max-width: 700px) {
    flex-direction: column;
    align-items: center;
  }
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
  @media only screen and (max-width: 700px) {
    flex-direction: row-reverse;
    width: 100%;
    justify-content: space-around;

`;

const RenterData = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-end;
  width: 200px;
  height: 64px;
  @media only screen and (max-width: 700px) {
    flex-direction: row;
    width: 100%;
    justify-content: flex-end;
    margin-top: 30px;
`;

const RenterText = styled.span`
  display: inline;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 25px;
  margin-top: 8px;
  width: 90px;
  margin-right: 10px;
  text-align: end;
  @media only screen and (max-width: 700px) {
    font-size: 14px;
    text-align: end;
    min-width: 90px;

`;

const RenterImg = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  @media only screen and (max-width: 700px) {
    width: 46px;
    height: 46px;
  }
`;

const Arrow = styled(Arrows)`
  fill: black;
`;

const ArrowContainer = styled.div``;

const ImgCounter = styled.div`
  font-size: 18px;
  font-weight: 500;
  line-height: 26px;
  letter-spacing: 0em;
  text-align: center;
  color: ${colors.textcards};
`;

const DescriptionContainer = styled.div`
  display: flex;
  gap: 25px;
  @media only screen and (max-width: 700px) {
    flex-direction: column;
    margin-top: 20px
`;

function Home() {
  const getId = useParams();
  const homeId = getId.id;
  const { data, isLoading } = useFetch("../data.json");
  const [pictureCounter, setPictureCounter] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    setPictureCounter(0);
  }, [homeId]);

  const handlePrevPicture = () => {
    if (pictureCounter === 0) {
      setPictureCounter(findHome.pictures.length - 1);
      setAnimate(true);
    } else {
      setPictureCounter(pictureCounter - 1);
      setAnimate(true);
    }
  };

  const handleNextPicture = () => {
    if (pictureCounter === findHome.pictures.length - 1) {
      setPictureCounter(0);
      setAnimate(true);
    } else {
      setPictureCounter(pictureCounter + 1);
      setAnimate(true);
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  const findHome = data.find((i) => i.id === homeId);
  console.log(pictureCounter);

  const handleAnimationEnd = () => {
    setAnimate(false);
  };

  if (!findHome) {
    return <Error />;
  }

  return (
    <div>
      <ContainerImg>
        <MainImg
          src={`${findHome.pictures[pictureCounter]}`}
          alt="Appartement"
          animate={animate}
          onAnimationEnd={handleAnimationEnd}
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
          <Rating rating={findHome.rating}>{findHome.rating}</Rating>
        </RenterContainer>
      </ContentContainer>
      <DescriptionContainer>
        <Description
          description={findHome.description}
          title="Description"
          content={findHome.description}
        />
        <Description
          equipments={findHome.equipments}
          title="Equipments"
          content={findHome.equipments}
        />
      </DescriptionContainer>
    </div>
  );
}

export default Home;
