import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { ThemeContext } from '../Context/ThemeContext';
import { useContext } from 'react';

const Outline = () => {

  const { theme } = useContext(ThemeContext);
  const location = useLocation();
  const department = location.state?.department || "Unknown Department";
  const heading = location.state?.heading || "Unknown Section";

  const [sem, setsem] = useState("");
  const [outline, setoutline] = useState([]);
  const [subject, setsubject] = useState([]);
  const [selectedsubject, setselectedsubject] = useState("");

  const handlesubjects = async (e) => {
    const value = e.target.value;
    setsem(value);

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
    const base_URL = `http://localhost:5000/api/outline/getoutline/${department}/${sem}/${selectedsubject}`;
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
      <div className="w-full h-[88vh] py-10 px-4 flex flex-col items-center gap-10 overflow-hidden">
        <h1 className=" relative text-center w-full top-[40px] text-6xl font-extrabold"
        >Welcome to <br /><span className='bg-gradient-to-r from-[#9382e0] to-[#5d4d8a] bg-clip-text text-transparent font-Saira'>{department}</span> <span className="bg-gradient-to-r from-[#9382e0] to-[#5d4d8a] bg-clip-text text-transparent font-Saira">/</span> <span className="bg-gradient-to-r from-[#9382e0] to-[#5d4d8a] bg-clip-text text-transparent font-Saira">{heading}</span></h1>
        <div className={`flex justify-around flex-wrap w-[900px] h-[80px] rounded-[50px] relative top-[100px]
 z-50 shadow-md shadow-black/30 bg-[#E3E3F3] text-[18px] 
  ${theme === 'light' ? "text-black" : "text-black  "}`}>
          {/* Semester Dropdown */}
          <select value={sem} onChange={handlesubjects} >
            <option value="">Select Semester</option>
            {[...Array(8)].map((_, i) => (
              <option key={i + 1} value={i + 1} >
                {i + 1}
              </option>
            ))}
          </select>
          {sem && subject.length > 0 && (
  <select value={selectedsubject} onChange={(e) => setselectedsubject(e.target.value)} className="">
    <option value="">Select Subject</option>
    {subject.map((subj, index) => (
      <option key={index} value={subj}>
        {subj}
      </option>
    ))}
  </select>
)}


<button onClick={handleselectedsubject} className="w-[90px] h-[50px] relative top-3.5
        rounded-[50px] text-black shadow-md shadow-black/30 bg-gradient-to-r from-[#9783EE] to-[#725DAC]">Search</button>
        </div>

        {outline.length > 0 && (
          <div className={` w-[80vw] relative top-[200px] bg-[#111] flex justify-center flex-col items-center gap-[20px] rounded-[30px] ${theme === 'light' ? "bg-[#E3E3F3]" : "bg-[#111111]"
            }`} >
            <h2 className="w-full h-[70px] items-center  flex justify-center text-3xl font-Saira bg-gradient-to-r from-[#9783EE] to-[#725DAC] text-white rounded-t-[30px]">Past Papers</h2>
            {outline.map((paper, index) => (
              <div
                key={index}
                className={`flex justify-between w-[70vw] mt-[10px] mb-[10px] py-4 px-6 rounded-xl shadow-md shadow-black/30 h-[70px] items-center relative bottom-2.5 ${theme === 'light' ? 'bg-[#E3E3F3] text-black' : 'bg-[#111] text-white'}`}
              >
                <h3 className="relative left-6 text-[19px]">{paper.subject} - {paper.type}</h3>
                <a href={paper.file_url} target="_blank" rel="noopener noreferrer" className="text-white relative bg-gradient-to-r from-[#9783EE] to-[#725DAC] left-[370px] w-[130px] h-[40px] rounded-[50px] text-center flex items-center justify-center font-semibold shadow-sm shadow-black/30">
                  View Outline
                </a>

                <button className="text-white relative bg-gradient-to-r from-[#9783EE] to-[#725DAC] w-[200px] h-[40px] rounded-[50px] text-center flex items-center justify-center font-semibold right-2 shadow-sm shadow-black/30 cursor-pointer" onClick={() => downloadfile(paper.file_url, `${paper.subject}_${paper.type}.pdf`)}>Download Outline</button>
              </div>
            ))}
          </div>



        )}

      </div>

    </>
  );
};

export default Outline;
