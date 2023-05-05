import React, { useContext, useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { Loader } from "./";

// Import context and utility functions
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress, shortenBalance } from "../utils/shortener";

// Common styles for input and grid items
const commonStyles =
  "min-h-[70px] sm:px0 px2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

// Input component
const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name, " changed ")}
    // Styles for input component
    className="my-2 w-full rounded-m p-2 animate-pulse outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);

// Welcome component
const Welcome = () => {
  const {
    connectWallet,
    currentAccount,
    formData,
    handleChange,
    sendTransaction,
    balance,
    isLoading,
  } = useContext(TransactionContext);

  // Handle form submission
  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData;
    e.preventDefault();
    // Check if all required fields are filled
    if (!addressTo || !amount || !keyword || !message) {
      window.alert("Please fill out all the required fields.");
    } else {
      sendTransaction();
    }
  };

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
        {/* Left section */}
        <div className="flex flex-1 justify-start flex-col mf:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            Send Crypto <br /> across the world
          </h1>
          <p className="text-left  mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            Explore the crypto world. Buy and sell cryptocurrencies easily on
            KRYPTon.
          </p>
          {/* Connect wallet button */}
          {!currentAccount && (
            <button
              type="button"
              className="flex flex-row justify-center items-center rounded-full my-5 p-3 bg-blue-600 hover:bg-blue-700"
              onClick={connectWallet}
            >
              <p className="text-white md:text-lg text-base font-semibold">
                Connect Wallet
              </p>
            </button>
          )}
          {/* Features grid */}
          <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-5">
            <div className={`rounded-tl-2xl ${commonStyles}`}>Reliability</div>
            <div className={`rounded-tr-2xl sm:rounded-none ${commonStyles}`}>
              Secuirty
            </div>
            <div className={`sm:rounded-tr-2xl ${commonStyles}`}>Ethereum</div>
            <div className={`sm:rounded-bl-2xl ${commonStyles}`}>Web 3.0</div>
            <div className={`rounded-bl-2xl sm:rounded-none ${commonStyles}`}>
              Low Fees
            </div>
            <div className={`rounded-br-2xl ${commonStyles}`}>Blockchain</div>
          </div>
        </div>
        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          {/* Account balance card */}
          <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism">
            <div className="flex justify-between flex-col w-full h-full">
              {/* Ethereum logo and info icon */}
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <SiEthereum fontSize={21} color="white" />
                </div>
                <BsInfoCircle fontSize={17} color="text-slate-900" />
              </div>
              {/* Account address and balance */}
              <div className="flex justify-between items-start ">
                <div>
                  <p className="text-white font-light text-sm">
                    {/* If current account exists, display shortened address, else display "Account" */}
                    {currentAccount
                      ? shortenAddress(currentAccount)
                      : "Account"}
                  </p>
                  <p className="text-white font-semibold text-lg mt-1">
                    Ethereum
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-slate-800 font-bold text-sm">
                    {/* If current account exists, display shortened balance in ETH, else display "0.000 ETH" */}
                    {currentAccount
                      ? `${shortenBalance(balance)} ETH`
                      : `0.000 ETH`}
                  </p>
                  <p className="text-slate-900 font-semibold text-lg mt-1">
                    Balance
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Input form */}
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            {/* Input field for recipient address */}
            <Input
              placeholder="Address To"
              name="addressTo"
              type="text"
              handleChange={handleChange}
            />
            {/* Input field for amount to be sent */}
            <Input
              placeholder="Amount (ETH)"
              name="amount"
              type="number"
              handleChange={handleChange}
            />
            {/* Input field for search keyword */}
            <Input
              placeholder="Keyword (Gif)"
              name="keyword"
              type="text"
              handleChange={handleChange}
              onClick={() => {
                className = "animate-none";
              }}
            />
            {/* Input field for message */}
            <Input
              placeholder="Enter Message"
              name="message"
              type="text"
              handleChange={handleChange}
            />
            {/* Horizontal line */}
            <div className="h-[1px] w-full bg-gray-400 my-2" />
            {/* Button to send transaction */}
            {isLoading ? (
              <Loader />
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="text-white font-semibold w-full mt-2 border-[1px] p-2 border-slate-700 rounded-full hover:transition ease-in-out delay-150 bg-blue-600 hover:-translate-y-1 hover:scale-100 hover:bg-blue-700 duration-300"
              >
                Send Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
