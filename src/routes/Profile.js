import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { authService, dbService } from "fbase";
import Tweet from "components/Tweet";

const Profile = ({ userObj, refreshUser }) => {
  const [tweets, setTweets] = useState([]);
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
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
      refreshUser();
    }
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
  return (
    <>
      <div>
        <h4>{userObj.displayName}</h4>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            onChange={onChange}
            value={newDisplayName}
            placeholder="닉네임"
          />
          <input type="submit" value="저장" />
        </form>
        <button>프로필수정</button>
        <button onClick={onLogOutClick}>로그아웃</button>
      </div>
      <div>
        {tweets &&
          tweets.map((tweet) => (
            <Tweet
              key={tweet.id}
              tweetObj={tweet}
              isOwner={tweet.creatorId === userObj.uid}
            />
          ))}
      </div>
    </>
  );
};

export default Profile;
