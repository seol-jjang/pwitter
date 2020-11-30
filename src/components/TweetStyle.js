import React from "react";
import styled, { css } from "styled-components";

const TweetArticle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 15px;
  border-top: 1px solid #ddd;
  background-color: white;
  font-size: 16px;
  letter-spacing: -0.5px;
  h6 {
    font-weight: bold;
  }
  p {
    margin: 8px 0 10px;
  }
  img {
    cursor: pointer;
    border-radius: 30px;
  }
`;

const TweetStyle = ({ children, ...rest }) => {
  return <TweetArticle {...rest}>{children}</TweetArticle>;
};

export default TweetStyle;
