
import { Link } from "react-router-dom";
import styled from "styled-components";
import colors from "../utils/styles/colors";


const DescriptionStyle = styled.div`
display: flex;
gap: 50px;
`

const DescriptionSingleComponent = styled.div`
width: 50%;
background-color: green;
`

const DescriptionTitle = styled.h2`
background-color: ${colors.primary}
`

function Description(props) {
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
const { description, equipments } = props;

return (
  <DescriptionStyle>
    <DescriptionSingleComponent >
      <DescriptionTitle>Description</DescriptionTitle>
      <p>{description}</p>
    </DescriptionSingleComponent>
    <DescriptionSingleComponent >
      <DescriptionTitle>Equipements</DescriptionTitle>
      <ul>
        {equipments.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </DescriptionSingleComponent>
  </DescriptionStyle>
);


}

export default Description;