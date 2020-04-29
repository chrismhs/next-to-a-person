import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 8px;
  margin-top: -12px;
  -webkit-transform: scale(1);
  transform: scale(1);
`;

export default class TextInput extends React.PureComponent {
  render() {
    return (
      <Container>
        <svg width="100%" height="8px">
          <defs>
            <pattern
              id="polka-dots"
              x="0"
              y="0"
              width="16"
              height="8"
              patternUnits="userSpaceOnUse"
            >
              <line
                x1="0.5"
                y1="2.18557e-08"
                x2="0.5"
                y2="8"
                stroke="rgb(16,151,181)"
              />
              <line
                x1="4.5"
                y1="2.18557e-08"
                x2="4.5"
                y2="5"
                stroke="rgb(16,151,181)"
              />
              <line
                x1="8.5"
                y1="2.18557e-08"
                x2="8.5"
                y2="5"
                stroke="rgb(16,151,181)"
              />
              <line
                x1="12.5"
                y1="2.18557e-08"
                x2="12.5"
                y2="5"
                stroke="rgb(16,151,181)"
              />
            </pattern>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#polka-dots)"
          />
        </svg>
      </Container>
    );
  }
}
