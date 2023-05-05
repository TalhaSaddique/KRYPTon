# KRYPTon - Getting Started

This guide will walk you through the process of setting up and running KRYPTon, a React and Solidity based dApp for sending Ethereum on the Goerli and Sepolia testnets.

## Installation

1. Clone the KRYPTon repository using the following command:

    ```bash
    git clone https://github.com/TalhaSaddique/KRYPTon.git
    ```

2. Change directory to the client folder using the following command:

    ```bash
    cd client
    ```

3. Install the dependencies using the following command:

    ```bash
    npm install
    ```

## Adding Testnet Smart Contracts

1. Open the `constants.js` file located in the `client/src/utils` folder.

2. Paste the address of smart contract deployed to the Goerli testnet in the `goerliContractAddress` variable.

3. Paste the address of smart contract deployed to the Sepolia testnet in the `sepoliaContractAddress` variable .

4. Paste the the abi of you smart contract in the `abi` variable.


## Adding GIPHY API Key

1. Create an account on GIPHY and obtain an API key.

2. Open the `.env` file located in the `client` folder.

3. Paste your API key into the `VITE_GIPHY_API_KEY` variable.

## Running the Development Server

1. In the `client` folder, run the following command to start the development server:

    ```bash
    npm run dev
    ```

2. Open your web browser and navigate to the URL provided by the development server.

   **Note:** If the URL is not clickable, you can copy and paste it into your web browser.

# Enjoy using KRYPTon!

