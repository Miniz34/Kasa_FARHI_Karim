import React from "react";
import styled from "styled-components";
import img from "../assets/aboutImg.png";
import Description from "../components/Description";
import Advert from "../components/Banner";
import Gallery from "../components/Gallery";
// import { useFetch../components/Banneroks/Fetch";
// import Loading from "../components/Loading";

const DescriptionContainer = styled.div`
  margin-top: 50px;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const DescriptionSingle = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  gap: 25px;
`;

function About() {
  const arrayContent = [
    {
      title: "Fiabilité",
      content:
        "Les annonces postées sur Kasa garantissent une fiabilité totale. Les photos sont conformes aux logements, et toutes les informations sont régulièrement vérifiées  par nos équipes.",
    },
    {
      title: "Respect",
      content:
        "La bienveillance fait partie des valeurs fondatrices de Kasa. Tout comportement discriminatoire ou de perturbation du voisinage entraînera une exclusion de notre plateforme.",
    },
    {
      title: "Service",
      content:
        "Nos équipes se tiennent à votre disposition pour vous fournir une expérience parfaite. N'hésitez pas à nous contacter si vous avez la moindre question.",
    },
    {
      title: "Sécurité",
      content:
        "La sécurité est la priorité de Kasa. Aussi bien pour nos hôtes que pour les voyageurs, chaque logement correspond aux critères de sécurité établis par nos services. En laissant une note aussi bien à l'hôte qu'au locataire, cela permet à nos équipes de vérifier que les standards sont bien respectés. Nous organisons également des ateliers sur la sécurité domestique pour nos hôtes.",
    },
  ];

  // const { data, isLoading } = useFetch("../data.json");
  // if (isLoading) {
  //   return <Loading />;
  // }

  return (
    <div>
      <Advert img={img} />

      <DescriptionContainer>
        <DescriptionSingle>
          {arrayContent.map((i, index) => (
            <Description key={`${index}`} title={i.title} content={i.content} />
          ))}
        </DescriptionSingle>
      </DescriptionContainer>
    </div>
  );
}

export default About;
