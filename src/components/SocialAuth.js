import React from "react";
import { authService, dbService, firebaseInstance } from "fbase";

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
    <>
      <button onClick={onSocialClick} name="google">
        구글계정으로 시작하기
      </button>
      <button onClick={onSocialClick} name="github">
        깃허브계정으로 시작하기
      </button>
    </>
  );
};

export default SocialAuth;
