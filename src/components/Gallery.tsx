import styled, { keyframes } from "styled-components";
import Arrows from "./Arrows";
import { useEffect, useState } from "react";
import colors from "../utils/styles/colors";

const ContainerImg = styled.div`
  position: relative;
  margin-top: 60px;
`;

const Arrow = styled(Arrows)`
  fill: black;
`;

const ArrowContainer = styled.div``;

const ImgCounter = styled.div`
  font-size: 18px;
  font-weight: 500;
  line-height: 26px;
  letter-spacing: 0em;
  text-align: center;
  color: ${colors.textcards};
`;

const fadeInUp = keyframes`
  from {
    opacity: 0.5;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const MainImg = styled.img<{ animate?: boolean }>`
  width: 100%;
  max-width: 1440px;
  height: 415px;
  object-fit: cover;
  border-radius: 25px;
  opacity: 1;
  transform: scale(1);
  animation: ${({ animate }) => (animate ? fadeInUp : "none")} 0.5s ease-in-out
    forwards;
`;

interface GalleryProps {
  img: [string];
  id: string;
}

function Gallery({ img, id }: GalleryProps) {
  const [pictureCounter, setPictureCounter] = useState(0);
  const [animate, setAnimate] = useState(true);

  /* Resetting the pictureCounter to 0 when the homeId changes. */
  useEffect(() => {
    setPictureCounter(0);
  }, [id]);

  /**
   * If the pictureCounter is equal to 0, then set the pictureCounter to the length of the pictures array
   * minus 1. Otherwise, set the pictureCounter to the pictureCounter minus 1.
   */
  const handlePrevPicture = () => {
    if (pictureCounter === 0) {
      setPictureCounter(img.length - 1);
      setAnimate(true);
    } else {
      setPictureCounter(pictureCounter - 1);
      setAnimate(true);
    }
  };

  /**
   * If the pictureCounter is equal to the length of the pictures array minus 1, then set the
   * pictureCounter to 0 and set the animate state to true. Otherwise, set the pictureCounter to the
   * pictureCounter plus 1 and set the animate state to true.
   */
  const handleNextPicture = () => {
    if (pictureCounter === img.length - 1) {
      setPictureCounter(0);
      setAnimate(true);
    } else {
      setPictureCounter(pictureCounter + 1);
      setAnimate(true);
    }
  };

  const handleAnimationEnd = () => {
    setAnimate(false);
  };

  return (
    <div>
      <ContainerImg>
        <MainImg
          src={`${img[pictureCounter]}`}
          alt="Appartement"
          animate={animate}
          onAnimationEnd={handleAnimationEnd}
        />
        {img.length < 2 ? null : (
          <>
            <ArrowContainer
              style={{ position: "absolute", left: "10px", top: "150px" }}
              onClick={handlePrevPicture}
            >
              <Arrow rotate="180" width="48" height="80" />
            </ArrowContainer>
            <ArrowContainer
              style={{ position: "absolute", right: "10px", top: "150px" }}
              onClick={handleNextPicture}
            >
              <Arrow rotate="0" width="48" height="80" />
            </ArrowContainer>
            <ImgCounter
              style={{ position: "absolute", left: "47%", bottom: "10px" }}
            >
              {pictureCounter + 1} / {img.length}
            </ImgCounter>
          </>
        )}
      </ContainerImg>
    </div>
  );
}
export default Gallery;
