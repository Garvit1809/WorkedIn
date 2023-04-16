import React from "react";
import { BsArrow90DegRight } from "react-icons/bs";
import styled from "styled-components";
import { contractProps } from "../../types/contractTypes";
import { months } from "../../utils/globalConstants";
import { getReadableTime } from "../../utils/helperFunction";
import StatusStrip from "./StatusStrip";

const Section = styled.div`
  position: relative;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 1.5rem;
  padding: 1rem 2rem;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: rgba(236, 227, 212, 255);
  overflow: hidden;
  z-index: 1;
`;

const ContractName = styled.div`
  display: inline;
  position: relative;
  /* border: 1px solid white; */

  h2 {
    /* padding-top: 0.5rem; */
    display: inline;
    font-size: 1.7rem;
    margin-right: 0.6rem;
  }

  svg {
    /* border: 1px solid white; */
    position: absolute;
    top: 1.7rem;
    left: 0.25rem;
    transform: rotateX(180deg);
    width: 2rem;
    height: 2rem;
  }
`;

const ContractDates = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 0.8rem;
  font-weight: 600;
`;

const LeadBy = styled.div`
  display: inline;
  font-size: 0.8rem;
  font-weight: 500;
  /* border: 1px solid white; */

  h4 {
    margin-left: 0.2rem;
    /* border: 1px solid white; */
    display: inline;
    font-weight: 600;
    font-size: 1rem;
    text-decoration: underline;
    cursor: pointer;
  }
`;

const ContractBrief = styled.div`
  /* border: 1px solid red; */
  display: flex;
  margin-top: 0.8rem;

  p {
    width: 60%;
    text-indent: 2.75rem;
    line-height: 160%;
    font-size: 1rem;
    box-sizing: border-box;
    padding-right: 1rem;
    padding-bottom: 0.4rem;
  }
`;

const MemberPics = styled.div`
  /* border: 1px solid red; */
  width: 35%;
  box-sizing: border-box;

  display: flex;
  flex-wrap: wrap;

  img {
    width: 3rem;
    height: 3rem;
    margin: 0 0.5rem 0.5rem;
    border-radius: 50%;
    object-fit: cover;
    -webkit-box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.22);
    -moz-box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.22);
    box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.22);
    cursor: pointer;

    &:first-child {
      margin-left: 0;
    }
  }
`;

const ShowContractButton = styled.div`
  /* border: 1px solid red; */
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    border-radius: 4px;
    cursor: pointer;
    padding: 8px 16px;
    background-color: #735f32;
    box-sizing: border-box;
    font-size: 1rem;
    color: rgba(236, 227, 212, 255);
    font-weight: 500;
    border: 2px solid rgb(58, 66, 27);
    border: 2px solid #735f32;
    border: 2px solid #000;
    box-shadow: 3px 3px 0px #735f32;
    box-shadow: 3px 3px 0px #000;
    translate: -3px -3px;
    transition: all 0.15s ease-in;

    &:hover {
      translate: 0;
      box-shadow: 0 0 0;
    }
  }

  h2{
    font-size: 1rem;
    font-weight: 400;
    
    span{
      font-size: 1.2rem;
      font-weight: 600;
      text-transform: uppercase;
      text-decoration: underline;
    }
  }
`;

interface contractCardProps {
  contract: contractProps;
  showContract: any;
  descLength: number
}

const ContractCard = ({ contract, showContract, descLength }: contractCardProps) => {
  
  return (
    <Section>
      <ContractName>
        {/* <StatusStrip status={contract.status} /> */}
        <h2>{contract.contractName}</h2>
        <BsArrow90DegRight />
      </ContractName>
      <ContractDates>
        {getReadableTime(contract.startDate.slice(0, 10))} -{" "}
        {getReadableTime(contract.dueDate.slice(0, 10))}
      </ContractDates>
      <LeadBy>
        Lead by
        <h4>{contract.lead.name}</h4>
      </LeadBy>
      <ContractBrief>
        <p>
          {contract.projectDescription.slice(0, descLength)}
          {contract.projectDescription.length > descLength ? "...." : null}
        </p>
        <MemberPics>
          {contract.team.map((member,index) => {
            return <img src={member.member.photo} alt="memberImg" key={index} />;
          })}
        </MemberPics>
      </ContractBrief>
      <ShowContractButton>
        <h2>Status:- <span>{contract.status}</span></h2>
        <button onClick={() => showContract(contract)}>Show Contract</button>
      </ShowContractButton>
    </Section>
  );
};

export default ContractCard;
