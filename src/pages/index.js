import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"

import homeImg from "../images/bg-person.png"

const Description = styled.div`
  width: 50%;
  padding-top: 100px;

  @media (max-width: 600px){
    width: 100%;
    padding-top: 0;
  }
`

const HomeBg = styled.img`
 position: absolute;
 right: 0;
 max-width: 500px;
 z-index: -1;

 @media (max-width: 600px){
  position: relative;
  width: 100%;
}
`

const IndexPage = () => (
  <Layout>
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
