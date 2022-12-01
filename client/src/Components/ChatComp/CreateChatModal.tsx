import axios from 'axios'
import React, { useState } from 'react'
import styled from 'styled-components'
import { BASE_URL, chatEnd, searchUserEnd, userEnd } from '../../Utils/APIRoutes'
import { userProps } from '../../Utils/GlobalContants'
import { getHeaders } from '../../Utils/helperFunction'
import { GrFormClose } from 'react-icons/gr'

const Section = styled.div`
position: absolute;
width: 60vw;
height: 70vh;
top: 50%;
left: 50%;
transform: translate(-50%, -55%);
z-index: 10;
border: 1px solid red;
background-color: aliceblue;

form{
  display: flex;
  flex-direction: column;
}
`

const SearchedUser = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  img{
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
  }
`

const UserBadges = styled.div`
display: flex;
flex-wrap: wrap;
border: 1px solid red;
width: 100%;
margin: 1rem auto;
padding-left: 1rem;
`

const UserBadge = styled.div`
display: flex;
align-items: center;
box-sizing: border-box;

border: 1px solid red;
border-radius: 12px;
padding: 0.2rem;
margin: 0 0.4rem;
display: flex;
align-items: center;

div{
  /* border: 1px solid red; */
  display: flex;
  align-items: center;
}
svg{
  margin-left: 0.4rem;
  border-radius: 50%;
  border: 1px solid blue;
  cursor: pointer;
  width: 1rem;
}
`

interface chatModalProps {
  user: userProps
}

interface searchResultProps {
  _id: string,
  name: string,
  photo: string
}

const CreateChatModal = (props: chatModalProps) => {
  const [chatName, setChatName] = useState('')
  const [searchResult, setSearchResult] = useState<Array<searchResultProps>>([]);
  const [selectedUsers, setSelectedUsers] = useState<Array<searchResultProps>>([])


  const handleSearch = async (query: string) => {
    // {{URL}}{{UserEnd}}?search=ic
    console.log(query);
    const { data } = await axios.get(`${BASE_URL}${searchUserEnd}${query}`, {
      headers: getHeaders(props.user.token ?? '')
    })
    console.log(data);
    setSearchResult(data)
  }

  const handleDelete = (delUser: searchResultProps) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleGroup = (userToAdd: searchResultProps) => {
    if (selectedUsers.includes(userToAdd)) {
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!chatName || !selectedUsers) {
      return;
    }

    const { data } = await axios.post(`${BASE_URL}${chatEnd}group`, {
      chatName,
      users: JSON.stringify(selectedUsers.map(user => user._id))
    }, {
      headers: getHeaders(props.user.token ?? '')
    })

    console.log(data);
  }

  return (
    <Section>
        <h2>Create Group Chat</h2>
        <form onSubmit={handleSubmit} >
            <input type="text" placeholder='Chat Name' value={chatName} onChange={(e) => setChatName(e.target.value)} />
            <input type="text" name="" id="" placeholder="Add Users eg: John, Piyush, Jane" onChange={(e) => handleSearch(e.target.value)} />
            <UserBadges>
            {
              selectedUsers.map(user => {
                return (
                  <UserBadge>
                    <h5>{user.name}</h5>
                    <div onClick={() => handleDelete(user)} >
                    <GrFormClose/>
                    </div>
                  </UserBadge>
                )
              })
            }
            </UserBadges>
            {
              searchResult.map((result) => {
                return (
                  <SearchedUser onClick={() => handleGroup(result)} >
                    <img src={result.photo} alt="" />
                    <h5>{result.name}</h5>
                  </SearchedUser>
                )
              })
            }
            <button type="submit">Create Group</button>
        </form>
    </Section>
  )
}

export default CreateChatModal