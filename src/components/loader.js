import React, { useEffect, useState } from "react";
import styled from "styled-components";

import MeasuringBar from "../images/measuringbar";

const Container = styled.div`
  margin-top: 100px;
  height: 300px;
`;

const MeasuringLoader = styled.div`
  max-width: 300px;

  animation: pulse 8s ease-in-out;

  @keyframes pulse {
    0% {
      width: 0px;
    }
    15% {
      width: 50px;
    }
    40% {
      width: 65px;
    }
    80% {
      width: 280px;
    }
    100% {
      width: 300px;
    }
  }
`;

const Loader = () => {
  const loadingText = [
    { text: "Getting product dimensions...", ms: 2000 },
    { text: "Calculating proportions...", ms: 3000 },
    { text: "Spinning up more servers...", ms: 2000 },
    { text: "Getting Jeff Bezos on the phone...", ms: 2000 },
  ];

  const [loadingTextIndex, setLoadingTextIndex] = useState(0);

  useEffect(() => {
    if (loadingTextIndex >= loadingText.length - 1) {
      return;
    }

    setTimeout(() => {
      setLoadingTextIndex(loadingTextIndex + 1);
    }, loadingText[loadingTextIndex].ms);
  }, [loadingTextIndex]);
  return (
    <Container>
      <div>{loadingText[loadingTextIndex].text}</div>
      <MeasuringLoader>
        <MeasuringBar />
      </MeasuringLoader>
    </Container>
  );
};

export default Loader;
