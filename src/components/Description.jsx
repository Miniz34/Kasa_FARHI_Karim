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

const ContainerEquipments = styled.div`
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

function Description(props) {
  const [descriptionCollapsed, setDescriptionCollapsed] = useState(true);
  const [equipmentsCollapsed, setEquipmentsCollapsed] = useState(true);
  const [rotateArrowDescription, setRotateArrowDescription] = useState(90);
  const [rotateArrowEquipments, setRotateArrowEquipments] = useState(90);

  const toggleDescriptionCollapse = () => {
    setDescriptionCollapsed(!descriptionCollapsed);
    if (descriptionCollapsed) {
      setRotateArrowDescription(270);
    } else {
      setRotateArrowDescription(90);
    }
  };

  const toggleEquipmentsCollapse = () => {
    setEquipmentsCollapsed(!equipmentsCollapsed);
    if (equipmentsCollapsed) {
      setRotateArrowEquipments(270);
    } else {
      setRotateArrowEquipments(90);
    }
  };

  const { description, equipments } = props;

  return (
    <DescriptionContainer>
      <DescriptionStyle>
        <ContainerDescription>
          <DescriptionTitle>
            <TextTitle>
              <div>Description</div>
              <div onClick={toggleDescriptionCollapse}>
                <Arrows
                  rotate={`${rotateArrowDescription}`}
                  width="12"
                  height="20"
                />
              </div>
            </TextTitle>
          </DescriptionTitle>
          {!descriptionCollapsed && <TextMain>{description}</TextMain>}
        </ContainerDescription>
      </DescriptionStyle>
      <DescriptionStyle>
        <ContainerEquipments>
          <DescriptionTitle>
            <TextTitle>
              <div> Equipements</div>
              <div onClick={toggleEquipmentsCollapse}>
                <Arrows
                  rotate={`${rotateArrowEquipments}`}
                  width="12"
                  height="20"
                />
              </div>
            </TextTitle>
          </DescriptionTitle>
          {!equipmentsCollapsed && (
            <TextMain>
              {equipments.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </TextMain>
          )}
        </ContainerEquipments>
      </DescriptionStyle>
    </DescriptionContainer>
  );
}

export default Description;
