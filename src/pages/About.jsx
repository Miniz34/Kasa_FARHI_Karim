import styled from "styled-components";
import img from "../assets/aboutImg.png";
import Description from "../components/Description";
import Advert from "../components/Advert";
import { useEffect, useState } from "react";
import { useFetch } from "../utils/hooks/Fetch";
import Loading from "../components/Loading";

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

const ContainerImg = styled.img`
  max-width: 1440px;
  width: 100%;
  height: 223px;
  border-radius: 25px;
  margin-top: 4%;
  opacity: 100%;
  filter: brightness(60%);
  object-fit: cover;
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

  const { data, isLoading } = useFetch("../data.json");

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <ContainerImg src={img} alt="Bannière" />

      {/* TODO : fix ce placement incompréhensible */}
      <DescriptionContainer>
        <DescriptionSingle>
          {arrayContent.map((i, index) => (
            <Description
              key={`${index}`}
              style={{ width: "75%" }}
              title={i.title}
              content={i.content}
            />
          ))}
        </DescriptionSingle>
      </DescriptionContainer>
    </div>
  );
}

export default About;
