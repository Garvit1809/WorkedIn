import axios from 'axios';
import React, { useRef } from 'react'
import styled from 'styled-components';
import { postProps } from '../../types/postTypes';
import { userProps } from '../../types/userTypes';
import { BASE_URL, postEnd } from '../../utils/apiRoutes';
import { getHeaders } from '../../utils/helperFunction';
import { useOutsideAlerter } from '../../utils/outsideAlerter';

const Menu = styled.div`
  position: absolute;
  left: 1rem;
  top: 0.5rem;
  width: fit-content;
  z-index: 2;
  min-width: 13vw;
  background-color: #ffffff;
  cursor: auto;
  border-radius: 10px;
  padding: 0.4rem 0;
  /* border: 1px solid red; */
`;

const MenuItem = styled.div`
/* border: 1px solid red; */
margin: 0.6rem 0.7rem;
cursor: pointer;

h4{
    font-size: 0.8rem;
}
`;

interface postModalProps {
    user: userProps,
    post: postProps,
    closePostModal: any
}

const PostModal = (props : postModalProps) => {
    const { user, post, closePostModal } = props;

    const wrapperRef = useRef<HTMLDivElement | null>(null);
    useOutsideAlerter(wrapperRef, closePostModal)


    const deletePostHandler = async () => {
        const { data } = await axios.delete(`${BASE_URL}${postEnd}${post._id}`, {
            headers: getHeaders(user.token ?? '')
        })

        console.log(data);
        window.location.reload()
        
    }
    const reportPostHandler = async () => {
        const { data } = await axios.post(`${BASE_URL}${postEnd}${post._id}`, {}, {
            headers: getHeaders(user.token ?? '')
        })

        console.log(data);
        
    }

  return (
    <Menu ref={wrapperRef}>
        {
            post.author._id === user._id ? 
            <>
                <MenuItem><h4>Update Post</h4></MenuItem>
                <MenuItem onClick={deletePostHandler} ><h4>Delete Post</h4></MenuItem>
            </>
            : <MenuItem onClick={reportPostHandler} ><h4>Report Post</h4></MenuItem>
        }
    </Menu>
  )
}

export default PostModal