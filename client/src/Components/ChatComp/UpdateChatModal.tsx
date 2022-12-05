import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useOutsideAlerter } from "../../utils/OutsideAlerter";

const Section = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50vw;
  height: 50vh;
  background-color: antiquewhite;
  transform: translate(-50%, -50%);

  display: flex;
  align-items: center;
`;

const ImageContainer = styled.div`
  width: 5rem;
  height: 5rem;
  border: 1px solid red;

  img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Upload = styled.div``;

const ServerName = styled.div``;

interface updateChatModalProps {
  selectedChatId?: string;
  selectedChatImage?: string;
  selectedChatName?: string;
  userId?: string;
  closeUpdateServerModal: any
}

const UpdateChatModal = ({
  selectedChatId,
  userId,
  selectedChatImage,
  selectedChatName,
  closeUpdateServerModal
}: updateChatModalProps) => {
    const [newChatName, setNewChatName] = useState('')

    const wrapperRef = useRef<HTMLDivElement | null>(null);
  useOutsideAlerter(wrapperRef, closeUpdateServerModal)

    const updateChatInfoHandler = (e: any) => {
        e.preventDefault();
        alert(newChatName)
        // {{URL}}{{ChatEnd}}/638845f3d4536216311c2785/rename
    }

  return (
    <Section ref={wrapperRef} >
      <form onSubmit={updateChatInfoHandler} >
        <ImageContainer>
          <img src={selectedChatImage} alt="groupImage" />
        </ImageContainer>
        <Upload>
          <input type="file" name="" id="" />
        </Upload>
        <ServerName>
          <input type="text" name="" placeholder={selectedChatName} value={newChatName} onChange={(e) => setNewChatName(e.target.value)} />
        </ServerName>
        <button type="submit">Update</button>
      </form>
    </Section>
  );
};

export default UpdateChatModal;
