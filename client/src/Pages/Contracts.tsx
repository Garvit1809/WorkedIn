import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NoContracts from "../components/contractComp/NoContracts";
import ShowContract from "../components/contractComp/contractModals/ShowContract";
import Navbar from "../components/generalComp/Navbar";
import { BASE_URL, contractEnd } from "../utils/apiRoutes";
import { localStorageUser } from "../utils/globalConstants";
import { getHeaders } from "../utils/helperFunction";
import ContractCard from "../components/contractComp/ContractCard";
import { contractProps } from "../types/contractTypes";
import { userProps } from "../types/userTypes";

const Section = styled.div`
  padding: 1rem;
  padding-top: 4rem;
  box-sizing: border-box;
  position: relative;
  min-height: calc(100vh - 2.5rem);
  background-color: rgba(207, 186, 148, 255);
  /* pointer-events: all; */
  z-index: 1;
`;


const Contracts = () => {
  const [userData, setUserData] = useState<userProps>({});
  const [contracts, setContracts] = useState<Array<contractProps>>([]);
  const [isShowContractModalOpen, setIsShowContractModalOpen] = useState(false);

  const [clickedContract, setClickedContract] = useState<contractProps>();


  async function fetchUserData() {
    const data = await JSON.parse(
      localStorage.getItem(localStorageUser) || "{}"
    );
    setUserData(data);
  }

  useEffect(() => {
    fetchUserData();    
  }, []);

  async function fetchContracts() {
    const { data } = await axios.get(`${BASE_URL}${contractEnd}`, {
      headers: getHeaders(userData.token ?? ""),
    });
    console.log(data.userContracts);
    setContracts(data.userContracts);
  }

  useEffect(() => {
    if (Object.keys(userData).length !== 0) {
      fetchContracts();
    }
  }, [userData]);

  const showContract = (contract: contractProps) => {
    setIsShowContractModalOpen(!isShowContractModalOpen);
    setClickedContract(contract);
  };

  const closeContractModal = () => {
    setIsShowContractModalOpen(false)
  }
  

  return contracts.length === 0 ? (
    <NoContracts />
  ) : (
    <>
      <Navbar />
      <Section>
        {contracts.map(contract => {
          return (
            <>
              <ContractCard key={contract.contractName} contract={contract} showContract={showContract} descLength={250} />
              {clickedContract && isShowContractModalOpen ? (
                <ShowContract key={contract._id} contract={clickedContract} userData={userData} />
              ) : null}
            </>
          );
        })}
      </Section>
    </>
  );
};

export default Contracts;