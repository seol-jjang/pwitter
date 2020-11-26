import React, { useState } from "react";
import { authService, dbService } from "fbase";
import { Link } from "react-router-dom";

const CreateAccount = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [newAccount, setNewAccount] = useState(false);
  const onChange = (event) => {
    const {
      target: { name, value }
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "nickname") {
      setNickname(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await authService.createUserWithEmailAndPassword(
        email,
        password
      );
      setNewAccount(true);
      await dbService.collection("users").doc(`${data.user.uid}`).set({
        uid: data.user.uid,
        name: nickname
      });
    } catch (error) {
      const errorCode = error.code;
      setNewAccount(false);
      if (errorCode === "auth/invalid-email") {
        alert("올바른 이메일 형식이 아닙니다");
      } else if (errorCode === "auth/email-already-in-use") {
        alert("이미 사용 중인 이메일입니다");
      } else if (errorCode === "auth/weak-password") {
        alert("비밀번호를 최소 6자리이상 입력해주세요");
      }
    }
  };
  return (
    <>
      {newAccount ? (
        <div>
          회원가입성공!<p>메인으로 이동합니다</p>
        </div>
      ) : (
        <>
          <Link to="/" replace>
            뒤로
          </Link>
          <div>
            <form onSubmit={onSubmit}>
              <input
                onChange={onChange}
                value={email}
                name="email"
                type="text"
                placeholder="이메일"
                required
              />
              <input
                onChange={onChange}
                value={password}
                name="password"
                type="password"
                placeholder="비밀번호"
                required
              />
              <input
                onChange={onChange}
                value={nickname}
                name="nickname"
                type="text"
                placeholder="이름"
                required
              />
              <input type="submit" value="가입하기" />
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default CreateAccount;
