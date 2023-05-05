import React, { useState, useContext } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { TransactionContext } from "../context/TransactionContext";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {

  // Get required variables and functions from context
  const {
    connectWallet,
    currentAccount,
  } = useContext(TransactionContext);

  // Toggle menu state
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    // Navigation bar
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      
      {/* Logo */}
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <Link to="/" className="flex items-center gap-2" onClick={() => handleClick("")}>
          <img src={logo} alt="logo" className="w-[200px] md:w-[250px]  pt-2 cursor-pointer" />
        </Link>
      </div>

      {/* Navigation links */}
      <ul className="text-white md:flex sm:flex hidden list-none flex-row justify-between items-center flex-initial">
        {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
          <li key={index} className="mx-4 cursor-pointer">{item}</li>
        ))}
        <li>
          {/* Render Login button if user is not logged in, otherwise show user's address */}
          { !currentAccount ? (
            <button className="bg-blue-600 py-2 px-7 mx-4 rounded-full hover:bg-blue-700 lg:block hidden"
              onClick={connectWallet}
            >
              Login
            </button>
          ) : ( 
            <button className="bg-blue-600 py-2 px-7 mx-4 rounded-full hover:bg-blue-700 lg:block hidden">
              {currentAccount.slice(0, 5) + '...' + currentAccount.slice(38, 42)}
            </button>
          )}
        </li>
      </ul>

      {/* Menu button for small screens */}
      <div className="flex relative">
        {toggleMenu ? (
          <AiOutlineClose
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <HiMenuAlt4
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(true)}
          />
        )}

        {/* Menu items for small screens */}
        {toggleMenu && (
          <ul className="z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in">
            <li className="text-white w-full my-2">
              <AiOutlineClose onClick={() => setToggleMenu(false)} />
            </li>
            {["Market", "Exchange", "Tutorials", "Wallets"].map((item , index) => (
              <li
                key={index}
                className={`text-white-100 hover:text-white text-[20px] gap-10 my-2 font-medium cursor-pointer`}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
