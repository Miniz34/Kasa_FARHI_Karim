import { Link } from "react-router-dom";
import styled from "styled-components";
import colors from "../utils/styles/colors";

const LinkCard = styled(Link)``;

const ContainerCard = styled.div`
  display: flex;
  flex-direction: column;
  height: 340px;
  width: 340px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(0, 0, 0, 0.5) 100%
  );
  background-color: ${colors.primary};
  border-radius: 10px;
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
