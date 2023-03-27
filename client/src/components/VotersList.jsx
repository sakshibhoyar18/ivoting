import React from 'react'
import {thirdweb} from '../assets/index'

const VotersList = ({ voterAddress, name, handleClick }) => {
  return (
    <div className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer" onClick={handleClick}>
    <img src={""} alt="fund" className="w-full h-[158px] object-cover rounded-[15px]"/>

    <div className="flex flex-col p-4">

      <div className="block">
        <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">{name}</h3>
        
      </div>


      <div className="flex items-center mt-[20px] gap-[12px]">
        <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
          <img src={thirdweb} alt="user" className="w-1/2 h-1/2 object-contain"/>
        </div>
        <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">by <span className="text-[#b2b3bd]">{voterAddress}</span></p>
      </div>
    </div>
  </div>
  )
}

export default VotersList