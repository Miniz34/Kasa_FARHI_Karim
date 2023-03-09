import { useEffect, useState } from "react";

function PictureCount() {
  const [pictureCounter, setPictureCounter] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setPictureCounter((prevCounter) => prevCounter + 1);
    }, 1000);
  });
}
