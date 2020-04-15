import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"

import FloatingLabelInput from "../components/inputs/floatinglabelinput"

import Svg from "../images/ntap-people.js"
import backgroundShape1 from "../images/gradient-semi.svg"

const Description = styled.div`
  @media (max-width: 800px) {
    padding-top: 0;
    -ms-transform: translateY(0);
    transform: translateY(0);
  }
`

const TextContainer = styled.div`
  width: 45%;

  @media (max-width: 800px) {
    width: 100%;
  }
`

const BgImg1 = styled.img`
  position: absolute;
  margin: -100px 0 0 -100px;
  z-index: -2;
`

const FormContainer = styled.div`
  position: relative;
  width: 45%;
  margin: 48px 0;
  background: white;
  @media (max-width: 800px) {
    width: 100%;
  }
`

const SubmitButton = styled.label`
  cursor: pointer;
  background-color: rgb(16, 151, 181);
  padding: 18px 32px;
  border-radius: 32px;
  color: white;
  font-weight: 500;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;

  :hover {
    box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.2);
    background-color: rgb(16, 124, 148);
  }
`

const Input = styled.input.attrs({
  type: "submit",
  value: "Submit",
})`
  display: none;
`
const BackgroundImage = styled.div`
  background-image: linear-gradient(#e8f3f0, #f9f6f1, #ffffff);
  background-position: center top;
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 150px 0 0 0;
  position: absolute;
  left: 50%;
  top: 5%;
  width: 50%;

  max-height: 700px;
  margin: 0 auto;
  padding: 70px;
  z-index: -2;

  @media (max-width: 1000px) {
    background-image: none;
  }

  @media (max-width: 800px) {
    position: relative;
    left: 0%;
    top: 0%;
    width: 100%;
    height: 400px;
    max-width: 400px;
    padding: 30px;
  }
`

const IndexPage = () => (
  <Layout>
    <BgImg1 src={backgroundShape1} />
    <SEO title="Home" />
    <Description>
      <TextContainer>
        <h1>Next to a person</h1>
        <p>
          Check the size of things on Amazon before you buy them, by putting
          them <i>next to a person</i>.
        </p>
      </TextContainer>
      <FormContainer>
        <FloatingLabelInput
          id="example-3"
          label="Paste Amazon URL here"
          onChange={"Test"}
        />
        <SubmitButton>
          <Input type="submit" />
          Measure it!
        </SubmitButton>
      </FormContainer>
    </Description>
    <BackgroundImage>
      <Svg />
    </BackgroundImage>
  </Layout>
)

export default IndexPage
