
import { Link } from "react-router-dom";
import styled from "styled-components";
import colors from "../utils/styles/colors";
import {useEffect, useState} from "react"



const DescriptionStyle = styled.div`
display: flex;
gap: 50px;
`

const DescriptionSingleComponent = styled.div`
width: 50%;
`

const DescriptionTitle = styled.h2`
background-color: ${colors.primary}
`

function collapse() {
  const test = document.querySelector(".test")
  console.log(test)
  console.log("clique")
}

function youhou() {
  console.log("youhou")
}

function Description(props) {

  const [descriptionCollapsed, setDescriptionCollapsed] = useState(true);
  const [equipmentsCollapsed, setEquipmentsCollapsed] = useState(true);

  const toggleDescriptionCollapse = () => {
    setDescriptionCollapsed(!descriptionCollapsed);
  };

  const toggleEquipmentsCollapse = () => {
    setEquipmentsCollapsed(!equipmentsCollapsed);
  };
  
 
const { description, equipments } = props;

return (
  <DescriptionStyle>
    <DescriptionSingleComponent >
      <DescriptionTitle onClick={toggleDescriptionCollapse}>Description</DescriptionTitle>
      {!descriptionCollapsed && <p>{description}</p>}
    </DescriptionSingleComponent>
    <DescriptionSingleComponent >
      <DescriptionTitle onClick={toggleEquipmentsCollapse}>Equipements</DescriptionTitle>
      {!equipmentsCollapsed && (
          <ul>
            {equipments.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
    </DescriptionSingleComponent>
  </DescriptionStyle>
);



}

export default Description;


// const DescriptionText = styled.p`
//   margin: 0;
//   padding: 0;
//   transition: max-height 0.5s ease-out;
//   max-height: ${({ collapsed }) => (collapsed ? "0" : "1000px")};
//   overflow: hidden;
// `;



 // if (description) {
  // return (
  //   <div>
  //     <h3>Descritpion</h3>
  //     <span>

  //     </span>
  //   </div>
  // )
  // }
  // else if (equipment) {
  //   return (
  //     <div>
  //     <h3>équipements</h3>
  //     <span>

  //     </span>
  //     </div>
  //   )
  // }
// return (
//   <div>
//     <p>{props.description}</p>
//     <ul>
//       {props.equipments.map((item) => (
//         <li key ={item}>{item}</li>
//       ))}
//     </ul>
//   </div>

// )