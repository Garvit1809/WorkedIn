import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

import Navbar from "../components/generalComp/Navbar";
import Intro from "../components/profileComp/Intro";
import NoSkill from "../components/profileComp/NoSkill";
import Skills from "../components/profileComp/Skills";
import About from "../components/profileComp/About";
import ContractCard from "../components/contractComp/ContractCard";
import ShowContract from "../components/contractComp/contractModals/ShowContract";
import RecentUserActivity from "../components/profileComp/RecentUserActivity";

import { userProps } from "../types/userTypes";
import { contractProps } from "../types/contractTypes";
import { localStorageUser } from "../utils/globalConstants";
import { BASE_URL, userEnd } from "../utils/apiRoutes";
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

const MyProfile = () => {
  const [localUser, setLocalUser] = useState<userProps>({});
  const [user, setUser] = useState<userProps>({});

  const [isShowContractModalOpen, setIsShowContractModalOpen] = useState(false);
  const [clickedContract, setClickedContract] = useState<contractProps>();

  async function fetchLocalUserData() {
    const data = await JSON.parse(
      localStorage.getItem(localStorageUser) || "{}"
    );
    setLocalUser(data);
  }

  async function fetchMyDetails() {
    const { data } = await axios.get(`${BASE_URL}${userEnd}me`, {
      headers: getHeaders(localUser.token ?? ""),
    });
    console.log(data.data.data);
    const userData = data.data.data;
    setUser(userData);
  }

  useEffect(() => {
    fetchLocalUserData();
  }, []);

  useEffect(() => {  
    if (Object.keys(localUser).length !== 0) {
        fetchMyDetails();
    }
  }, [localUser]);

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
            ) : user._id === localUser._id ? (
              <NoSkill userToken={localUser.token!} />
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

// Intro
// Skills
// Past Projects

export default MyProfile;
