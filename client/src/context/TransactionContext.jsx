import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  contractABI,
  goerliContractAddress,
  sepoliaContractAddress,
} from "../utils/constants";

export const TransactionContext = React.createContext();

// Function to create an instance of the contract
const createEthereumContract = async () => {
  if (typeof ethereum === "undefined") {
    throw new Error("MetaMask not detected");
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  let contractAddress;

  const network = await provider.getNetwork();
  if (network.name === "goerli") {
    contractAddress = goerliContractAddress;
  } else {
    contractAddress = sepoliaContractAddress;
  }

  const transactionsContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
  return transactionsContract;
};

export const TransactionProvier = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [balance, setBalance] = useState(0);
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );
  const [transactions, setTransactions] = useState([]);
  const [testnet, setTestnet] = useState("");
  const provider = window.ethereum
    ? new ethers.providers.Web3Provider(window.ethereum)
    : null;

  // Function to handle changes in form input fields
  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  // Function to get all transactions from the contract
  const getAllTransactions = async () => {
    try {
      if (window.ethereum) {
        const transactionContract = await createEthereumContract();
        const availableTransactions =
          await transactionContract.getAllTransactions();
        const structuredTransactions = await availableTransactions.map(
          (transaction) => ({
            addressTo: transaction.receiver,
            addressFrom: transaction.sender,
            timestamp: new Date(
              transaction.timestamp.toNumber() * 1000
            ).toLocaleString(),
            message: transaction.message,
            keyword: transaction.keyword,
            amount: parseInt(transaction.amount._hex) / 10 ** 18,
          })
        );
        const network = await provider.getNetwork();
        if (network.name === "goerli") {
          setTestnet("goerli");
        } else {
          setTestnet("sepolia");
        }
        setTransactions(structuredTransactions);
      } else {
        window.alert("Please Install MetaMsk");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to check if a wallet is connected
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        window.alert("Please Install Metamask");
      }
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        console.log("Connected");
        getAllTransactions();
      } else {
        console.log("Not Connected");
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  // Function to check if transactions exist
  const checkIfTransactionsExist = async () => {
    try {
      const transactionContract = await createEthereumContract();
      const transactionCount = await transactionContract.getTransactionCount();
      window.localStorage.setItem("transactionCount", transactionCount);
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum === "undefined") {
        alert("Please install MetaMask to use this dApp");
      } else {
        // Request user's accounts
        await window.ethereum.request({ method: "eth_requestAccounts" });
        // Connect to provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // Get signer
        const signer = provider.getSigner();
        // Get current account address
        const address = await signer.getAddress();
        // Set current account state
        setCurrentAccount(address);
        // Get all transactions
        await getAllTransactions();
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object.");
    }
  };

  const getBalance = async () => {
    try {
      // Check if wallet is connected
      if (currentAccount) {
        // Get balance of current account
        const Balance = await provider.getBalance(currentAccount);
        // Format balance in Ether
        const balanceInEther = ethers.utils.formatEther(Balance);
        // Set balance state
        setBalance(balanceInEther);
      }
    } catch (error) {
      console.log(error);
      throw new Error("Wallet Not Connected");
    }
  };
  // Call getBalance function
  getBalance();

  const sendTransaction = async () => {
    try {
      // Check if MetaMask is installed
      const { ethereum } = window;
      if (ethereum) {
        // Get form data
        const { addressTo, amount, keyword, message } = formData;
        // Create Ethereum contract
        const transactionContract = await createEthereumContract();
        // Parse amount to wei
        const parsedAmount = ethers.utils.parseEther(amount);
        // Send transaction
        await ethereum.request({
          method: "eth_sendTransaction",
          params: [
            {
              from: currentAccount,
              to: addressTo,
              gasLimit: "0x2508",
              value: parsedAmount._hex,
            },
          ],
        });
        // Add transaction to blockchain
        const transactionHash = await transactionContract.addTransaction(
          addressTo,
          parsedAmount,
          message,
          keyword
        );
        // Set loading state to true
        setIsLoading(true);
        // Wait for transaction to be confirmed
        await transactionHash.wait();
        // Set loading state to false
        setIsLoading(false);
        // Get number of transactions
        const transactionsCount =
          await transactionContract.getTransactionCount();
        // Set transaction count state
        setTransactionCount(Number(transactionsCount).toString());
        // Reload page
        window.location.reload();
      } else {
        window.alert("Please Install MetaMask");
      }
    } catch (error) {
      console.log(error);
      throw new Error("Error sending transaction");
    }
  };

  // Call checkIfWalletIsConnected and checkIfTransactionsExist functions when component mounts
  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfTransactionsExist();
  }, []);

  // Return TransactionContext.Provider with value and children props
  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        balance,
        formData,
        handleChange,
        sendTransaction,
        transactions,
        isLoading,
        testnet,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
