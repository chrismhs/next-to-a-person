import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { trackCustomEvent } from "gatsby-plugin-google-analytics";

import { Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Loader from "../components/loader";

const ProductImage = styled.img`
  height: auto;
  width: auto;

  @media (max-width: 1000px) {
    height: auto;
    width: auto;
  }

  @media (max-width: 700px) {
    height: auto;
    width: auto;
  }

  @media (max-width: 500px) {
    height: auto;
    width: auto;
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
  padding: 5px 5px 5px 0;
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
  const [error, setError] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState();
  const [issueReported, setIssueReported] = useState(false);

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
        if (!result.image.concatImageUrl) {
          setError(true);
          return;
        }

        setTitle(result.product.title);
        setPrice(result.product.price);
        setImage(result.image.concatImageUrl);

        setError(false);
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
        <div>
          <AdditionalInformation>
            <Price>Price: {price} | </Price>
            <a target="_blank" href={getDecodedAmazonUrl()}>
              Buy this product on Amazon
            </a>
          </AdditionalInformation>
        </div>
      )}
      {/* TODO <div>This person is 180cm (5'11) tall.</div>*/}

      {error && (
        <div>
          Sorry, it was not possible to get your product next to a person. It's
          possible the listing doesn't have dimensions.
        </div>
      )}
      {image && !error && (
        <DisplayContainer>
          <ProductImage src={image} />
        </DisplayContainer>
      )}
      {!image && !error && <Loader />}
      <Feedback>
        Doesn't look right?{" "}
        {!issueReported ? (
          <IssueButton
            onClick={e => {
              setIssueReported(true);
              e.preventDefault();
              trackCustomEvent({
                category: "usage",
                action: "user_reported_error",
                value: getDecodedAmazonUrl(),
              });
            }}
          >
            Let us know
          </IssueButton>
        ) : (
          "Thanks!"
        )}
      </Feedback>
    </Layout>
  );
};

export default NextToAPerson;
