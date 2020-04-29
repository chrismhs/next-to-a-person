import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

import Layout from "../components/layout";
import SEO from "../components/seo";

const Container = styled.div`
  width: 60%;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const WhatIsThis = () => (
  <Layout>
    <SEO title="What is this?" />
    <Container>
      <Link to="/">Home</Link>
      <h2>What is this?</h2>
      <p>
        Next to a Person is a small project by{" "}
        <a href="https://jvmartins.com" target="_blank">
          Joao
        </a>{" "}
        and{" "}
        <a href="https://chris.hastings-spital.co.uk" target_="_blank">
          Chris
        </a>
        , which came about when our friend Charlie ordered an artist easel the
        size of her hand.
      </p>
      <p>
        Some people aren't good at dimensions online, so we thought the best
        idea would be to visually compare your purchase to people.
      </p>
      <h3>How does it work?</h3>
      <p>
        Next to a Person scans an Amazon listing for the dimensions. It then
        takes the main image and calculates resizes it compared to an average
        sized human, which is 1.7m for a man and 1.6m for a woman.
      </p>
      <p>
        We do a little bit of image analysis using Cloud Vision API to remove as
        much white space as possible... accuracy is clearly very important. More
        information on this can be found on the GitHub repo, which is licensed
        under creative commons.
      </p>
      <h3>What’s next?</h3>
      <p>
        Who knows. Theoretically, this could work with many more e-commerce
        websites, or could be a shopify plug-in, but we also think a 3D
        comparison would be intersting to build. If you want to get involved,
        please head over to the{" "}
        <a href="https://github.com/chrismhs/next-to-a-person" target="_blank">
          GitHub page
        </a>
        !
      </p>
    </Container>
  </Layout>
);

export default WhatIsThis;
