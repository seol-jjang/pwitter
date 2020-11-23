import { dbService, storageService } from "fbase";
import React, { useState } from "react";

const Tweet = ({ tweetObj, name, isOwner }) => {
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
            <input type="submit" value="확인" />
          </form>
          <button onClick={onToggleEditing}>취소</button>
        </>
      ) : (
        <>
          <h6>{name}</h6>
          <h4>{tweetObj.text}</h4>
          {tweetObj.attachmentUrl && (
            <div>
              <img
                src={tweetObj.attachmentUrl}
                width="500px"
                height="350px"
                alt="img"
              />
            </div>
          )}
          {isOwner && (
            <>
              <button onClick={onToggleEditing}>수정</button>
              <button onClick={onDeleteClick}>삭제</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;
