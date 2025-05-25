import React from 'react'
import { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';
import TradeMark from './TradeMark';
import { useContext } from 'react';
import { ThemeContext } from '../Context/ThemeContext';
import './Home.css'
const Home = () => {

  const {theme} = useContext(ThemeContext)

  const animations = ['PastPapers', 'Outlines', 'TimeTable', 'Faculty-Contact'];



  const [dep, setdep] = useState('');
  const navigate = useNavigate();
  const dephandling = (e) => {
    const selectedep = e.target.value;
    setdep(selectedep)
    if (selectedep) {
      navigate(`/menu?department=${selectedep}`)
    }
  }


  // const [lines,setlines] = useState([]);
  // const [currheading,setcurrheading] = useState(0);
  // const [displaytext,setdisplaytext] = useState('');
  // const [charIndex,setcharIndex] = useState(0);

  // useEffect(()=>{
  //   if(currheading < animations.length){
  //     if(charIndex < animations[currheading].length){
  //       const timeout = setTimeout(()=>{
  //         setdisplaytext((prev) => prev + animations[currheading][charIndex]);
  //         setcharIndex((prev) => prev + 1);
  //       },100);
  //       return ()=> clearTimeout(timeout)
  //     }
  //     else{
  //       const newTimeout = setTimeout(()=>{
  //         setlines((prev) => [...prev,animations[currheading]]);
  //         setcurrheading((prev)=>prev + 1);
  //         setdisplaytext('');
  //         setcharIndex(0);
  //       },1000)
  //       return () => clearTimeout(newTimeout)
  //     }
  //   }
  //   else{
  //     const restartTimeout = setTimeout(()=>{
  //       setlines([]);
  //       setcurrheading(0);
  //       setcharIndex(0);
  //       setdisplaytext('');
  //     },1000)
  //     return () => clearTimeout(restartTimeout);
  //   }
  // },[charIndex,currheading]);







  return (
    <div>

      <Navbar />

      <div className='w-full h-[200px] flex justify-center items-center relative top-[50px]'>
        <h1 className={`text-6xl font-bold text-center text-black ${theme === 'light' ? "text-black":"text-white"} font-Saira`}>
          Welcome to <span className='bg-gradient-to-r from-[#9382e0] to-[#5d4d8a] bg-clip-text text-transparent font-Saira'>CampusPlus</span>  <br /> <span className='relative top-5'>One Stop for All Your <span className='bg-gradient-to-r from-[#9382e0] to-[#5d4d8a] bg-clip-text text-transparent font-Saira' >Academic Needs</span></span>
        </h1>
      </div>
      <div className="flex justify-center items-center flex-col  h-[300px] mb-[200px] relative top-[50px]">
        <h1 className="bg-gradient-to-r from-[#9783EE] to-[#725DAC] py-[200px] w-[600px] h-[50px] flex items-center justify-center text-center text-md relative -top-4 text-white rounded-[50px] text-2xl font-Saira shadow-md shadow-black/30">Select Department</h1>
        <select
          onChange={dephandling}
          value={dep}
          className={`bg-[#E3E3F3] text-[20px] appearance-none indent-1 h-[60px] w-[600px] rounded-[50px] text-xl px-4 text-center border-none outline-none cursor-pointer ${theme === 'light' ? "bg-[#E3E3F3] " : "bg-[#b3b3b6] text-black"} `}

          style={{ overflowY: 'scroll' }}
        >
          <option value="" className='rounded-lg'>Select Department</option>
          <option value="Computer Science " className='rounded-lg'>Computer Science</option>
          <option value="Software Engineering" className='rounded-lg'>Software Engineering</option>
          <option value="Information Technology" className='rounded-lg'>Information Technology</option>
        </select>
      </div>
      <div className=' flex items-center justify-center h-[100px] relative top-[100px]'>

      <div
  className={`outer relative shadow-md ${
    theme === 'dark' ? 'dark-gradient' : 'light-gradient'
  } `}
>
  <div className="inner">
    <span className="font-semibold text-2xl bg-gradient-to-r from-[#9382e0] to-[#5d4d8a] bg-clip-text text-transparent font-Saira">Past Papers</span>
    <span className="font-semibold text-2xl bg-gradient-to-r from-[#9382e0] to-[#5d4d8a] bg-clip-text text-transparent font-Saira">Outlines</span>
    <span className="font-semibold text-2xl bg-gradient-to-r from-[#9382e0] to-[#5d4d8a] bg-clip-text text-transparent font-Saira">Time Tables</span>
    <span className="font-semibold text-2xl bg-gradient-to-r from-[#9382e0] to-[#5d4d8a] bg-clip-text text-transparent font-Saira">Contact Faculty</span>

    <span className="font-semibold text-2xl bg-gradient-to-r from-[#9382e0] to-[#5d4d8a] bg-clip-text text-transparent font-Saira">Past Papers</span>
    <span className="font-semibold text-2xl bg-gradient-to-r from-[#9382e0] to-[#5d4d8a] bg-clip-text text-transparent font-Saira">Outlines</span>
    <span className="font-semibold text-2xl bg-gradient-to-r from-[#9382e0] to-[#5d4d8a] bg-clip-text text-transparent font-Saira">Time Tables</span>
    <span className="font-semibold text-2xl bg-gradient-to-r from-[#9382e0] to-[#5d4d8a] bg-clip-text text-transparent font-Saira">Contact Faculty</span>
  </div>
</div>

      </div>



    </div>
  )
}
export default Home
