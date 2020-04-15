import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const FooterContainer = styled.footer`
  position: absolute;
  bottom: 0;
  padding: 30px 0;

  @media (max-width: 800px) {
    position: relative;
  }
`

const FooterLink = styled(Link)`
  margin-right: 30px;
`

const Footer = () => (
  <FooterContainer>
    <FooterLink to="/howitworks/">How it works</FooterLink>
    <FooterLink to="/contact/">Contact us</FooterLink>
  </FooterContainer>
)

export default Footer
