import { useContract, useContractRead } from "@thirdweb-dev/react";

export default function Component() {
  const { contract } = useContract("0x3268ea57366942C8fc9500c1Ddc7e92301dD69d2");
  const { data, isLoading } = useContractRead(contract, "getAllVoters")
  
}