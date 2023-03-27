export const formatAddress = (address) => {
    const formattedAddress = `${address.substring(0, 5)}......${address.substring(address.length-2)}`;
    return formattedAddress;
  }
  
export const contractAddress = () => {
  return "0xC8d229d9A949A0cb5AC642F9F44Cec2437662b6d";
}