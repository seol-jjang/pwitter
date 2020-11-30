import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faTimes } from "@fortawesome/free-solid-svg-icons";
import { theme } from "styles/Theme";

const TweetFactory = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const tweetObj = {
      text: tweet,
      attachmentUrl,
      userName: userObj.displayName,
      createAt: Date.now(),
      creatorId: userObj.uid
    };
    await dbService.collection("tweets").add(tweetObj);
    setTweet("");
    setAttachment("");
  };
  const onChange = (event) => {
    const {
      target: { value }
    } = event;
    setTweet(value);
  };
  const onResize = (event) => {
    const textarea = event.target;
    textarea.style.height = textarea.scrollHeight + "px";
  };
  const onFileChange = (event) => {
    const {
      target: { files }
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result }
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachmentClick = () => setAttachment("");
  return (
    <TweetForm onSubmit={onSubmit}>
      <TweetText
        value={tweet}
        onChange={onChange}
        onKeyDown={onResize}
        onKeyUp={onResize}
        placeholder="무슨 일이 일어나고 있나요?"
        cols="50"
        rows="2"
        maxLength={120}
      />
      <div className="btn-group">
        <label htmlFor="attach-file" aria-label="사진 업로드">
          <FontAwesomeIcon icon={faImage} color={theme.skyblue} size="lg" />
          <input
            id="attach-file"
            onChange={onFileChange}
            type="file"
            accept="image/*"
          />
        </label>
        <Button as="input" type="submit" value="트윗" />
      </div>
      {attachment && (
        <TweetPreview>
          <img src={attachment} alt="img" />
          <Button color="black" onClick={onClearAttachmentClick} deletePhoto>
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </TweetPreview>
      )}
    </TweetForm>
  );
};

const TweetForm = styled.form`
  margin-bottom: 10px;
  padding: 15px 10px 5px;
  border-bottom: 1px solid #ddd;
  background-color: white;
  .btn-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    margin-left: 5px;
    label {
      cursor: pointer;
      input[type="file"] {
        display: none;
      }
    }
  }
`;

export const TweetText = styled.textarea`
  width: 100%;
  margin-top: 5px;
  border: none;
  outline: none;
  font-size: 17px;
  resize: none;
  overflow: hidden;
  ::placeholder {
    letter-spacing: -1.5px;
  }
`;

const TweetPreview = styled.div`
  position: relative;
  margin: 20px 0 10px;
  button {
    position: absolute;
    top: 0;
    left: 0;
    margin: 5px;
  }
  img {
    border-radius: 20px;
  }
`;

export default TweetFactory;
