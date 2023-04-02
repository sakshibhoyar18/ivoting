import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Loader } from '../components'
import { thirdweb } from '../assets';
import { formatDate } from '../utils';
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { contractAddress } from '../utils';

const ElectionDetails = () => {
  const position = [];
  const { state } = useLocation();
  const navigate = useNavigate();
  let isLoading = true;

  const { contract } = useContract(contractAddress());

  state.positions.map((pos, i) => {
    const { data } = useContractRead(contract, "positions", parseInt(pos._hex));
    position.push(data)
    isLoading = false;
  })

  const handleClick =(pos,state) => {
    navigate(`/Vote/${pos?.postionName}`, {state: [pos, state]})
  }


  return (
    <div>
      {isLoading && <Loader />}

      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img src={state.electionImage} alt="campaign" className="w-full h-[450px] object-cover rounded-xl" />
          <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
            <div className="absolute h-full bg-[#4acd8d]" style={{ width: "", maxWidth: '100%' }}>
            </div>
          </div>
        </div>

        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <div className="flex flex-col items-center w-[150px]">
            <h4 className="font-epilogue font-bold text-[18px] text-white p-3 bg-[#1c1c24] rounded-t-[10px] w-full text-center truncate">{formatDate(parseInt(state.registrationDeadline._hex))}</h4>
            <p className="font-epilogue font-normal text-[12px] text-[#808191] bg-[#28282e] px-3 py-2 w-full rouned-b-[10px] text-center">{'Registration open till'}</p>
          </div>

          <div className="flex flex-col items-center w-[150px]">
            <h4 className="font-epilogue font-bold text-[18px] text-white p-3 bg-[#1c1c24] rounded-t-[10px] w-full text-center truncate">{formatDate(parseInt(state.date._hex))}</h4>
            <p className="font-epilogue font-normal text-[12px] text-[#808191] bg-[#28282e] px-3 py-2 w-full rouned-b-[10px] text-center">{'Election Date'}</p>
          </div>

        </div>
      </div>

      <div className='flex md:flex-row flex-col gap-[30px]'>
        <div className="mt-[60px] flex lg:flex-row flex-col gap-5 md:w-[50%] w-full">
          <div className="flex-[2] flex flex-col gap-[40px]">
            <div>
              <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Creator</h4>

              <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
                <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                  <img src={thirdweb} alt="user" className="w-[60%] h-[60%] object-contain" />
                </div>
                <div>
                  <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">{state.electionName}</h4>
                  <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">created by <b>{state.electionAddress}</b></p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Location</h4>
              <div className="mt-[20px]">
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">{state.pollingLocations}</p>
              </div>
            </div>

            <div>
              <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Voter ID Requirements</h4>
              <div className="mt-[20px]">
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">{state.voterIDRequirements}</p>
              </div>
            </div>

            <div>
              <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Early Voting Information</h4>
              <div className="mt-[20px]">
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">{state.earlyVotingInformation}</p>
              </div>
            </div>

            <div>
              <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">absentee Voting Information</h4>
              <div className="mt-[20px]">
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">{state.absenteeVotingInformation}</p>
              </div>
            </div>
          </div>

        </div>

        <div className='md:mt-[60px]'>
          <h1 className="font-epilogue font-semibold text-[18px] text-white uppercase">Available Positions</h1>
          {
            position.length > 0 ?
            <>
            <div className='flex md:flex-row flex-col mt-10 gap-[20px]'>
            {
              position.map((pos) => {
                return <>
                  <div className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer" onClick={() => handleClick(pos,state)} title={pos?.postionName}>
                    <img src={pos?.positionImage} alt="electionImage" className="w-full h-[158px] object-cover rounded-[15px]" />

                    <div className="flex flex-col p-4">
                    
                      <div className="block">
                        <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">{pos?.postionName}</h3>
                        <h3 className="font-epilogue text-[14px] text-gray-400 text-left leading-[26px] truncate">{pos?.description}</h3>
                      </div>

                      <div className="flex items-center gap-[12px] mt-2">
                        

                      </div>
                    </div>
                  </div>
                </>
              })
            }
            </div>
            </>
              : 'NO'
          }
        </div>
      </div>
    </div>
  )
}

export default ElectionDetails