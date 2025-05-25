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
      <div className="flex w-full h-[89vh] justify-around items-center flex-col  overflow-hidden">
        <h1 className=" relative text-center w-full -top-[100px] text-6xl font-extrabold"
        >Welcome to <br /><span className='bg-gradient-to-r from-[#9382e0] to-[#5d4d8a] bg-clip-text text-transparent font-Saira'>{department}</span> <span className="bg-gradient-to-r from-[#9382e0] to-[#5d4d8a] bg-clip-text text-transparent font-Saira">/</span> <span className="bg-gradient-to-r from-[#9382e0] to-[#5d4d8a] bg-clip-text text-transparent font-Saira">{heading}</span></h1>
        <div className={`flex justify-around   flex-wrap   relative -top-[320px] w-[900px] h-[80px] rounded-[50px] shadow-md shadow-black/30 bg-[#E3E3F3]  outline-0 border-none text-[18px] ${theme === 'light' ? "text-black" : "text-black  "}`}>
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
          <div className="border-4 border-red-500 w-full">
            <h2 className="bg-blue-500">Past Papers</h2>
            {papers.map((paper, index) => (
              <div key={index} className=" flex justify-between">
                <h3 className="">{paper.subject} - {paper.type}</h3>
                <a href={paper.file_url} target="_blank" rel="noopener noreferrer" className="text-red-600 relative -right-[360px]">
                  View Paper
                </a>

                <button className="relative right-[50px] bg-blue-700" onClick={() => downloadfile(paper.file_url, `${paper.subject}_${paper.type}.pdf`)}>Download PDF</button>
              </div>
            ))}



          </div>


        )}

      </div>
    </>
  );
};

export default Pastpapers;
