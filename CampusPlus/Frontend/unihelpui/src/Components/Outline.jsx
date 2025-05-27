import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { ThemeContext } from '../Context/ThemeContext';
import { useContext } from 'react';

const Outline = () => {

  const {theme} = useContext(ThemeContext);
  const location = useLocation();
  const department = location.state?.department || "Unknown Department";
  const heading = location.state?.heading || "Unknown Section";

  const [semester, setsemester] = useState("");
  const [outline, setoutline] = useState([]);
  const [subject, setsubject] = useState([]);
  const [selectedsubject, setselectedsubject] = useState("");

  const handlesubjects = async (e) => {
    const value = e.target.value;
    setsemester(value);

    const url = `http://localhost:5000/api/pastpapers/subjects/${value}/${department}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("There is an error while getting subjects");
      }
      const data = await response.json();
      setsubject(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Sorry there is an error", error);
      setsubject([]);
    }
  };

  const handleselectedsubject = async () => {
    const base_URL = `http://localhost:5000/api/outline/getoutline/${department}/${semester}/${selectedsubject}`;
    try {
      const response = await fetch(base_URL);
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Cannot fetch details");
      }
      const result = await response.json();
      setoutline(Array.isArray(result) ? result : []);
      console.log("The outline is: ", result);
    } catch (error) {
      console.log("Sorry cannot make a fetch call");
      setoutline([]);
    }
  };

  return (
    <>
      <Navbar />
      <div className='border-8 border-red-700 w-full h-[100vh] flex flex-col justify-around items-center'>
        <h1 className="relative text-center w-full -top-[100px] text-6xl font-extrabold">
          Welcome to <br />
          <span className='bg-gradient-to-r from-[#9382e0] to-[#5d4d8a] bg-clip-text text-transparent font-Saira'>{department}</span>
          <span className="bg-gradient-to-r from-[#9382e0] to-[#5d4d8a] bg-clip-text text-transparent font-Saira"> / </span>
          <span className="bg-gradient-to-r from-[#9382e0] to-[#5d4d8a] bg-clip-text text-transparent font-Saira">{heading}</span>
        </h1>

        <div className={`flex justify-around flex-wrap w-[900px] h-[80px] rounded-[50px] relative top-[100px]
 z-50 shadow-md shadow-black/30 bg-[#E3E3F3] text-[18px] 
  ${theme === 'light' ? "text-black" : "text-black  "}`}>
          {/* Semester Dropdown */}
          <select value={semester} onChange={handlesubjects} >
            <option value="">Select Semester</option>
            {[...Array(8)].map((_, i) => (
              <option key={i + 1} value={i + 1} >
                {i + 1}
              </option>
            ))}
          </select>
          {semester && subject.length > 0 && (
            <select value={subject} onChange={(e) => setsubject(e.target.value)} className="">
              <option value="">Select Subject</option>
              {subject.map((subj, index) => (
                <option key={index} value={subj} >
                  {subj}
                </option>
              ))}
            </select>
          )}

          <button onClick={handleselectedsubject} className="w-[90px] h-[50px] relative top-3.5
        rounded-[50px] text-black shadow-md shadow-black/30 bg-gradient-to-r from-[#9783EE] to-[#725DAC]">Search</button>
        






</div>


      </div>
    </>
  );
};

export default Outline;
