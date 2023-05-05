// Importing the Hardhat Runtime Environment (HRE) for deploying the smart contract
const hre = require("hardhat");

// Main function to deploy the smart contract
const main = async () => {
// Getting the Transactions contract factory using HRE
const Transactions = await hre.ethers.getContractFactory("Transactions");

// Deploying the Transactions contract
const transactions = await Transactions.deploy();

// Waiting for the contract to be deployed
await transactions.deployed();

// Logging the address of the deployed Transactions contract
console.log("Transactions deployed to", transactions.address);
};

// Function to run the main function and catch any errors
const runMain = async () => {
try {
await main();
process.exit(0);
} catch (error) {
console.log(error);
process.exit(1);
}
};

// Running the runMain function
runMain();