import React, { useEffect } from "react";
import styled from "styled-components";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { ModalOverlay, ModalWrapper } from "styles/Theme";

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

const ModalInner = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  margin: 0 auto;
  button {
    margin: 20px;
  }
  img {
    display: block;
    height: auto;
  }
`;

ImageModal.defaultProps = {
  closable: true,
  visible: false
};

export default ImageModal;
