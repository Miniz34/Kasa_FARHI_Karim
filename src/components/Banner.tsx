import styled from "styled-components";
import colors from "../utils/styles/colors";

const ContainerAdvert = styled.div`
  position: relative;
  max-width: 1440px;
  width: 100%;
  height: 223px;
  border-radius: 25px;
  overflow: hidden;
  margin-top: 60px;
`;

const ContainerImg = styled.img`
  position: absolute;
  filter: brightness(60%);
  object-fit: cover;
  min-width: 100%;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
`;

const TextAdvert = styled.h1`
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;

  color: ${colors.textcards};
  font-style: normal;
  font-weight: 500;
  font-size: clamp(32px, 3vw, 48px);
  z-index: 1;
  @media only screen and (max-width: 762px) {
    transform: translate(-60%%, -50%);
    white-space: pre-wrap;
    width: 80%;
  }
`;

interface BannerProps {
  img: string;
  text?: string;
}

function Banner({ img, text }: BannerProps) {
  return (
    <ContainerAdvert>
      <ContainerImg src={img} />
      {text ? <TextAdvert>{text}</TextAdvert> : null}
    </ContainerAdvert>
  );
}

export default Banner;
