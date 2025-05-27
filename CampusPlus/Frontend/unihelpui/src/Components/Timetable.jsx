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
           className={`card relative h-[500px] w-[1700px] flex justify-center items-center
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
          <span className="radial absolute inset-0 pointer-events-none rounded-[30px] z-0"/>

          {timetable.length === 0 && department && (
            <p className="text-3xl z-10">No Timetable available here.</p>
          )}
          {timetable.length > 0 && (
            <div className="space-y-8 text-center relative z-10">
              <h1 className="text-2xl font-bold">Time Table</h1>
              {timetable.map((tim, index) => (
                <div key={index} className="px-6 py-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{tim.title}</h3>
                  <a
                    href={tim.file_url}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="text-blue-600 dark:text-blue-300 underline"
                  >
                    View Timetable
                  </a>
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
