import React from 'react'
import { formatDate } from '../utils'

const ElectionList = ({ electionName, electionAddress, date, votingEligibilty, registrationDeadline, electionImage, handleClick }) => {
    const dateConverted = hex => parseInt(hex, 16)

    return (
        <div className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer" onClick={handleClick} title={electionName}>
            <img src={electionImage} alt="electionImage" className="w-full h-[158px] object-cover rounded-[15px]" />

            <div className="flex flex-col p-4">

                <div className="block">
                    <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">{electionName}</h3>
                </div>

                <div className="flex items-center gap-[12px] mt-2">
                    <div className="w-3/6 items-center gap-[12px]">
                        <p className="font-epilogue font-normal text-[12px] text-[#808191] truncate">Start:</p>
                        <p className="font-epilogue font-normal text-[12px] text-white">{formatDate(dateConverted(date._hex))}</p>
                    </div>
                    <div className="w-3/6 items-center gap-[12px]">
                        <p className="font-epilogue font-normal text-[12px] text-[#808191] truncate">Deadline:</p>
                        <p className="font-epilogue font-normal text-[12px] text-white">{formatDate(dateConverted(registrationDeadline._hex))}</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ElectionList