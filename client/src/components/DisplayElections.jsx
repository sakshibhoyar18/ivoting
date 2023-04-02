import React from 'react'
import { loader } from '../assets';
import ElectionList from './ElectionList';
import { useNavigate } from 'react-router-dom';

const DisplayElections = ({ isLoading, elections}) => {
  const navigate = useNavigate();

  const handleNavigate = (election) => {
    navigate(`/ElectionDetails/${election.electionAddress}`, { state: election })
  }
  return (
    <div className='mt-10'> 
      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
        )}

        {!isLoading && elections.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any Elections yet
          </p>
        )}

        {!isLoading && elections.length > 0 && elections.map((election) => <ElectionList 
          key={election.id}
          {...election}
          handleClick={() => handleNavigate(election)}
        />)}
      </div>
    </div>
  )
}

export default DisplayElections