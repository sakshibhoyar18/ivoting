export const formatAddress = (address) => {
    const formattedAddress = `${address.substring(0, 5)}......${address.substring(address.length-2)}`;
    return formattedAddress;
  }
  
export const contractAddress = () => {
  return "0x6aD10037d262Ff6dd84274543376443ffA560273";
}

export const formatDate = (inputDate)  => {
  const inputDates = inputDate.toString();
  const day = inputDates.substring(0, 2);
  const month = inputDates.substring(2, 4);
  const year = inputDates.substring(4);

  const date = new Date(`${year}-${month}-${day}`);

  // Format the date as desired
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return formattedDate;
}
