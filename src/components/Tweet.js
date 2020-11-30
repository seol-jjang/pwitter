import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import styled from "styled-components";
import { Section } from "styles/Theme";
import Button from "./Button";
import ImageModal from "./ImageModal";
import { TweetText } from "./TweetFactory";
import TweetStyle from "./TweetStyle";

const Tweet = ({ tweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);
  const [showModal, setShowModal] = useState(false);
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
  const onResize = (event) => {
    const textarea = event.target;
    textarea.style.height = textarea.scrollHeight + "px";
  };
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const bgImage = {
    backgroundImage: `url(${tweetObj.attachmentUrl})`
  };
  return (
    <article>
      {editing ? (
        <TweetStyle>
          <h6>{tweetObj.userName}</h6>
          <form onSubmit={onSubmit}>
            <TweetText
              value={newTweet}
              onChange={onChange}
              onKeyDown={onResize}
              onKeyUp={onResize}
              placeholder="수정 사항 입력"
              cols="50"
              rows="2"
              maxLength={120}
            />
            <Button as="input" type="submit" value="확인" size="full" />
          </form>
          <Button onClick={onToggleEditing} color="white" cancelBtn>
            취소
          </Button>
        </TweetStyle>
      ) : (
        <TweetStyle>
          <div className="tweet-info">
            <h6>{tweetObj.userName}</h6>
            {isOwner && (
              <Section className="btn-group">
                <Button onClick={onToggleEditing} color="white" editTweet>
                  수정
                </Button>
                <Button onClick={onDeleteClick} color="white" deleteTweet>
                  삭제
                </Button>
              </Section>
            )}
            <p>{tweetObj.text}</p>
          </div>
          {tweetObj.attachmentUrl && (
            <>
              <div
                className="img-preview"
                style={bgImage}
                onClick={openModal}
              ></div>
              {showModal && (
                <ImageModal
                  imgUrl={tweetObj.attachmentUrl}
                  visible={showModal}
                  closable={true}
                  onClose={closeModal}
                />
              )}
            </>
          )}
        </TweetStyle>
      )}
    </article>
  );
};

export default Tweet;
