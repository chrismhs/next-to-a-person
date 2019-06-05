import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const HowItWorks = () => (
  <Layout>
    <SEO title="How it works" />
    <h2>How it works</h2>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default HowItWorks
