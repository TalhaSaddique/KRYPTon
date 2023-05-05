require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.0",
  networks: {
    sepolia: {
      id: 5,
      url: process.env.SEPOLIA_API_URL,
      accounts: [process.env.ACCOUNTS]
    },
    goerli: {
      url: process.env.GOERLI_API_URL,
      accounts: [process.env.ACCOUNTS]
    }
  }
};
