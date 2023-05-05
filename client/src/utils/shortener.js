// This function takes an Ethereum address as input and shortens it to the format "0x1234...5678"
export const shortenAddress = (address) =>
  `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;

// This function takes an Ethereum balance as input and shortens it to the format "123.456 " with 3 decimal places
// If the balance is null or undefined, it returns "0.000 "
export const shortenBalance = (balance) => `${balance ? balance.slice(0,6) : '0.000'} `;
