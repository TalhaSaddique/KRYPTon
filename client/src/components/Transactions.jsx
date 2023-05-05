import React, { useContext, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortener";
import useFetch from "../hooks/useFetch";
import { Route } from "react-router-dom";

// TransactionCard component to render each individual transaction
const TransactionCard = ({
  addressTo,
  addressFrom,
  timestamp,
  message,
  keyword,
  amount,
  url,
  testnet,
}) => {
  // useFetch hook to fetch a GIF based on the transaction keyword
  const gifUrl = useFetch({ keyword });

  return (
    <div
      className="bg-[#181918] m-4 flex flex-1
    2xl:min-w-[450px]
    2xl:max-w-[500px]
    sm:min-w-[270px]
    sm:max-w-[300px]
    flex-col p-3 rounded-md hover:shadow-2xl"
    >
      <div className="flex flex-col items-center w-full mt-3">
        <div className="w-full mb-6 p-2">
          {testnet === "goerli" ? (
            <>
              <a
                href={`https://goerli.etherscan.io/address/${addressFrom}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className="text-white text-base">
                  From: {shortenAddress(addressFrom)}
                </p>
              </a>

              <a
                href={`https://goerli.etherscan.io/address/${addressTo}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className="text-white text-base">
                  TO: {shortenAddress(addressTo)}
                </p>
              </a>
            </>
          ) : (
            <>
              <a
                href={`https://sepolia.etherscan.io/address/${addressFrom}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className="text-white text-base">
                  From: {shortenAddress(addressFrom)}
                </p>
              </a>

              <a
                href={`https://sepolia.etherscan.io/address/${addressTo}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className="text-white text-base">
                  TO: {shortenAddress(addressTo)}
                </p>
              </a>
            </>
          )}
          <p className="text-white text-base">Amount: {amount} ETH</p>
          {message && (
            <>
              <br />
              <p className="text-white text-base">Message: {message}</p>
            </>
          )}
        </div>
        <img
          src={gifUrl || url}
          alt="gif"
          className="w-full h-64 2x:h-96 rounded-md shadow-lg object-cover"
        />
        <div className="bg-gray-900 p-3 px-5 w-max rounded-3xl justify-center items-center -mt-3 shadow-2xl">
          <p className="text-[#37c7da] font-bold ">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};

// Transactions component to render all transactions
const Transactions = () => {
  // access transactions and current account from the TransactionContext
  const { currentAccount, transactions, testnet } =
    useContext(TransactionContext);
  // use state to track the number of transactions to display
  const [showMore, setShowMore] = useState(5);

  return (
    <div className="flex w-full justify-center items-conter 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        {/* Display a message depending on whether an account is connected */}
        {currentAccount ? (
          <h3 className="text-white text-3xl text-center -2">
            Latest Transactions
          </h3>
        ) : (
          <h3 className="text-white text-3xl text-center -2">
            Connect your account to see the latest transactions.
          </h3>
        )}

        {/* Display the transaction cards */}
        <div className="flex flex-wrap justify-center items-center mt-10">
          {[...transactions]
            .reverse()
            .slice(0, showMore)
            .map((transaction, i) => {
              return (
                <TransactionCard key={i} {...transaction} testnet={testnet} />
              );
            })}
        </div>

        {/* Show a "Show More" button if there are more transactions to show */}
        {showMore < [...transactions].length && (
          <div className="flex items-center justify-center ">
            <button
              className="text-cyan-500 bg-black hover:text-cyan-400 shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/100 transform hover:scale-110 transition-all duration-200 font-bold text-lg rounded-full px-5 py-2"
              onClick={() => setShowMore(showMore + 5)}
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;