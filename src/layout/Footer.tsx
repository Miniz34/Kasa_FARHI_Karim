import styled from "styled-components";
import logo from "../assets/LogoWhite.png";
import colors from "../utils/styles/colors";
import textFooter from "../assets/textFooter.png";
import "../utils/styles/style.css";

const FooterContainer = styled.div`
  background-color: #000000;
  width: 100%;
  height: 209px;
  margin-top: 20%;
  display: flex;
  flex-direction: column;
  gap: 45px;
  @media only screen and (max-width: 762px) {
    padding-top: 30px;
  }
`;
const LogoFooter = styled.img`
  height: 40px;
  width: 122px;
  align-self: center;
  margin-top: 4%;
`;

const FooterText = styled.h3`
  color: ${colors.textcards};
  text-align: center;
  font-size: 24px;
  font-weight: 500;
  line-height: 34px;
  letter-spacing: 0em;
`;

function Footer() {
  return (
    <FooterContainer className="footer-wrapper">
      <LogoFooter src={logo} alt="Kasa Logo" />
      <FooterText>© 2020 Kasa. All rights reserved</FooterText>
    </FooterContainer>
  );
}

export default Footer;
