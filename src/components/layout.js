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


import "./layout.css"

const Page = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0px 1.0875rem 1.45rem;
  position: relative;
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
          <main>{children}</main>
          <footer>
            <a>How it works</a>
            <a>Contact us</a>
          </footer>
        </Page>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
