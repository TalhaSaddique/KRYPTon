import React from 'react'
import logo from "../../images/logo.png";

// This component represents the website footer.
const Footer = () => {
  return (
    <div className='w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer'>

      {/* The logo section contains the website logo. */}
      <div className='w-full flex sm:flex-row flex-col justify-between items-center my-4 '>
        <div className='flex flex-[0.5] justify-center items-center '>
          { <img src={logo} alt="logo" className='w-[200px]' /> }
        </div>

        {/* The navigation section contains links to different pages of the website. */}
        <div className='flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full'>
          <p className='text-white text-base text-center mx-2 cursor-pointer'> Market </p>
          <p className='text-white text-base text-center mx-2 cursor-pointer'> Exchange </p>
          <p className='text-white text-base text-center mx-2 cursor-pointer'> Tutorial </p>
          <p className='text-white text-base text-center mx-2 cursor-pointer'> Wallets </p>
        </div>
      </div>

      {/* The join us section contains a message inviting users to join the website. */}
      <div className='flex justify-center items-center flex-col mt-5'>
        <p className='text-white text-sm text-center tracking-wider'> Come Join Us </p>
        <p className='text-white text-md  text-center tracking-wider'> @KRYPTon </p>
      </div>

      {/* This section is a horizontal line that separates the footer content from the rest of the website. */}
      <div className='sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5' />

      {/* The copyright section contains information about the website's ownership. */}
      <div className='sm:w-[90%] w-full flex justify-between items-center mt-3'>
      <p className='text-white text-sm text-center'> @KRYPTon 2023 </p>
      <p className='text-white text-sm text-center'> All rights reserved </p>
      </div>
    </div>
  )
}

export default Footer
