import React, { useState } from 'react';

const Navbar = () => {

  const [dark , setdark] = useState(false)
  const enabledark = ()=>{
    setdark(!dark)
    if(!dark)
    {
      document.body.style.backgroundColor = "black";
      document.body.style.color = "white"
    }
    else
    {
      document.body.style.backgroundColor = "white"
      document.body.style.color = "black"
    }
  }
  return (
    <div>
      <div className="w-full h-[70px] bg-gradient-to-r from-[#3C6CC9] via-[#1668D7] to-[#334D9F] flex items-center justify-center text-white text-2xl font-bold ">
        <div>
        <h2>CampusPlus</h2>
        <p className='text-sm'> - Everything Here!</p>
        </div>
        <button 
          className="ml-4 px-4 py-2 bg-black text-white rounded flex items-center"
          onClick={enabledark}
        >
          <i className={`mr-2 ${dark ? 'fas fa-sun' : 'fas fa-moon'}`}></i>
         
        </button>
      </div>
    </div>
  );
};

export default Navbar;
