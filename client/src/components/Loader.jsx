// This is the Loader component that displays a spinning animation
// while content is being loaded
import React from 'react'

const Loader = () => {
  return (
    // The outer div uses flexbox to center the loader vertically
    <div className="flex justify-center items-center py-3">
      {/* The inner div contains the spinning animation using the 
      'animate-spin' class from Tailwind CSS and styling */}
      <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-red-700' />
    </div>
  )
}

export default Loader
