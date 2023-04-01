import { useParams } from "react-router-dom";
import styled from "styled-components";

import { useFetch } from "../utils/hooks/Fetch";

import Gallery from "../components/Gallery";
import Description from "../components/Description";
import "./Home";
import colors from "../utils/styles/colors";
import Rating from "../components/Rating";
import Tags from "../components/Tags";
import Error from "./Error";
import Loading from "../components/Loading";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: rows;
  margin-top: 20px;
  color: ${colors.primary};
  @media only screen and (max-width: 740px) {
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
  @media only screen and (max-width: 740px) {
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
  @media only screen and (max-width: 740px) {
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
  @media only screen and (max-width: 740px) {
    font-size: 14px;
    text-align: end;
    min-width: 90px;

`;

const RenterImg = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  @media only screen and (max-width: 740px) {
    width: 46px;
    height: 46px;
  }
`;

const DescriptionContainer = styled.div`
  display: flex;
  gap: 25px;
  @media only screen and (max-width: 740px) {
    flex-direction: column;
    margin-top: 20px
`;

function Home() {
  const getId = useParams();
  const homeId = getId.id;
  const { data, isLoading } = useFetch("../data.json");

  if (isLoading) {
    return <Loading />;
  }
  const findHome = data.find((i) => i.id === homeId);

  if (!findHome) {
    return <Error />;
  }

  return (
    <div>
      <Gallery img={findHome.pictures} id={homeId} />
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
