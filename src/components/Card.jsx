import { Link } from "react-router-dom";
import styled from "styled-components";
import colors from "../utils/styles/colors";

const LinkCard = styled(Link)`
  display: flex;
  flex-direction: column;
  width: clamp(280px, 30%, 340px);
  height: 340px;

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
    border-radius: 10px;
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
`;

function Card({ title, id, picture }) {
  return (
    <LinkCard to={`/home/${id}`}>
      <ContainerCard className="ContainerCard">
        <TitleCard>{title}</TitleCard>
      </ContainerCard>
    </LinkCard>
  );
}

export default Card;
