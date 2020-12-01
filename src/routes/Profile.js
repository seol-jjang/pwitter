import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { authService, dbService } from "fbase";
import Tweet from "components/Tweet";
import styled from "styled-components";
import Button from "components/Button";
import Input from "components/Input";
import { ModalOverlay, ModalWrapper } from "styles/Theme";

const Profile = ({ userObj, refreshUser }) => {
  const [tweets, setTweets] = useState([]);
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [clickProfileEdit, setClickProfileEdit] = useState(false);
  const history = useHistory();
  const onLogOutClick = () => {
    const ok = window.confirm("로그아웃하시겠습니까?");
    if (ok) {
      authService.signOut();
      history.push("/");
    }
  };
  useEffect(() => {
    const getMyTweets = dbService
      .collection("tweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createAt", "desc")
      .onSnapshot((snapshot) => {
        const tweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setTweets(tweetArray);
      });
    return () => {
      getMyTweets();
    };
  }, [userObj]);
  const onChange = (event) => {
    const {
      target: { value }
    } = event;
    setNewDisplayName(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      tweetNameChange();
      await userObj.updateProfile({
        displayName: newDisplayName
      });

      closeProfileEdit();
      refreshUser();
    }
    closeProfileEdit();
  };
  const tweetNameChange = async () => {
    const data = await dbService
      .collection("tweets")
      .where("creatorId", "==", userObj.uid)
      .get();
    data.docs.map((doc) =>
      dbService.doc(`tweets/${doc.id}`).update({
        userName: newDisplayName
      })
    );
  };
  const openProfileEdit = () => {
    setClickProfileEdit(true);
  };
  const closeProfileEdit = () => {
    setClickProfileEdit(false);
  };
  return (
    <>
      <UserProfile>
        <div className="user-profile">
          <div className="user-profile__image"></div>
          <h4>{userObj.displayName}</h4>
        </div>
        {clickProfileEdit && (
          <>
            <ModalOverlay visible={true} />
            <ModalWrapper
              tabIndex="-1"
              visible={true}
              onClick={closeProfileEdit}
            >
              <div className="profile-form">
                <form onSubmit={onSubmit}>
                  <Input
                    type="text"
                    onChange={onChange}
                    value={newDisplayName}
                    placeholder="닉네임"
                  />
                  <Button as="input" type="submit" value="저장" />
                </form>
              </div>
            </ModalWrapper>
          </>
        )}
        <div className="user-util">
          <Button color="white" onClick={openProfileEdit}>
            프로필 수정
          </Button>
          <Button color="white" onClick={onLogOutClick} logoutBtn>
            로그아웃
          </Button>
        </div>
      </UserProfile>
      <MyTweetSection>
        {tweets &&
          tweets.map((tweet) => (
            <Tweet
              key={tweet.id}
              tweetObj={tweet}
              isOwner={tweet.creatorId === userObj.uid}
            />
          ))}
      </MyTweetSection>
    </>
  );
};

const MyTweetSection = styled.section`
  width: 100%;
`;

const UserProfile = styled.section`
  width: 100%;
  padding: 10px 15px 20px;
  display: flex;
  justify-content: space-between;
  .user-profile {
    display: flex;
    flex-direction: column;
    &__image {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      border: 2px solid #eee;
      background-image: url("https://cdn.kado.net/news/photo/202004/1018454_448598_1539.jpg");
      background-size: cover;
      background-position: center;
      margin-bottom: 20px;
    }
    h4 {
      font-weight: bold;
    }
  }

  .profile-form {
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    form {
      width: 450px;
      display: flex;
      justify-content: center;
      padding: 30px;
      background-color: #fff;
      border-radius: 15px;
    }
  }
  .user-util {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

export default Profile;
