import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const SecondPage = () => (
  <Layout>
    <SEO title="Your product next to a person" />
    <h2>Next to a person</h2>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default SecondPage
