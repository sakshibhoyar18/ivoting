import React, { useState, useEffect } from 'react'
import { useContract, useContractRead } from "@thirdweb-dev/react";
import DisplayElections from '../components/DisplayElections';
import { contractAddress } from '../utils';

const Home = () => {  
  const { contract } = useContract(contractAddress());
  const { data, isLoading } = useContractRead(contract, "getAllElections")

  return (
    <div>
      <section className='mt-12'>
        <h1 className='mt-4 text-2xl sm:text-3xl text-gray-300 font-extrabold tracking-tight dark:text-gray-600 '>Upcoming Elections</h1>
        <p className='mt-2 text-sm text-gray-400 dark:text-gray-600'> list of all the upcoming elections that the user is eligible to vote in, along with the date and time. This can help users stay informed about when and where they need to vote.</p>
       
       <DisplayElections 
        isLoading={isLoading}
        elections={!isLoading ? data : isLoading} 
       />
      </section>
    </div>
  )
}

export default Home