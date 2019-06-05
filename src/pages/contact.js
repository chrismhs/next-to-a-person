import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Contact = () => (
  <Layout>
    <SEO title="Contact" />
    <h1>Hi from the contact page</h1>
    <p>Welcome to the contact page</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default Contact
