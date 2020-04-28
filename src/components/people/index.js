import React from "react"
import styled from "styled-components"

import peopleHome from "./images/people-home.svg"
import man from "./images/man.svg"
import woman from "./images/woman.svg"

export const PeopleHomePage = () => <img src={peopleHome} />

const SizeableSvg = styled.img`
  height: 470px;
`

export const Man = ({}) => <SizeableSvg src={man} />

export const Woman = ({}) => <SizeableSvg src={woman} />
