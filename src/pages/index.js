import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"

import homeImg from "../images/bg-person.png"
import backgroundShape1 from "../images/bg-semicircle.png"
import backgroundShape2 from "../images/bg-semiring.png"

const Description = styled.div`
  width: 50%;
  top: 50%;
  position: absolute;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);

  @media (max-width: 800px){
    width: 70%;
    padding-top: 0;
    position: relative;
    -ms-transform: translateY(0);
    transform: translateY(0);
  }

  @media (max-width: 600px){
    width: 100%;
  }
`

const HomeBg = styled.img`
  position: absolute;
  right: 0;
  max-width: 500px;
  z-index: -1;

  @media (max-width: 800px){
    position: relative;
    width: 50%;
  }

  @media (max-width: 600px){
    position: relative;
    width: 100%;
    max-width: 300px;
  }
`

const BgImg1 = styled.img`
  position: absolute;
  max-width: 500px;
  margin-left: -100px;
  z-index: -2;
  
  @media (max-width: 800px){
    display: none;
  }
`

const BgImg2 = styled.img`
  position: absolute;
  max-width: 500px;
  bottom: 0;
  margin: 0 0 0 200px; 
  z-index: -2;

  @media (max-width: 800px){
    display: none;
  }
`

const IndexPage = () => (
  <Layout>
    <BgImg1 src={backgroundShape1} />
    <BgImg2 src={backgroundShape2} />
    <SEO title="Home" />
    <HomeBg src={homeImg} />
    <Description>
      <h1>Next to a person</h1>
      <p>Worried about ordering a dress small enough for a cat or a shoe barely big enough for your big toe? Check the size of things before you buy them, by putting them next to a person.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      </div>
      <Link to="/page-2/">Go to page 2</Link>
    </Description>
  </Layout>
)

export default IndexPage
