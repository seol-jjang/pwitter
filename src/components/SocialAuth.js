import React from "react";
import { authService, dbService, firebaseInstance } from "fbase";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";

const SocialAuth = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name }
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    await dbService.collection("users").doc(`${data.user.uid}`).set({
      uid: data.user.uid,
      name: data.user.displayName
    });
  };
  return (
    <MainSection>
      <Button onClick={onSocialClick} name="google" color="white">
        <FontAwesomeIcon icon={faGoogle} /> 구글계정으로 시작하기
      </Button>
      <Button onClick={onSocialClick} name="github" color="white">
        <FontAwesomeIcon icon={faGithub} /> 깃허브계정으로 시작하기
      </Button>
    </MainSection>
  );
};

export default SocialAuth;

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
`;
