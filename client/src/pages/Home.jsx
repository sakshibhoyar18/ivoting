import React, { useState, useEffect } from 'react'
import { useContract, useContractRead } from "@thirdweb-dev/react";
import DisplayVoters from '../components/DisplayVoters';
import { thirdweb } from '../assets'
import { contractAddress } from '../utils';

const Home = () => {
  const [allVoters, setallVoters] = useState([])
  const { contract } = useContract(contractAddress());
  const { data, isLoading } = useContractRead(contract, "getAllVoters")


  return (
    <div>
      <section className='mt-12'>
        <h1 className='mt-4 text-2xl sm:text-3xl text-gray-300 font-extrabold tracking-tight dark:text-gray-600 '>Upcoming Elections</h1>
        <p className='mt-2 text-sm text-gray-400 dark:text-gray-600'> list of all the upcoming elections that the user is eligible to vote in, along with the date and time. This can help users stay informed about when and where they need to vote.</p>
        
        <div className="mt-10 flex flex-wrap mt-[20px] gap-[26px]">
          <div className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer" onClick={""}>
            <img src={"https://english.cdn.zeenews.com/sites/default/files/2019/05/23/789044-lok-sabha-election-2019-res.jpg"} alt="upcoming-election" className="w-full h-[158px] object-cover rounded-[15px]" />
            <div className="flex flex-col p-4">
              <div className="block">
                <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">Hello</h3>
              </div>
              <div className="flex items-center mt-[20px] gap-[12px]">
                <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
                  <img src={thirdweb} alt="user" className="w-1/2 h-1/2 object-contain" />
                </div>
                <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">by <span className="text-[#b2b3bd]">{"asasas"}</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home