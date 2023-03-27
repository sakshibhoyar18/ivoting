import React, { useContext, createContext, useEffect, useState } from 'react';
import { useAddress, useContract, useContractRead ,  useMetamask } from '@thirdweb-dev/react';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const [voters, setvoters] = useState([])
    const { contract } = useContract("0x3268ea57366942C8fc9500c1Ddc7e92301dD69d2");
    
    const address = useAddress();
    const connect = useMetamask();
  
    const { getAllVoters, isLoading } = useContractRead(contract, "getAllVoters")

    useEffect(() => {
        if(getAllVoters == undefined)  setvoters(getAllVoters)
    }, [getAllVoters])
    return (
        <StateContext.Provider
            value={{
                address,
                contract,
                connect,
                voters
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);