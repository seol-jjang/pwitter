import React, { useState } from "react";
import styled from "styled-components";
import { authService } from "fbase";
import Button from "./Button";
import Input from "./Input";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onChange = (event) => {
    const {
      target: { name, value }
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await authService.signInWithEmailAndPassword(email, password);
    } catch (error) {
      const errorCode = error.code;
      if (errorCode === "auth/invalid-email") {
        alert("올바른 이메일 형식이 아닙니다");
      } else if (errorCode === "auth/user-disabled") {
        alert("비활성화된 사용자입니다");
      } else if (errorCode === "auth/user-not-found") {
        alert("아이디 혹은 비밀번호가 일치하지 않습니다");
      } else if (errorCode === "auth/wrong-password") {
        alert("아이디 혹은 비밀번호가 일치하지 않습니다");
      }
    }
  };
  return (
    <Form onSubmit={onSubmit}>
      <Input
        onChange={onChange}
        name="email"
        value={email}
        type="text"
        placeholder="이메일"
        required
      />
      <Input
        onChange={onChange}
        name="password"
        value={password}
        type="password"
        placeholder="비밀번호"
        required
      />
      <Button as="input" type="submit" value="로그인" />
    </Form>
  );
};

export default AuthForm;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  input {
    margin-top: 8px;
  }
`;
