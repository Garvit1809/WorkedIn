import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CreatePost from "../components/homeComp/CreatePost";
import Navbar from "../components/generalComp/Navbar";
import { BASE_URL, postEnd } from "../utils/apiRoutes";
import ProfileBriefBox from "../components/homeComp/ProfileBriefBox";
import { apiProvider } from "../utils/helperFunction";
import ActivityBox from "../components/homeComp/ActivityBox";
import PostFeed from "../components/homeComp/PostFeed";
import { localStorageUser } from "../utils/globalConstants";
import { postProps } from "../types/postTypes";
import { userProps } from "../types/userTypes";

const Section = styled.div`
  width: 100%;
  display: flex;
  padding: 0 5vw;
  background-color: rgba(207, 186, 148, 255);
`;

const PostContainer = styled.div`
  width: 40vw;
  margin: 0 5vw;
  min-height: calc(100vh - 2.5rem);
  margin-top: 2rem;
`;

const Home = () => {
  const [userData, setUserData] = useState<userProps>({});
  const [posts, setPosts] = useState<Array<postProps>>([]);

  async function fetchUserData() {
    const data = await JSON.parse(
      localStorage.getItem(localStorageUser) || "{}"
    );
    setUserData(data);
  }

  async function fetchPosts() {
    const { data } = await apiProvider.get(`${BASE_URL}${postEnd}`);
    console.log(data.data.data);
    setPosts(data.data.data);
  }

  // get userData
  useEffect(() => {
    fetchUserData();
  }, []);

  //  get all posts
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <Navbar />
      <Section>
        <ProfileBriefBox />
        <PostContainer>
          <CreatePost />
          {posts.map((post, index) => {
            return <PostFeed post={post} user={userData} key={index} />;
          })}
        </PostContainer>
        <ActivityBox />
      </Section>
    </>
  );
};

export default Home;
