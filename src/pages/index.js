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
  max-width: 500px;
  margin: -100px 0 0 -100px;
  z-index: -2;
`

const FormContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 60%;
  margin: 48px 0;
  background: white;
  padding: 0 0 0 24px;
  border-radius: 8px;
  box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.1);
  @media (max-width: 800px) {
    width: 100%;
  }
`

const SubmitButton = styled.label`
  /* position: absolute; */
  /* right: 0;
  top: 0; */
  cursor: pointer;
  background-color: #1097b5;
  padding: 24px 24px 16px;
  border-radius: 0 8px 8px 0;
  transition: padding 0.2s ease-in-out;

  :hover {
    padding: 24px 20px 16px 28px;
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
  position: absolute;
  left: 50%;
  top: 0%;
  width: 50%;
  /* height: 100%; */
  max-height: 700px;
  margin: 0 auto;
  padding: 70px;
  z-index: -2;

  @media (max-width: 800px) {
    background-image: none;
    position: relative;
    left: 0%;
    top: 0%;
    width: 100%;
    height: 500px;
    max-width: 400px;
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
          Check the size of things before you buy them, by putting them{" "}
          <i>next to a person</i>.
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
          <svg
            width="38"
            height="38"
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M33.5859 20L0 20V18L33.5857 18L17.2929 1.70718L18.7071 0.292969L37.4142 19.0001L18.7071 37.7072L17.2929 36.293L33.5859 20Z"
              fill="white"
            />
          </svg>
        </SubmitButton>
      </FormContainer>
    </Description>
    <BackgroundImage>
      <Svg />
    </BackgroundImage>
  </Layout>
)

export default IndexPage
