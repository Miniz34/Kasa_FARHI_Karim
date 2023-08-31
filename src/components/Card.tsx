import { Link } from "react-router-dom";
import styled from "styled-components";
import colors from "../utils/styles/colors";

const LinkCard = styled(Link)`
  display: flex;
  flex-direction: column;
  width: clamp(280px, 30%, 340px);
  height: 340px;
  text-decoration: none;

  background: linear-gradient(180deg, #ffffff00 0%, #00000080 100%);
  background-color: ${colors.primary};
  border-radius: 10px;
  @media only screen and (max-width: 1250px) {
    width: clamp(280px, 45%, 400px);
  }
  @media only screen and (max-width: 762px) {
    height: 255px;
    width: 100%;
    left: 0px;
    top: 0px;
  }
  &:hover {
    transform: scale(1.02);
    transition: transform 0.3s ease-in-out;
  }
`;

const ContainerCard = styled.div`
  display: flex;
  flex-direction: column-reverse;
  height: 100%;
  position: relative;
`;

const ContainerImg = styled.img`
  height: 100%;
  position: absolute;
  width: 100%;
  filter: brightness(60%);
  border-radius: 10px;
  object-fit: cover;
`;

const TitleCard = styled.span`
  color: ${colors.textcards};
  display: flex;
  margin-top: auto;
  font-size: 18px;
  font-weight: 500;
  line-height: 26px;
  letter-spacing: 0em;
  text-align: left;
  margin: auto 0px 15px 15px;
  z-index: 1000;
`;

interface CardProps {
  title: string;
  id: string;
  picture: string;
}

function Card({ title, id, picture }: CardProps) {
  return (
    <LinkCard to={`/house/${id}`}>
      <ContainerCard className="ContainerCard">
        <ContainerImg
          src={picture}
          alt="minituature de l'appartement"
        ></ContainerImg>
        <TitleCard>{title}</TitleCard>
      </ContainerCard>
    </LinkCard>
  );
}

export default Card;
