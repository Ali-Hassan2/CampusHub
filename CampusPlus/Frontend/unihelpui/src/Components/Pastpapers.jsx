import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from '../Components/Navbar'
import { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";

const Pastpapers = () => {

  const { theme } = useContext(ThemeContext);
  const location = useLocation();
  const [sem, setSem] = useState("");
  const [subject, setSubject] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [type, setType] = useState("");
  const [papers, setPapers] = useState([]);

  const department = location.state?.department || "Unknown Page";
  const heading = location.state?.heading || "Unknown Section";

  const semHandling = async (e) => {
    const selectedSem = e.target.value;
    setSem(selectedSem);

    try {
      const response = await fetch(
        `http://localhost:5000/api/pastpapers/subjects/${selectedSem}/${department}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch subjects");
      }
      const data = await response.json();
      console.log(data);
      setSubjects(data);
    } catch (error) {
      console.error(error.message);
    }
  };
  const typeHandling = async (e) => {
    const selectedType = e.target.value;
    setType(selectedType);

    if (!sem || !subject || !selectedType) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/pastpapers/papers/${sem}/${department}/${subject}/${selectedType}`
      );

      if (!response.ok) {
        throw new Error("Failed to get papers.");
      }

      const data = await response.json();
      console.log(data);
      setPapers(data.length > 0 ? data : []);
    } catch (error) {
      console.log("The error is: ", error);
      setPapers([]);
    }
  };
  const searchHandling = async () => {
    console.log("Searching for papers with the following data:");
    console.log("Semester: ", sem);
    console.log("Department: ", department);
    console.log("Subject: ", subject);
    console.log("Type: ", type);
    setPapers([]);
    if (sem && department && type && subject) {
      try {
        const url = `http://localhost:5000/api/pastpapers/papers/${sem}/${department}/${subject}/${type}`;
        const response = await fetch(url);

        if (!response.ok) throw new Error("Failed to search");
        const data = await response.json();
        console.log("Papers Data: ", data);
        setPapers(data.length > 0 ? data : []);
      } catch (err) {
        alert("The error is: ", err);
        setPapers([]);
      }
    } else {
      alert("Please fill in all the previous fields.");
    }
  };
  { heading }
  const downloadfile = async (url, filename) => {
    try {
      const response = await fetch(url);
      if (!response.ok)
        throw new Error("Cannot download the file.")
      const blob = await response.blob();
      const link = document.createElement("a")
      link.href = URL.createObjectURL(blob)
      link.download = filename;
      document.body.appendChild(link)
      link.click();
      document.body.removeChild(link)
      URL.revokeObjectURL(link.href)
    }
    catch (err) {
      console.log("Error to download the file", err)
      alert("Sorry cannot upload the file.")
    }
  }
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
          <select value={sem} onChange={semHandling} >
            <option value="">Select Semester</option>
            {[...Array(8)].map((_, i) => (
              <option key={i + 1} value={i + 1} >
                {i + 1}
              </option>
            ))}
          </select>
          {sem && subjects.length > 0 && (
            <select value={subject} onChange={(e) => setSubject(e.target.value)} className="">
              <option value="">Select Subject</option>
              {subjects.map((subj, index) => (
                <option key={index} value={subj} >
                  {subj}
                </option>
              ))}
            </select>
          )}
          <select value={type} onChange={(e) => { setType(e.target.value) }} >
            <option value="">Select Type</option>
            <option value="Mid-Term">Mid Term</option>
            <option value="Final-Term">Final Term</option>
          </select>

          <button onClick={searchHandling} className="w-[90px] h-[50px] relative top-3.5
        rounded-[50px] text-black shadow-md shadow-black/30 bg-gradient-to-r from-[#9783EE] to-[#725DAC]">Search</button>
        






</div>

{papers.length > 0 && (
          <div className={` w-[80vw] relative top-[200px] bg-[#111] flex justify-center flex-col items-center gap-[20px] rounded-[30px] ${
            theme === 'light' ? "bg-[#E3E3F3]" : "bg-[#111111]"
          }`} >
            <h2 className="w-full h-[70px] items-center  flex justify-center text-3xl font-Saira bg-gradient-to-r from-[#9783EE] to-[#725DAC] text-white rounded-t-[30px]">Past Papers</h2>
            {papers.map((paper, index) => (
              <div
              key={index}
              className={`flex justify-between w-[70vw] mt-[10px] mb-[10px] py-4 px-6 rounded-xl shadow-md shadow-black/30 h-[70px] items-center relative bottom-2.5 ${theme === 'light' ? 'bg-[#E3E3F3] text-black' : 'bg-[#111] text-white'}`}
            >
                <h3 className="relative left-6 text-[19px]">{paper.subject} - {paper.type}</h3>
                <a href={paper.file_url} target="_blank" rel="noopener noreferrer" className="text-white relative bg-gradient-to-r from-[#9783EE] to-[#725DAC] left-[370px] w-[130px] h-[40px] rounded-[50px] text-center flex items-center justify-center font-semibold shadow-sm shadow-black/30">
                  View Paper
                </a>

                <button className="text-white relative bg-gradient-to-r from-[#9783EE] to-[#725DAC] w-[200px] h-[40px] rounded-[50px] text-center flex items-center justify-center font-semibold right-2 shadow-sm shadow-black/30 cursor-pointer" onClick={() => downloadfile(paper.file_url, `${paper.subject}_${paper.type}.pdf`)}>Download PDF</button>
              </div>
            ))}
              </div>



        )}

      </div>
    </>
  );
};

export default Pastpapers;
