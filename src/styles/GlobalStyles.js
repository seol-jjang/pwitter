import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
@font-face {
    font-family: 'NanumSquareRound';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/NanumSquareRound.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
  ${reset}
  * {
    box-sizing: border-box;
    font-family: 'NanumSquareRound';
  }
  body{
    background-color: #ffffff;
    font-family: 'NanumSquareRound';
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  input, button {
    // background-color: transparent;
    // border: none;
    // outline: none;
  }
  h1, h2, h3, h4, h5, h6{
      
  }
  ol, ul, li {
    list-style: none;
  }
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

export default GlobalStyles;
