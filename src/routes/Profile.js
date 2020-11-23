import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { authService, dbService } from "fbase";
import Tweet from "components/Tweet";

const Profile = ({ userObj, userName }) => {
  const [tweets, setTweets] = useState();
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
  return (
    <>
      <button onClick={onLogOutClick}>로그아웃</button>
      <div>
        {tweets &&
          tweets.map((tweet) => (
            <Tweet
              key={tweet.id}
              tweetObj={tweet}
              name={tweet.userName}
              isOwner={tweet.creatorId === userObj.uid}
            />
          ))}
      </div>
    </>
  );
};

export default Profile;
