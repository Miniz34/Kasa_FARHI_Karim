import styled from "styled-components";
import imgMainPage from "../assets/ImgMainPage.png";
import colors from "../utils/styles/colors";

const ContainerAdvert = styled.div``;

const ContainerImg = styled.img`
  position: absolute;
  max-width: 1440px;
  width: 100%;
  height: 223px;
  border-radius: 25px;
  margin-top: 4%;
  opacity: 100%;
  filter: brightness(60%);
  object-fit: cover;
`;

const TextAdvert = styled.h1`
  position: relative;
  top: 140px;
  text-align: center;
  color: ${colors.textcards};
  font-style: normal;
  font-weight: 500;
  font-size: 48px;
  line-height: 142.6%;
  z-index: 1;
  @media only screen and (max-width: 800px) {
    font-size: 36px;
    top: 110px;
  }
`;

function Advert(props) {
  const { img, text } = props;
  return (
    <ContainerAdvert>
      <ContainerImg src={img} />
      {text ? <TextAdvert>{text}</TextAdvert> : null}
    </ContainerAdvert>
  );
}

export default Advert;
