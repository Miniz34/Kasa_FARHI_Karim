import styled from "styled-components";
import colors from "../utils/styles/colors";
import { Link } from "react-router-dom";
import "../utils/styles/style.css";

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  text-align: center;
  margin-top: 277px;
  color: ${colors.primary};
  height: 100%;
  justify-content: center;
`;
const Error404 = styled.span`
  font-size: 288px;
  font-weight: 700;
  line-height: 411px;
  letter-spacing: 0em;
  text-align: center;
  margin-top: -200px;
`;

const ErrorMsg = styled.span`
  font-size: 36px;
  font-weight: 500;
  line-height: 51px;
  letter-spacing: 0em;
  text-align: center;
`;

const ErrorRedirect = styled(Link)`
  font-size: 18px;
  font-weight: 500;
  line-height: 26px;
  letter-spacing: 0em;
  text-align: center;
  margin-top: 200px;
  font-weight: 500;
  color: ${colors.primary};
`;

interface ErrorProps {
  subtitle?: string;
}

function Error({ subtitle }: ErrorProps) {
  return (
    <ErrorContainer>
      <Error404>404</Error404>
      <ErrorMsg>
        {subtitle ?? "Oups ! La page que vous demandez n'existe pas."}
      </ErrorMsg>
      <ErrorRedirect to="/">Retourner sur la page d'accueil</ErrorRedirect>
    </ErrorContainer>
  );
}

export default Error;
