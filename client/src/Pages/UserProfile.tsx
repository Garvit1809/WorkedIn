import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import ContractCard from "../components/contractComp/ContractCard";
import ShowContract from "../components/contractComp/contractModals/ShowContract";
import Navbar from "../components/generalComp/Navbar";
import About from "../components/profileComp/About";
import Intro from "../components/profileComp/Intro";
import RecentUserActivity from "../components/profileComp/RecentUserActivity";
import Skills from "../components/profileComp/Skills";
import { contractProps } from "../types/contractTypes";
import { userProps } from "../types/userTypes";
import { BASE_URL, userEnd } from "../utils/apiRoutes";
import { localStorageUser } from "../utils/globalConstants";
import { getHeaders } from "../utils/helperFunction";

const Section = styled.div`
  /* border: 5px solid black; */
  padding: 5rem 5vw 1rem;
  box-sizing: border-box;
  width: 100%;
  min-height: calc(100vh - 2.5rem);
  background-color: rgba(207, 186, 148, 255);
  display: flex;
  position: relative;
`;

const UserDetails = styled.div`
  /* border: 1px solid red; */
  width: 55vw;
  /* display: flex; */
`;

const MyProjects = styled.div`
  box-sizing: border-box;
  padding-top: 1.5rem;
  padding-bottom: 0.5rem;
  width: 100%;
  background-color: #3a421b;
  border-radius: 10px;
`;

const ProjectHeading = styled.h1`
  color: rgba(236, 227, 212, 255);
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
  padding: 0 2rem;
`;

const Contracts = styled.div`
  /* border: 1px solid white; */
  display: flex;
  flex-direction: column-reverse;
`;

const UserProfile = () => {
  const [userId, setUserId] = useState();
  const [localUser, setLocalUser] = useState<userProps>({});
  const [user, setUser] = useState<userProps>({});

  const [isShowContractModalOpen, setIsShowContractModalOpen] = useState(false);
  const [clickedContract, setClickedContract] = useState<contractProps>();

  const location = useLocation();

  useEffect(() => {
    setUserId(location.state.id);
    console.log(location);
  }, []);

  async function fetchLocalUserData() {
    const data = await JSON.parse(
      localStorage.getItem(localStorageUser) || "{}"
    );
    setLocalUser(data);
  }

  useEffect(() => {
    fetchLocalUserData();
  }, []);

  async function fetchUserDetails() {
    const { data } = await axios.get(`${BASE_URL}${userEnd}${userId}`, {
      headers: getHeaders(localUser.token ?? ""),
    });
    console.log(data.data.data);
    const userData = data.data.data;
    setUser(userData);
  }

  useEffect(() => {
    console.log("USER ID :- " + userId);
    
    if (Object.keys(localUser).length !== 0 && userId) {
      fetchUserDetails();
    }
  }, [localUser, userId]);

  const showContract = (contract: contractProps) => {
    setIsShowContractModalOpen(!isShowContractModalOpen);
    setClickedContract(contract);
  };

  const closeContractModal = () => {
    setIsShowContractModalOpen(false);
  };

  return (
    user && (
      <>
        <Navbar />
        <Section>
          <UserDetails>
            <Intro user={user} localUser={localUser!} />
            <About user={user} localUser={localUser!} />
            {user.skills?.length !== 0 ? (
              <Skills skillArr={user.skills!} userToken={localUser.token!} />
            ) : null}
            <MyProjects>
              <ProjectHeading>Past projects</ProjectHeading>
              <Contracts>
                {Object.keys(user).length !== 0 &&
                  (user.pastProjects as unknown as contractProps[]).map(
                    (project, index) => {
                      return (
                        <ContractCard
                          key={index}
                          contract={project}
                          showContract={showContract}
                          descLength={100}
                        />
                      );
                    }
                  )}
              </Contracts>
              {clickedContract && isShowContractModalOpen ? (
                <ShowContract
                  contract={clickedContract}
                  userData={user}
                  closeContractModal={closeContractModal}
                />
              ) : null}
            </MyProjects>
          </UserDetails>
          <RecentUserActivity />
        </Section>
      </>
    )
  );
};

export default UserProfile;
