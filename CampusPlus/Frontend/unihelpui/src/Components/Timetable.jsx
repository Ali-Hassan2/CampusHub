import React, { useEffect, useState, useContext, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { ThemeContext } from '../Context/ThemeContext';
import './Timetable.css'

const Timetable = () => {
  const cardRef = useRef(null);
  const { theme } = useContext(ThemeContext);
  const location = useLocation();
  const department = location.state?.department || "Unknown Department";
  const heading = location.state?.heading || "Unknown Section";

  const [timetable, setTimetable] = useState([]);

  const gettingTimetable = async () => {
    const url = `http://localhost:5000/api/timetable/gettimetable/${department}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to get response");
      const data = await response.json();
      setTimetable(Array.isArray(data) && data.length > 0 ? [...data] : []);
    } catch (error) {
      console.log("Sorry cannot fetch timetable", error.message);
      setTimetable([]);
    }
  };

  useEffect(() => {
    if (department) gettingTimetable();
  }, [department]);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const deltaX = (x - rect.width / 2) / (rect.width / 2);
    const deltaY = (y - rect.height / 2) / (rect.height / 2);

    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);

    const maxRotate = 4;
    const rotateY = deltaX * maxRotate;
    const rotateX = -deltaY * maxRotate;

    let translateZ = 0;
    if (deltaX > 0) translateZ -= 3 * deltaX;
    if (deltaY > 0) translateZ += 3 * deltaY;
    if (deltaY < 0) translateZ -= 3 * Math.abs(deltaY);

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--x', `50%`);
    card.style.setProperty('--y', `50%`);
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)`;
  };

  return (
    <>
      <Navbar />
      <div className="h-[90vh] w-[100vw] flex justify-around items-center flex-col ">
        <h1 className="text-center w-full text-6xl font-extrabold relative top-[30px]">
          Welcome to <br />
          <span className='bg-gradient-to-r from-[#9382e0] to-[#5d4d8a] bg-clip-text text-transparent font-Saira'>{department}</span> 
          <span className="bg-gradient-to-r from-[#9382e0] to-[#5d4d8a] bg-clip-text text-transparent font-Saira">/</span> 
          <span className="bg-gradient-to-r from-[#9382e0] to-[#5d4d8a] bg-clip-text text-transparent font-Saira">{heading}</span>
        </h1>

        <div
           className={`card relative h-[500px] w-[1700px] flex justify-center items-start
            shadow-md shadow-black/30 rounded-[30px] 
            transition-transform duration-300 ease-in-out overflow-hidden group
            ${
              theme === 'dark' ? 'bg-black' : 'bg-[#E3E3F3]'
            }`}
    
          style={{
            '--x': '50%',
            '--y': '50%',
            boxShadow: `
              0 0 8px rgba(141, 113, 255, 0.4),   
              0 0 4px rgba(0, 0, 0, 0.2)`        
          }}
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <span className="radial absolute inset-0 pointer-events-none rounded-[30px] z-0 "/>

          {timetable.length === 0 && department && (
            <p className="text-3xl z-10">No Timetable available here.</p>
          )}
        {timetable.length > 0 && (
  <div className={`w-[80vw] relative  top-[50px] bg-[#111] flex justify-center flex-col items-start gap-[20px] rounded-[30px] ${
    theme === 'light' ? "bg-[#E3E3F3]" : "bg-[#111111]"
  }`}>
    <h2 className="w-full  h-[70px] items-center flex justify-center text-3xl font-Saira bg-gradient-to-r from-[#9783EE] to-[#725DAC] text-white rounded-t-[30px]">Time Table</h2>
    {timetable.map((tim, index) => (
      <div
        key={index}
        className={`flex justify-between w-[70vw] mt-[10px] mb-[10px] py-4 px-6 rounded-xl shadow-md shadow-black/30 h-[70px] items-center relative bottom-0  ${
          theme === 'light' ? 'bg-[#E3E3F3] text-black' : 'bg-[#111] text-white'
        }`}
      >
        <h3 className="relative left-6 text-[19px] fle ">{tim.title}</h3>
        <a
          href={tim.file_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white relative bg-gradient-to-r from-[#9783EE] to-[#725DAC] left-[420px] w-[130px] h-[40px] rounded-[50px] text-center flex items-center justify-center font-semibold shadow-sm shadow-black/30 "
        >
          View Timetable
        </a>

        <button
          className="text-white relative bg-gradient-to-r from-[#9783EE] to-[#725DAC] w-[200px] h-[40px] rounded-[50px] text-center flex items-center justify-center font-semibold right-2 shadow-sm shadow-black/30 cursor-pointer left-[100px]"
          onClick={() => downloadfile(tim.file_url, `${tim.title}.pdf`)}
        >
          Download PDF
        </button>
      </div>
    ))}
  </div>
)}
        </div>
      </div>
    </>
  );
};

export default Timetable;
