import styled from "styled-components";
import imgMainPage from "../assets/ImgMainPage.png"
import colors from "../utils/styles/colors";

const ContainerAdvert = styled.div`
`

const ContainerImg = styled.img`
position: absolute;
max-width: 1440px;
width: 100%;
height: 223px;
border-radius: 25px;
margin-top: 4%;
opacity: 100%;
filter: brightness(60%);
`

const TextAdvert = styled.h1`
position: relative;
top: 140px;
text-align: center;
color: ${colors.textcards};
font-family: 'Montserrat';
font-style: normal;
font-weight: 500;
font-size: 48px;
line-height: 142.6%;
z-index: 1000;

`


function Advert() {
  return (
    <ContainerAdvert>
    <ContainerImg src={imgMainPage} />
    <TextAdvert>Chez vous, partout et ailleurs</TextAdvert>
    </ContainerAdvert>
  )
}


export default Advert;