import star from "../assets/Star.svg";
import styled from "styled-components";
import colors from "../utils/styles/colors";

const starSvg = (
  <svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.645 12L15 0L11.355 12H0L9.27 18.615L5.745 30L15 22.965L24.27 30L20.745 18.615L30 12H18.645Z"
      fill="currentColor"
    />
  </svg>
);

const RatingContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  gap: 5px;
  margin-top: 45px;
  width: 100%;
  @media only screen and (max-width: 700px) {
    justify-content: start;
`;

const StarIcon = styled.span`
  width: 30px;
  height: 30px;
  color: ${colors.primary};
`;

const StarEmpty = styled.span`
  width: 30px;
  height: 30px;
  color: ${colors.backgroundForLater};
`;

function Rating({ rating }) {
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(<StarIcon key={i}>{starSvg}</StarIcon>);
  }

  while (stars.length < 5) {
    stars.push(<StarEmpty key={stars.length}>{starSvg}</StarEmpty>);
  }

  return (
    <RatingContainer>
      <span>{stars}</span>
    </RatingContainer>
  );
}

export default Rating;
