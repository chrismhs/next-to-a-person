import React, { useState } from "react";
import { Link } from "gatsby";
import styled from "styled-components";

import Layout from "../components/layout";
import SEO from "../components/seo";

import FloatingLabelInput from "../components/inputs/floatinglabelinput";

import { PeopleHomePage } from "../components/people";

const Description = styled.div`
  @media (max-width: 800px) {
    padding-top: 0;
    -ms-transform: translateY(0);
    transform: translateY(0);
  }
`;

const TextContainer = styled.div`
  width: 45%;

  @media (max-width: 800px) {
    width: 100%;
  }
`;

const FormContainer = styled.div`
  position: relative;
  width: 45%;
  margin: 48px 0;
  background: white;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Autofill = styled.a`
  font-size: 0.75rem;
  display: inline-flex;
  margin: -32px 0 48px;
`;
const Spacer = styled.div`
  display: block;
`;

const SubmitButton = styled.label`
  cursor: pointer;

  background-color: rgb(16, 151, 181);
  padding: 18px 32px;
  border-radius: 32px;
  color: white;
  font-weight: 500;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  :hover {
    box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.2);
    background-color: rgb(16, 124, 148);
  }
`;

const Input = styled.input.attrs({
  type: "submit",
  value: "Submit",
})`
  display: none;
`;
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
    left: 0;
    top: 0;
    width: 100%;
    height: 400px;
    max-width: 400px;
    padding: 30px;
  }
`;
const IndexPage = () => {
  const [url, setUrl] = useState("");

  function autoFill(e) {
    setUrl(
      "https://www.amazon.co.uk/Intex-Massage-Heating-Accessories-Relaxation/dp/B083QF7TZY/"
    );
    document.getElementById("url-input").focus();
  }

  return (
    <Layout>
      <SEO title="Next to a person" />
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
            value={url}
            onChange={e => setUrl(e.target.value)}
            onBlur={e => setUrl(e.target.value)}
            id="url-input"
            label="Paste Amazon URL here"
          />
          <Autofill href="#" onClick={autoFill}>
            Try an example URL
          </Autofill>
          <Spacer />
          <Link to={`ntap?url=${encodeURIComponent(url)}`}>
            <SubmitButton>
              <Input />
              Measure it!
            </SubmitButton>
          </Link>
        </FormContainer>
      </Description>
      <BackgroundImage>
        <PeopleHomePage />
      </BackgroundImage>
    </Layout>
  );
};

export default IndexPage;
