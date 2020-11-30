import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import styled from "styled-components";
import { Section } from "styles/Theme";
import Button from "./Button";
import TweetStyle from "./TweetStyle";

const Tweet = ({ tweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("삭제하시겠습니까?");
    if (ok) {
      await dbService.doc(`tweets/${tweetObj.id}`).delete();
      if (tweetObj.attachmentUrl !== "") {
        await storageService.refFromURL(tweetObj.attachmentUrl).delete();
      }
    }
  };
  const onToggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`tweets/${tweetObj.id}`).update({
      text: newTweet
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value }
    } = event;
    setNewTweet(value);
  };
  const onClickPhoto = (event) => {};
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              value={newTweet}
              onChange={onChange}
              type="text"
              placeholder="수정사항 입력"
              required
            />
            <Button as="input" type="submit" value="확인" />
          </form>
          <Button onClick={onToggleEditing}>취소</Button>
        </>
      ) : (
        <TweetStyle>
          <h6>{tweetObj.userName}</h6>
          <p>{tweetObj.text}</p>
          {tweetObj.attachmentUrl && (
            <>
              <div className="img-preview"></div>
              <img
                src={tweetObj.attachmentUrl}
                alt="img"
                onClick={onClickPhoto}
              />
            </>
          )}
          {isOwner && (
            <Section>
              <Button onClick={onToggleEditing}>수정</Button>
              <Button onClick={onDeleteClick}>삭제</Button>
            </Section>
          )}
        </TweetStyle>
      )}
    </div>
  );
};

export default Tweet;
