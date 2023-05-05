import React from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";

// ServiceCard component
const ServiceCard = ({ color, title, icon, subtitle }) => {
  return (
    <div className="flex flex-row justify-start items-center white-glassmorphism p-3 m-3 cursor-pointer hover:shadow-xl w-full">
      <div
        className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}
      >
        {icon}
      </div>
      <div className="ml-5 flex flex-col flex-1">
        <h1 className="mt-2 text-white text-lg">{title}</h1>
        <p className="mt-2 text-white  text-sm md:w-9/12">{subtitle}</p>
      </div>
    </div>
  );
};

// Services component
const Services = () => {
  return (
    <div className="flex flex-col md:flex-row w-full justify-center items-center gradient-bg-services">
      <div className="flex mf:flex-row flex-col items-center justify-between md: p-20 py-12 px-4">
        {/* Left section */}
        <div className="flex-1 flex flex-col justify-start items-start">
          <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient">
            Services that we
            <br />
            continue to improve
          </h1>
        </div>

        {/* Right section */}
        <div className="flex-1 flex flex-col justify-start items-center">
          {/* ServiceCard 1 */}
          <ServiceCard
            color="bg-blue-700"
            title="Secuirty Guranteed" // Card title
            icon={<BsShieldFillCheck fontSize={21} className="text-white" />} // Icon for the card
            subtitle="~WARNING~TESTNET ONLY: Do not use real ETH! This is a test environment, no real value!" // Card subtitle
          />
          
          {/* ServiceCard 2 */}
          <ServiceCard
            color="bg-violet-500"
            title="Best Exchange Rates" // Card title
            icon={<BiSearchAlt fontSize={21} className="text-white" />} // Icon for the card
            subtitle="Stay Ahead of the Game with Real-Time Best Exchange Rates on Our Platform" // Card subtitle
          />
          
          {/* ServiceCard 3 */}
          <ServiceCard
            color="bg-red-500"
            title="Fastest Transactions" // Card title
            icon={<BsShieldFillCheck fontSize={21} className="text-white" />} // Icon for the card
            subtitle="Experience Lightning-Fast Transactions with Our Platform" // Card subtitle
          />
        </div>
      </div>
    </div>
  );
};

export default Services;
