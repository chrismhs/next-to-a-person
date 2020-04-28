import React, { useEffect, useState, Fragment } from "react";
import styled from "styled-components";

import { Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

import { Man, Woman } from "../components/people";

const choosePerson = () => {
  const idx = Math.round(Math.random());
  if (idx === 0) {
    return "man";
  }
  return "woman";
};

const calculateImageSize = (person, { image, dimensions }) => {
  const personHeightCm = person === "man" ? 170 : 160;
  const ratePersonPxCm = 470 / personHeightCm;

  let productProportionalHeightPx;
  let productProportionalWidthPx;

  // 3% more to account for white padding
  let maxDimension = Math.max(...dimensions.dimensions);
  maxDimension += maxDimension * 0.03;
  if (image.orientation === "horizontal") {
    productProportionalWidthPx = maxDimension * ratePersonPxCm;
  } else {
    productProportionalHeightPx = maxDimension * ratePersonPxCm;
  }

  return {
    heightPx: productProportionalHeightPx,
    widthPx: productProportionalWidthPx,
  };
};

const ProductImage = styled.img`
  height: ${({ proportionalHeight }) =>
    proportionalHeight ? `${proportionalHeight}px` : "auto"};
  width: ${({ proportionalWidth }) =>
    proportionalWidth ? `${proportionalWidth}px` : "auto"};
`;

const NextToAPerson = () => {
  const [image, setImage] = useState();
  const [dimensions, setDimensions] = useState();
  const [imageHeight, setImageHeight] = useState();
  const [imageWidth, setImageWidth] = useState();
  const [error, setError] = useState(false);

  const person = choosePerson();

  useEffect(() => {
    async function fetchImage() {
      const urlString = window.location.href;
      const url = new URL(urlString);
      const decoded = decodeURIComponent(url.searchParams.get("url"));

      /*
      const result = {
        image: {
          heightPx: 271,
          widthPx: 522,
          orientation: "horizontal",
          publicImageId:
            "Intex_Simple_Spa_28482_Hot_Tub_795_litres_Bubble_Massage_196_x_66_cm_with_Relaxation_Heating_Accessories",
        },
        dimensions: {
          unit: "cm",
          dimensions: [196, 196, 66],
          originalDimensionStr: "196 x 196 x 66 cm",
        },
      };
      */

      try {
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
        );

        const result = await response.json();

        const { widthPx, heightPx } = calculateImageSize(person, result);
        setImageHeight(heightPx);
        setImageWidth(widthPx);
        setError(false);

        setImage(
          `https://res.cloudinary.com/dvvoecsqo/image/upload/v1588024504/${result.image.publicImageId}`
        );
        setDimensions(result.dimensions);
      } catch (e) {
        setError(true);
      }
    }

    fetchImage();
  }, []);

  return (
    <Layout>
      <SEO title="Your product next to a person" />
      <h2>Next to a person</h2>
      {error && (
        <div>Not possible to retrieve dimensions for product specified</div>
      )}
      {image && dimensions && !error ? (
        <Fragment>
          {person === "woman" && <Woman />}
          <ProductImage
            src={image}
            proportionalHeight={imageHeight}
            proportionalWidth={imageWidth}
          />
          {person === "man" && <Man />}
        </Fragment>
      ) : (
        <div>Loading</div>
      )}
      <br />
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  );
};

export default NextToAPerson;
