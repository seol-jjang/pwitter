import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import Tweet from "components/Tweet";
import TweetFactory from "components/TweetFactory";
import styled from "styled-components";

const Home = ({ userObj }) => {
  const [tweets, setTweets] = useState([]);
  useEffect(() => {
    const updateTweet = dbService
      .collection("tweets")
      .orderBy("createAt", "desc")
      .onSnapshot((snapshot) => {
        const nweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setTweets(nweetArray);
      });
    return () => {
      updateTweet();
    };
  }, []);
  return (
    <HomeSection>
      <TweetFactory userObj={userObj} />
      <section>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            isOwner={tweet.creatorId === userObj.uid}
          />
        ))}
      </section>
    </HomeSection>
  );
};

const HomeSection = styled.div`
  width: 100%;
  background-color: #eeeeee;
`;

export default Home;
