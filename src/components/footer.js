import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const FooterContainer = styled.footer`
  position: absolute;
  bottom: 0;
  margin-top: 30px;
  padding: 30px 0;
  font-size: 0.875rem;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  @media (max-width: 800px) {
    position: relative;
  }

  @media (max-height: 800px) {
    position: relative;
  }
`

const FooterLink = styled(Link)`
  margin-right: 30px;
`

const Footer = () => (
  <FooterContainer>
    <FooterLink to="/">Home</FooterLink>
    <FooterLink to="/whatisthis/">What is this?</FooterLink>
    {/* <FooterLink to="/contact/">Contact us</FooterLink> */}
  </FooterContainer>
)

export default Footer
