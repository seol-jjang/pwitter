import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SocialAuth from "components/SocialAuth";
import AuthForm from "components/AuthForm";
import Button from "components/Button";

const Auth = () => {
  return (
    <LoginSection>
      <AuthForm />
      <Link to="/signup" replace>
        <Button size="full">가입하기</Button>
      </Link>
      <SocialAuth />
    </LoginSection>
  );
};

export default Auth;

const LoginSection = styled.div`
  width: 400px;
  margin: 10% auto;
`;
