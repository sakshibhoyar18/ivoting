import React, {useEffect, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Loader } from '../components'
import { formatDate } from '../utils';
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { contractAddress } from '../utils';
import { thirdweb } from '../assets';

const Vote = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { state } = useLocation()
    const { contract } = useContract(contractAddress());
    const [Positions, setPositions] = useState([])
    const [CandidateList, setCandidateList] = useState([])
    const { data } = useContractRead(contract, "getAllPositions");
    
    useEffect(() => {
        if(data) {
          const index =  data.findIndex(d =>
            d.positionName === state.positionName &&
            formatDate(parseInt(d.position_date)) === formatDate(parseInt(state.position_date))
          );
          setCandidateList(data[index]);
        }
    }, [data, state.positionName, state.position_date]);
      
    console.log(useContractRead(contract, "voters", '0xdCd8E0fCD7bb974e733a05DcaF6f757a10D4a394'));

    const datas = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'Bob Johnson' },
        { id: 4, name: 'Sara Lee' },
        { id: 5, name: 'Mike Brown' },
    ];
    const handleChange = (event) => {
      setSearchTerm(event.target.value);
    };
    
    const filteredData = datas.filter((row) => {
      return row.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    return (
        <div>
            <section className='mt-10'>
                <h1 className='text-gray-200 font-extrabold text-2xl sm:text-5xl lg:text-4xl tracking-tight text-center dark:text-white'> Vote Now for the Future of Our Country - {state.postionName}</h1>
                <p class="mt-3 text-lg text-slate-600 text-center max-w-3xl mx-auto dark:text-slate-400">Your Voice Matters</p>
                <div className='mt-10'>
                    <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Creator</h4>

                    <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
                        <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                            <img src={thirdweb} alt="user" className="w-[60%] h-[60%] object-contain" />
                        </div>
                        <div>
                            <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">{state[1].electionName}</h4>
                            <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">created by <b>{state[1].electionAddress}</b></p>
                        </div>
                    </div>
                </div>

                <div className='mt-10'>
                    <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Candidates List</h4>

                    <div className="mx-auto w-full px-4 sm:px-6">
                        <div className="flex flex-col justify-between sm:flex-row my-4">
                            <div className="flex-grow">
                            </div>
                            <div className="grid flex-grow justify-items-end">
                                <input
                                    type="text"
                                    placeholder="Search by candidate name"
                                    value={searchTerm}
                                    onChange={handleChange}
                                    className="w-full  rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs"
                                />
                            </div>
                        </div>
                        <div className="-mx-4 sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full overflow-hidden rounded-lg border border-gray-600">
                                <table className="min-w-full">
                                    <thead className="bg-gray-500">
                                        <tr>
                                            <th className="px-4 py-3 w-[100px] text-left text-xs font-medium text-gray-200 uppercase tracking-wider">ID</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Party Image</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Candidate Name</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-[#1c1c24] divide-y divide-gray-200">
                                        {filteredData.map((row, index) => (
                                            <tr key={row.id}>
                                                <td className="px-4 py-3 text-4xl  font-bold text-gray-500 ">{row.id}</td>
                                                <td className="px-4 py-3 text-sm text-gray-500">{row.name}</td>
                                                <td className="px-4 py-3 text-sm text-gray-500">{row.name}</td>
                                                <td></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Vote