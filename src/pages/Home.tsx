import Card from "../components/Card";
import styled from "styled-components";
import colors from "../utils/styles/colors";
import Banner from "../components/Banner";
import { useFetch } from "../utils/hooks/Fetch";
import imgMainPage from "../assets/ImgMainPage.png";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import Header from "../layout/Header";
import { HomiContext } from "../utils/context/Provider";
import { useContext } from "react";

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 43px auto 0 auto;
  justify-content: start;
  padding: 56px 50px;
  gap: 60px 5%;
  background-color: ${colors.background};
  border-radius: 25px;
  @media only screen and (max-width: 1250px) {
    padding: 56px 28px;
    justify-content: center;
  }
  @media only screen and (max-width: 762px) {
    padding: 0px 0px;
    background-color: #ffffff;
  }
`;
/**
 * We use the useFetch hook to fetch data from the data.json file. *
 * If the data is still loading, we display a loading component. *
 * If the data is loaded, we display an advert component and a card container component.
 * The card container component displays a card component for each home in the data.
 * It's a function that returns a loading component if the data is still loading, otherwise it returns
 * a card container with cards inside
 * @returns a JSX element.
 */
function Home() {
  const { data, isLoading } = useFetch(
    process.env.REACT_APP_API_URL_DEV + "/house/all/"
  );

  console.log(data);

  data.map((home) => {
    console.log(home.houseId);
  });

  const { darkTheme, userId, jwToken } = useContext(HomiContext);

  console.log(darkTheme, userId, jwToken);

  if (isLoading) {
    return <Loading />;
  }

  // const storage = localStorage.getItem("token");
  // console.log(storage);

  // const navigate = useNavigate();

  // if (!storage) {
  //   navigate("/login"); // Use history to navigate
  //   return null; // Return null or a loading component if needed
  // }
  return (
    <>
      {/* <Header /> */}
      <Banner img={imgMainPage} text="Chez vous, partout et ailleurs" />
      <Link to="/newHouse"> hey </Link>
      <CardContainer>
        {data.map((house, index) => (
          <Card
            key={`${house.houseId}-${index}`}
            id={house.houseId}
            title={house.title}
            picture={house.pictures[0]}
          />
        ))}
      </CardContainer>
    </>
  );
}

export default Home;

// material-ui
