import React, { useEffect } from "react";
import styled from "styled-components";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const ImageModal = ({ imgUrl, visible, closable, onClose }) => {
  useEffect(() => {
    document.body.style.cssText = `position: fixed; top: -${window.scrollY}px; width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = `position: ""; top: "";`;
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    };
  }, []);
  const close = (event) => {
    if (onClose) {
      onClose(event);
    }
  };
  return (
    <>
      <ModalOverlay visible={visible} />
      <ModalWrapper tabIndex="-1" visible={visible}>
        <ModalInner tabIndex="0" className="modal-inner">
          {closable && (
            <Button closeModal color="black" onClick={close}>
              <FontAwesomeIcon icon={faTimes} />
            </Button>
          )}
          <img src={imgUrl} alt="img" />
        </ModalInner>
      </ModalWrapper>
    </>
  );
};
const ModalWrapper = styled.div`
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

const ModalOverlay = styled.div`
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const ModalInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  width: 100%;
  margin: 0 auto;
  padding: 20px 0;
  button {
    margin: 0 20px 20px;
  }
  img {
    position: static;
    display: block;
    border-radius: 0;
    height: auto;
  }
`;

ImageModal.defaultProps = {
  closable: true,
  visible: false
};

export default ImageModal;
