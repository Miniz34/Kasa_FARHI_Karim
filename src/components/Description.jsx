import { Link } from "react-router-dom";
import styled from "styled-components";
import colors from "../utils/styles/colors";
import { useEffect, useState } from "react";
import Arrows from "./Arrows";

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 20px;
`;

const DescriptionStyle = styled.div`
  width: 100%;
`;

const ContainerDescription = styled.div`
  width: 100%;
  background-color: ${colors.backgroundForLater};
  border-radius: 20px 20px 20px 20px;
`;

const DescriptionTitle = styled.div`
  background-color: ${colors.primary};
  border-radius: 10px;
  height: 52px;
`;
const TextTitle = styled.h2`
  display: flex;
  justify-content: space-between;
  margin-right: 25px;
  margin-left: 25px;
  padding-top: 14px;
  font-family: Montserrat;
  font-size: 18px;
  font-weight: 500;
  line-height: 26px;
  letter-spacing: 0em;
  text-align: left;
  color: ${colors.textcards};
`;

const TextMain = styled.p`
  color: ${colors.primary};
  list-style-type: none;
  margin: 25px 25px 0 25px;
  padding-bottom: 25px;
  font-family: Montserrat;
  font-size: 18px;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: 0em;
  text-align: left;
`;

const TextEquipments = styled.p`
  list-style-type: none;
`;

function Description(props) {
  const [descriptionCollapsed, setDescriptionCollapsed] = useState(true);
  const [rotateArrowDescription, setRotateArrowDescription] = useState(90);

  const toggleDescriptionCollapse = () => {
    setDescriptionCollapsed(!descriptionCollapsed);
    if (descriptionCollapsed) {
      setRotateArrowDescription(270);
    } else {
      setRotateArrowDescription(90);
    }
  };

  const { description, equipments, title, content } = props;

  return (
    <DescriptionContainer>
      <DescriptionStyle>
        <ContainerDescription>
          <DescriptionTitle>
            <TextTitle>
              <div>{title}</div>
              <div onClick={toggleDescriptionCollapse}>
                <Arrows
                  rotate={`${rotateArrowDescription}`}
                  width="12"
                  height="20"
                />
              </div>
            </TextTitle>
          </DescriptionTitle>
          {!descriptionCollapsed && (
            <TextMain>
              {/* TODO : peut être utiliser cette syntaxe pour les erreurs routeur ? */}
              {Array.isArray(content) ? (
                <TextEquipments>
                  {content.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </TextEquipments>
              ) : (
                content
              )}
            </TextMain>
          )}
        </ContainerDescription>
      </DescriptionStyle>
    </DescriptionContainer>
  );
}

export default Description;
