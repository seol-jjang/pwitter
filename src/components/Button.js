import React from "react";
import styled, { css } from "styled-components";

const colorStyles = css`
  /* 색상 */
  ${({ theme, color, deleteBtn }) => {
    const selected = theme.theme[color];
    const fontColor = color === "skyblue" ? "white" : "gray";
    if (deleteBtn) {
      return css`
        padding: 10px 13px;
        background-color: black;
        border-radius: 50%;
        opacity: 0.7;
        color: white;
        font-size: 12px;
      `;
    }
    return css`
      background-color: ${selected};
      color: ${fontColor};
      border: 1px solid ${fontColor};
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
  margin-bottom: 5px;
  padding: 10px 15px;
  border: none;
  border-radius: 30px;
  outline: none;
  font-size: 14px;
  cursor: pointer;

  ${colorStyles}
  ${sizeStyles}
`;

const Button = ({ children, ...rest }) => {
  return <StyleButton {...rest}>{children}</StyleButton>;
};

Button.defaultProps = {
  color: "skyblue"
};

export default Button;
