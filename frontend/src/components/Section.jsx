
import React from 'react';
import bgImage from '../assets/bgImg.jpg';
import { Link } from 'react-router-dom';

function Section() {
  return (
    <div
      className="relative text-center py-20 bg-cover bg-center
       font-section"
      style={{ backgroundImage: `url(${bgImage})`, 
      backgroundRepeat: 'no-repeat' }}
    >
      {/* Overlay for reduced opacity */}
      <div className="absolute inset-0 bg-black 
      opacity-20 z-0"></div>

      {/* Content */}
      <div className="relative z-10">
        <h1 className='text-5xl font-bold text-white 
        my-3'>Gyaanly</h1>
        
        <p className='text-[#FDFBD4] text-3xl font
        -semibold my-7'>
         "Learning Has Never Been This Fun"

        </p>
        <div className='space-x-4 mt-8'>

          <Link to={"/courses"} className='bg-white text-[#2C3E50] py-3 px-6 rounded font-semibold hover:bg-[#292f56] duration-300 hover:text-white'>
              Explore Courses
          </Link>
          <Link to={"/"} className='bg-white text-[#2C3E50] py-3 px-6 rounded font-semibold hover:bg-[#2C3E50] duration-300 hover:text-white'> 
              Courses Videos
          </Link>      
        </div>
      </div>
    </div>
  )
}

export default Section;
