import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { v4 as uuidv4 } from "uuid";

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
    <form onSubmit={onSubmit}>
      <input
        value={tweet}
        onChange={onChange}
        type="text"
        placeholder="무슨 일이 일어나고 있나요?"
        maxLength={120}
      />
      <input onChange={onFileChange} type="file" accept="image/*" />
      <input type="submit" value="트윗" />
      {attachment && (
        <div>
          <img src={attachment} width="500px" height="350px" alt="img" />
          <button onClick={onClearAttachmentClick}>X</button>
        </div>
      )}
    </form>
  );
};

export default TweetFactory;
