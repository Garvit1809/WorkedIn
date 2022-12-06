import React, { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import styled from "styled-components";
import {
  Comment,
  Share,
  ThumbsUp,
  ThumbsUp2,
} from "../../components/generalComp/SVG";
import { BASE_URL, postEnd } from "../../utils/APIRoutes";
import { userProps } from "../../utils/GlobalContants";
import PostModal from "../postComp/PostModal";
import CommentBox from "./CommentBox";

const Section = styled.div`
  width: 100%;
  margin-top: 1rem;
  border: 1px solid blue;
  
  hr {
    width: 90%;
    margin: 0 auto;
  }
`;

const AuthorDetails = styled.div`
  display: flex;
  margin-bottom: 1rem;
  img {
    width: 5vw;
  }
`;

const AuthorTopSection = styled.div`
  display: flex;
border: 1px solid red;
text-align: center;
/* width: 100%; */
align-items: center;
justify-content: space-between;
width: 35vw;

svg{
   border: 1px solid red;
}
`

const PostOptions = styled.div`
    position: relative;
  right: 0.5rem;
  top: 2px;
  /* margin: auto 0; */
  cursor: pointer;
  svg {
    /* width: 3vw; */
  }
`

const Description = styled.div`
  font-size: 1rem;
  width: 100%;
  margin: 0 auto;
  /* margin-left: 10%; */
  /* margin-left: 2vw; */
  margin-bottom: 0.4rem;
  /* border: 1px solid red; */
`;

const ImageContainer = styled.div`
  width: 100%;
  max-height: 90vh;

    img{      
    width: 100%;
    max-height: 90vh;
    object-fit: cover;
    /* aspect-ratio: 16/16; */
  }
`

const PostStats = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid red;

  div {
    display: flex;

    svg {
      width: 1.2rem;
      fill: ${(props) => props.theme.lightBlack};
      /* fill: ${(props) => props.theme.green} */
      /* fill: blue; */
      /* background-color: red; */
    }
  }
`;

const PostBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  border: 1px solid red;

  svg {
    width: 20px;
    cursor: pointer;
    /* fill: blue; */
  }
`;

interface postProps {
  author: {
    name: string;
    photo: string;
    tagline: string;
    _id: string;
  };
  description: string;
  image: string;
  comments: number;
  like: Array<string>;
  _id: string;
  createdAt: string;
}


interface postFeedProps {
  user: userProps,
  post: postProps
}


const PostFeed = ({post, user}: postFeedProps) => {
  const [isCommentBoxOpen, setIsCommentBoxOpen] = useState(false)
  const totalLikes = post.like.length;

  const [isPostModalOpen, setIsPostModalOpen] = useState(false)

  const closePostModal = () => {
    setIsPostModalOpen(false)
  }

  let host = window.location.protocol + "//" + window.location.host

  return (
    <Section>
      <AuthorDetails>
        <img src={post.author.photo} alt="" />
        <AuthorTopSection>
        <h3>{post.author.name}</h3>
        <PostOptions  onClick={() => setIsPostModalOpen(!isPostModalOpen)}>
        <HiDotsVertical />
        {
          isPostModalOpen ? <PostModal post={post} user={user} closePostModal={closePostModal}/> : null
        }
        </PostOptions>
        </AuthorTopSection>
        <h5>{post.author.tagline}</h5>
      </AuthorDetails>
      <Description>
        <h4>{post.description}</h4>
        <ImageContainer>
        {post.image !== '' ? 
        <img src={post.image} alt="postImg" loading="lazy"/> : null }
        </ImageContainer>
      </Description>
      <PostStats>
        <div>
          <ThumbsUp />
          <h4>{totalLikes}</h4>
        </div>
        <h4>{post.comments}</h4>
      </PostStats>
      <hr />
      <PostBottom>
        <ThumbsUp2 />
        <div onClick={() => setIsCommentBoxOpen(!isCommentBoxOpen)}>
        <Comment />
        </div>
        <div
          onClick={() => {
            navigator.clipboard.writeText(
              `${host}/posts/${post._id}`
            );
          }}
        >
          <Share />
        </div>
      </PostBottom>
      <CommentBox userData={user} isCommentBoxOpen={isCommentBoxOpen} postId={post._id} />
    </Section>
  );
};

export default PostFeed;

// comment -> true -> commentbox Open
