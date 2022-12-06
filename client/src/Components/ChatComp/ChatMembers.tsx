import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { GiCrown } from "react-icons/gi";
import { AiOutlineDown } from "react-icons/ai";
import ChatOptions from "./ChatOptions";
import { userProps } from "../../utils/GlobalContants";
import UpdateChatModal from "./UpdateChatModal";
import ManageMembers from "./ManageMembers";
import CreateContract from "../contractComp/CreateContract";
import ContractApproval from "../contractComp/ContractApproval";

const Section = styled.div`
  border: 1px solid red;
  /* min-height: calc(100vh - 3rem); */
  width: 25vw;
  overflow: hidden;
`;

interface membersProps {
  divHeight: Boolean
}

const Members = styled.div`
  padding-top: 0.5rem;
  box-sizing: border-box;
  border: 1px solid red;
  height: calc(100vh - 7rem);
  /* height: ${(props:membersProps) => props.divHeight ? 'calc(100vh - 7rem)' : 'calc(100vh - 3rem)' }; */
  overflow: auto;
`;

const Member = styled.div`
  border: 1px solid red;
  display: flex;
  align-items: center;
  padding: 0.3rem 0.4rem;
  margin: 0 0.5rem 0.5rem;
  border-radius: 10px;

  svg {
    width: 30px;
  }

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 0.5rem;
  }
`;

interface groupMemberProps {
  _id: string;
  name: string;
  photo: string;
}

interface chatObj {
  chatName?: string;
  contracted?: Boolean;
  chatPhoto?: string;
  createdAt?: string;
  groupAdmin?: {
    _id?: string;
    name?: string;
    photo?: string;
  };
  isGroupChat?: Boolean;
  users?: Array<groupMemberProps>;
  _id?: string;
  contractId?: string;
  contractAprovedBy: Array<string>;
  contractApproved: Boolean
}

interface chat {
  selectedChat: chatObj;
  user: userProps;
}

const ChatMembers = ({ selectedChat, user }: chat) => {
  const [updateServer, setupdateServer] = useState(false)
  const [invitePeople, setInvitePeople] = useState(false)

  useEffect(() => {
    setupdateServer(false)
    setInvitePeople(false)
  }, [selectedChat])

  const closeUpdateServerModal = () => {
    console.log("Jugad");
    
    setupdateServer(false)
  }

  const closeInvitePeopleModal = () => {
    setInvitePeople(false)
  }
  

  return selectedChat.chatName === "one_On_one" ? null : (
    <Section>
      <Members divHeight={selectedChat.groupAdmin?._id === user._id} >
        {user._id === selectedChat.groupAdmin?._id ? (
          <ChatOptions selectedChat={selectedChat} setupdateServer={setupdateServer} setInvitePeople={setInvitePeople} updateServer={updateServer} invitePeople={invitePeople}/>
        ) : null}
        {selectedChat.users !== undefined &&
          (selectedChat.users as unknown as any[]).map((user) => {
            return (
              <Member>
                <img src={user.photo} alt="" />
                <h4>{user.name}</h4>
                {user._id === selectedChat.groupAdmin?._id ? <GiCrown /> : null}
              </Member>
            );
          })}
      </Members>
      {
        selectedChat.contracted ? <ContractApproval selectedChat={selectedChat} user={user} /> : 
        selectedChat.groupAdmin?._id === user._id ?
        <CreateContract selectedChat={selectedChat} user={user}/> : null
      }
      {
        updateServer ? <UpdateChatModal selectedChatId={selectedChat._id} selectedChatImage={selectedChat.chatPhoto} selectedChatName={selectedChat.chatName} userId={user._id} closeUpdateServerModal={closeUpdateServerModal} /> : null
      }
      {
        invitePeople ? <ManageMembers selectedChat={selectedChat} user={user} closeInvitePeopleModal={closeInvitePeopleModal} /> : null
      }
    </Section>
  );
};

export default ChatMembers;
