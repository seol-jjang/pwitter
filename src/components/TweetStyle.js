import React from "react";
import styled from "styled-components";

const TweetArticle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 15px;
  border-top: 1px solid #ddd;
  background-color: white;
  font-size: 16px;
  letter-spacing: -0.5px;
  h6 {
    margin: 5px 0;
    font-weight: bold;
  }
  textarea {
    margin-bottom: 15px;
  }
  .tweet-info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    .btn-group {
      justify-self: end;
      button {
        &:first-child {
          margin-right: 3px;
        }
      }
    }
    p {
      margin: 10px 0 13px;
      grid-column: span 2;
    }
  }
  .img-preview {
    position: relative;
    cursor: pointer;
    height: 280px;
    background-size: cover;
    background-position: center;
    border: 1px solid #ccc;
    border-radius: 20px;
  }
`;

const TweetStyle = ({ children, ...rest }) => {
  return <TweetArticle {...rest}>{children}</TweetArticle>;
};

export default TweetStyle;
