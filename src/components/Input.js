import React from "react";
import styled from "styled-components";

const StyleInput = styled.input`
  /* 공통스타일 */
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #9fa0a0;
  outline: none;
  font-size: 14px;
`;

const Input = ({ children, ...rest }) => {
  return <StyleInput {...rest}>{children}</StyleInput>;
};

export default Input;
