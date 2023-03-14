import Arrow from "../assets/Arrow.svg";
import styled from "styled-components";

const RotatedArrow = styled.svg`
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  user-select: none;
`;

function Arrows({ rotate, height, width }) {
  return (
    <RotatedArrow
      viewBox="0 0 48 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={`${width}`} //48
      height={`${height}`} //80
      transform={`rotate(${rotate})`}
    >
      <path
        d="M0.960022 72.3458L8.04002 79.4258L47.64 39.8258L8.04002 0.22583L0.960022 7.30583L33.48 39.8258L0.960022 72.3458Z"
        fill="white"
      />
    </RotatedArrow>
  );
}

export default Arrows;
