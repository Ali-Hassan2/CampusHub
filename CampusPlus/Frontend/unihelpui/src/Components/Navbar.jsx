import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { ThemeContext } from '../Context/ThemeContext';
import { useContext } from 'react';



const Navbar = () => {

  const { theme, settheme } = useContext(ThemeContext);

  const themehandling = () => {
    settheme(theme === 'light' ? 'dark' : 'light');
  };



  return (
    <div>
      <nav className='w-full h-[100px] flex items-center justify-center py-2  ' >
        <div className="w-[800px] h-[70px] bg-white flex items-center justify-center text-white text-2xl font-bold pl-4 pr- rounded-[50px] shadow-md shadow-black/30">




          <div className="right flex flex-1 items-center h-[100%] justify-around">
            <h2 className="text-3xl font-bold relative  bg-gradient-to-r from-[#9382e0] to-[#5d4d8a] bg-clip-text text-transparent font-Saira">
              Campus<span>Plus</span>
            </h2>

          </div>

          <div className="flex-1 h-full flex items-center gap-[40px] justify-center">
      {["Home", "About Us"].map((text, idx) => (
        <h4 key={idx} className="relative group">
          <Link
            to={text === "Home" ? "/" : "/aboutus"}
            className="text-[#725DAC] text-[18px] font-normal font-Saira"
          >
            {text}
          </Link>
          <span
            className="
              absolute bottom-0 left-0 h-[2px] bg-[#725DAC] 
              w-0 group-hover:w-full transition-[width] duration-300 ease-in-out
            "
          ></span>
        </h4>
      ))}
    </div>

          <div className="left flex-1 h-[100%]  flex justify-center items-center">
            <button class="text-white font-bold w-33 h-10 rounded-[20px] bg-gradient-to-r from-[#9783EE] to-[#725DAC] text-[18px] shadow-md shadow-black/30 hover:opacity-90 transition duration-300 cursor-pointer" onClick={themehandling}>
              Enable {theme === 'light' ? "Dark" : "Light"}
            </button>

          </div>



        </div>
      </nav>
    </div>
  );
};

export default Navbar;
