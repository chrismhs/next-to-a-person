import React from "react";
import styled from "styled-components";

import peopleHome from "./images/people-home.svg";
import man from "./images/man.svg";
import woman from "./images/woman.svg";

export const PeopleHomePage = () => <img src={peopleHome} />;

const REGULAR_HEIGHT_PX = 470;

const SizeableSvg = styled.img`
  height: ${REGULAR_HEIGHT_PX}px;

  @media (max-width: 1000px) {
    height: ${REGULAR_HEIGHT_PX * 0.7}px;
  }

  @media (max-width: 800px) {
    height: ${REGULAR_HEIGHT_PX * 0.5}px;
  }
`;

export const Man = ({}) => <SizeableSvg src={man} />;

export const Woman = ({}) => <SizeableSvg src={woman} />;
