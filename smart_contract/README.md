# KRYPTon Smart Contracts

This folder contains the Solidity smart contracts for KRYPTon, a React and Solidity based dApp for sending Ethereum on the Goerli and Sepolia testnets.



## Installation

1. Clone the KRYPTon repository using the following command:

    ```
    git clone https://github.com/TalhaSaddique/KRYPTon.git
    ```

2. Change directory to the SmartContract folder using the following command:

    ```
    cd smart_contract
    ```

3. Install the dependencies using the following command:

    ```
    npm install
    ```


## Adding API URLs and Account Private Key

1. Open the `.env` file located in the root directory of the SmartContract folder.

2. Add the Goerli testnet API URL using the following format:

    ```
    GOERLI_API_URL=" <API URL> "
    ```

3. Add the Sepolia testnet API URL using the following format:

    ```
    SEPOLIA_API_URL= " <API URL> "
    ```
4.  Add the Private Key of your Goerli or Sepolia testnet Account to pay the gas fee of smart contract deployment using the following format:

     ```
    ACCOUNTS=" Private Key "
    ```

5. Save and close the `.env` file.



## Deploying the Smart Contracts

1. To deploy the contracts to the Goerli testnet, run the following command:

    ```
    npx hardhat run scripts/deploy.js --network goerli
    ```

2. To deploy the contracts to the Sepolia testnet, run the following command:

    ```
    npx hardhat run scripts/deploy.js --network sepolia
    ```

3. After deploying the contracts, copy the contract addresses and ABIs to the `constants.js` file located in the `client/src` folder.


# ENJOY!