import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { trackCustomEvent } from "gatsby-plugin-google-analytics";

import { Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Loader from "../components/loader";

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

  @media (max-width: 1000px) {
    height: ${({ proportionalHeight }) =>
      proportionalHeight ? `${proportionalHeight * 0.7}px` : "auto"};
    width: ${({ proportionalWidth }) =>
      proportionalWidth ? `${proportionalWidth * 0.7}px` : "auto"};
  }

  @media (max-width: 700px) {
    height: ${({ proportionalHeight }) =>
      proportionalHeight ? `${proportionalHeight * 0.5}px` : "auto"};
    width: ${({ proportionalWidth }) =>
      proportionalWidth ? `${proportionalWidth * 0.5}px` : "auto"};
  }

  @media (max-width: 500px) {
    height: ${({ proportionalHeight }) =>
      proportionalHeight ? `${proportionalHeight * 0.3}px` : "auto"};
    width: ${({ proportionalWidth }) =>
      proportionalWidth ? `${proportionalWidth * 0.3}px` : "auto"};
  }
`;

const BackArrow = styled.svg`
  stroke: #1097b5;
  margin: 1px 6px;
`;

const ProductTitle = styled.h3`
  margin: 1rem 0;
  max-width: 900px;
`;

const AdditionalInformation = styled.div`
  display: flex;
`;

const Price = styled.div`
  padding: 5px;
`;

const DisplayContainer = styled.div`
  text-align: center;
  margin-top: 24px;
`;

const Feedback = styled.div`
  font-size: 0.875rem;
`;

const IssueButton = styled.button`
  cursor: pointer;
  background: transparent;
  border: none;
  color: #1097b5;
  padding: 0;
  margin-bottom: 2px;

  :hover {
    border-bottom: 2px solid #1097b5;
    margin-bottom: 0;
  }

  :disabled {
    color: #333;
    cursor: default;
  }
`;

const NextToAPerson = () => {
  const [image, setImage] = useState();
  const [dimensions, setDimensions] = useState();
  const [imageHeight, setImageHeight] = useState();
  const [imageWidth, setImageWidth] = useState();
  const [error, setError] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState();
  const person = choosePerson();

  const windowUrl = window.location.href;
  const url = new URL(windowUrl);
  const amazonUrl = decodeURIComponent(url.searchParams.get("url"));

  useEffect(() => {
    async function fetchImage() {
      try {
        const response = await fetch(
          "https://us-central1-jvmartins-projects.cloudfunctions.net/amazonNextTAP",
          // "http://localhost:8081/amazonNextTAP",
          {
            method: "POST",
            body: JSON.stringify({ url: amazonUrl }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();
        setTitle(result.product.title);
        setPrice(result.product.price);

        const { widthPx, heightPx } = calculateImageSize(person, result);
        setImageHeight(heightPx);
        setImageWidth(widthPx);
        setError(false);

        setImage(
          `https://res.cloudinary.com/dvvoecsqo/image/upload/v1588024504/${
            result.image.publicImageId
          }`
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
      <Link to="/">
        <BackArrow width="7" height="10" viewBox="0 0 7 10" fill="none">
          <path d="M6 1L2 5.02488L5.95054 9" strokeWidth="2" />
        </BackArrow>
        Measure another product
      </Link>
      <ProductTitle>{title}</ProductTitle>

      {price && (
        <AdditionalInformation>
          <Price>Price: {price} | </Price>
          <a href="">Buy this product on Amazon</a>
        </AdditionalInformation>
      )}

      {error && (
        <div>
          Sorry! It was not possible to get your product next to a person!
        </div>
      )}
      {image && dimensions && !error ? (
        <DisplayContainer>
          {person === "woman" && <Woman />}
          <ProductImage
            src={image}
            proportionalHeight={imageHeight}
            proportionalWidth={imageWidth}
          />
          {person === "man" && <Man />}
        </DisplayContainer>
      ) : (
        <Loader />
      )}
      <Feedback>
        Doesn't look right?{" "}
        <IssueButton
          onClick={e => {
            // To stop the page reloading
            e.preventDefault();
            // Lets track that custom click
            trackCustomEvent({
              // string - required - The object that was interacted with (e.g.video)
              category: "Special Button",
              // string - required - Type of interaction (e.g. 'play')
              action: "Click",
              // string - optional - Useful for categorizing events (e.g. 'Spring Campaign')
              label: "Gatsby Plugin Example Campaign",
              // number - optional - Numeric value associated with the event. (e.g. A product ID)
              value: 43,
            });
            //... Other logic here
          }}
        >
          Let us know
        </IssueButton>
      </Feedback>
    </Layout>
  );
};

export default NextToAPerson;
