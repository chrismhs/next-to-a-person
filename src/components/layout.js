/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import Footer from "./footer"

import backgroundShape1 from "../images/gradient-semi.svg"

import "./layout.css"

const Page = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 2.0875rem 1.45rem;
  position: relative;
  height: 100vh;
  min-height: 600px;
`

const BgImg1 = styled.img`
  position: fixed;
  margin: -100px 0 0 -100px;
  z-index: -2;
`

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Page>
          <BgImg1 src={backgroundShape1} />
          <main>{children}</main>
          <Footer />
        </Page>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
