import React, { useEffect, useState } from "react";
import styled from "styled-components";

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

const NextToAPerson = () => {
  const [image, setImage] = useState();
  const [imageHeight, setImageHeight] = useState();
  const [imageWidth, setImageWidth] = useState();
  const [error, setError] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState();
  const person = choosePerson();

  function getDecodedAmazonUrl() {
    const windowUrl = window.location.href;
    const url = new URL(windowUrl);
    return decodeURIComponent(url.searchParams.get("url"));
  }

  useEffect(() => {
    const amazonUrl = getDecodedAmazonUrl();

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
          `https://res.cloudinary.com/dvvoecsqo/image/upload/v1588024504/${result.image.publicImageId}`
        );
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
          <a target="_blank" href={getDecodedAmazonUrl()}>
            Buy this product on Amazon
          </a>
        </AdditionalInformation>
      )}

      {error && (
        <div>
          Sorry! It was not possible to get your product next to a person!
        </div>
      )}
      {image && !error && (
        <DisplayContainer>
          {person === "woman" && <Woman />}
          <ProductImage
            src={image}
            proportionalHeight={imageHeight}
            proportionalWidth={imageWidth}
          />
          {person === "man" && <Man />}
        </DisplayContainer>
      )}
      {!image && !error && <Loader />}
    </Layout>
  );
};

export default NextToAPerson;
