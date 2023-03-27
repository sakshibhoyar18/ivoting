import React from 'react'
import { loader } from '../assets';
import VotersList from './VotersList';
import { useNavigate } from 'react-router-dom';

const DisplayVoters = ({ title, isLoading, voters}) => {
  const navigate = useNavigate();

  const handleNavigate = (voter) => {
    console.log(voter);
    navigate(`/voter-details/${voter.voterAddress}`, { state: voter })
  }
  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">{title}({voters.length})</h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
        )}

        {!isLoading && voters.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campigns yet
          </p>
        )}

        {!isLoading && voters.length > 0 && voters.map((voter) => <VotersList 
          key={voter.id}
          {...voter}
          handleClick={() => handleNavigate(voter)}
        />)}
      </div>
    </div>
  )
}

export default DisplayVoters