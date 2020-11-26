import React from "react";
import styled, { css } from "styled-components";

const colorStyles = css`
  /* 색상 */
  ${({ theme, color }) => {
    const selected = theme.theme[color];
    const fontColor = color === "skyblue" ? "white" : "skyblue";
    return css`
      background-color: ${selected};
      color: ${fontColor};
      border: 1px solid ${fontColor}
      &:hover {
        background-color: ${selected};
      }
      &:active {
        background-color: ${selected};
      }
    `;
  }}
`;

const sizeStyles = css`
  ${(props) =>
    props.size === "full" &&
    css`
      width: 100%;
    `}
`;

const StyleButton = styled.button`
  /* 공통스타일 */
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;

  ${colorStyles}
  ${sizeStyles}

  & + & {
    margin-left: 1rem;
  }
`;

const Button = ({ children, ...rest }) => {
  return <StyleButton {...rest}>{children}</StyleButton>;
};

Button.defaultProps = {
  color: "skyblue"
};

export default Button;
