import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { postProps } from "../../types/postTypes";
import { userProps } from "../../types/userTypes";
import { BASE_URL, postEnd } from "../../utils/apiRoutes";
import { localStorageUser } from "../../utils/globalConstants";
import Navbar from "../generalComp/Navbar";
import ActivityBox from "../homeComp/ActivityBox";
import CommentBox from "../commentComp/CommentBox";
import ProfileBriefBox from "../homeComp/ProfileBriefBox";
import PostContent from "./PostContent";

const Section = styled.div`
  width: 100%;
  display: flex;
  padding: 0 5vw;
  background-color: rgba(207, 186, 148, 255);
  min-height: 100vh;
  /* border: 1px solid red; */
  `;

const PostContainer = styled.div`
/* border: 1px solid red; */
  width: 40vw;
  height: fit-content;
  margin: 2rem 5vw;
  border-radius: 10px;
  padding-top: 1rem;
  padding-bottom: 0.2rem;
  background-color: rgba(236, 227, 212, 255);

  hr {
    width: 100%;
    margin-bottom: 0.4rem;
    border: none;
    height: 1px;
    background-color: grey;
  }
`;

const SinglePost = () => {
  const [post, setPost] = useState<postProps>();
  const [isCommentBoxOpen, setIsCommentBoxOpen] = useState(false);
  const [postId, setPostId] = useState<string>();
  const [userData, setUserData] = useState<userProps>({});

  const params = useParams();

  async function fetchUserData() {
    const data = await JSON.parse(
      localStorage.getItem(localStorageUser) || "{}"
    );
    setUserData(data);
  }

  async function fetchPost() {
    const { data } = await axios.get(`${BASE_URL}${postEnd}${postId}`);
    const postData = data.data.data;
    setPost(postData);
  }

  // get userData
  useEffect(() => {
    console.log(params.id);
    setPostId(params.id);
    fetchUserData();
  }, []);

  useEffect(() => {
    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const commentBoxHandler = () => {
    setIsCommentBoxOpen(!isCommentBoxOpen);
  };

  return (
    <>
      <Section>
        <ProfileBriefBox />
        <PostContainer>
          <PostContent
            user={userData}
            commentBoxHandler={commentBoxHandler}
            post={post!}
          />
          {post && (
            <CommentBox
              userData={userData}
              isCommentBoxOpen={isCommentBoxOpen}
              postId={post._id}
            />
          )}
        </PostContainer>
        <ActivityBox />
      </Section>
    </>
  );
};

export default SinglePost;
