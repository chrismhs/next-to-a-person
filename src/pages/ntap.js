import React, { useEffect, useState, Fragment } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Man from "../images/man"

const SecondPage = () => {
  const [image, setImage] = useState()
  const [dimensions, setDimensions] = useState()

  useEffect(() => {
    async function fetchImage() {
      const urlString = window.location.href
      const url = new URL(urlString)
      const decoded = decodeURIComponent(url.searchParams.get("url"))

      const response = await fetch(
        "https://us-central1-jvmartins-projects.cloudfunctions.net/amazonNextTAP",
        // "http://localhost:8081/amazonNextTAP",
        {
          method: "POST",
          body: JSON.stringify({ url: decoded }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      const result = await response.json()

      setImage(
        `https://res.cloudinary.com/dvvoecsqo/image/upload/v1588024504/${result.publicImgId}`
      )
      setDimensions(result.dimensions)
    }

    fetchImage()
  }, [])

  return (
    <Layout>
      <SEO title="Your product next to a person" />
      <h2>Next to a person</h2>
      {image && dimensions ? (
        <Fragment>
          <img src={image} />
          <Man />
        </Fragment>
      ) : (
        <div>Loading</div>
      )}
      <div></div>
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

export default SecondPage
