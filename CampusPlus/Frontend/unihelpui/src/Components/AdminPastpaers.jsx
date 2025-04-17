import React, { useState } from 'react';

const depnames = ['Computer Science', 'Software Engineering', 'Information Technology'];
const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
const types = ['Mid-Term', 'Final-Term'];

const AdminPastpapers = () => {
  const [sem, setSem] = useState(0);
  const [type, setType] = useState('');
  const [subject, setSubject] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [department, setDepartment] = useState('');
  const [papers, setPapers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);

  const handleDep = (e) => {
    setDepartment(e.target.value);
  };

  const handleSemester = async (e) => {
    setSem(e.target.value);
    if (department) {
      try {
        const response = await fetch(`http://localhost:5000/api/pastpapers/subjects/${e.target.value}/${department}`);
        if (!response.ok) throw new Error('Failed to fetch subjects');
        const data = await response.json();
        setSubject(data);
      } catch (err) {
        console.log('The error is:', err.message);
      }
    }
  };

  const handleType = async (e) => {
    setType(e.target.value);
    
    if (sem && department && selectedSubject && e.target.value) {
      try {
        const response = await fetch(`http://localhost:5000/api/pastpapers/papers/${sem}/${department}/${selectedSubject}/${e.target.value}`);
        if (!response.ok) throw new Error('Failed to fetch past papers');
        const data = await response.json();
        setPapers(data.length > 0 ? data : []);
      } catch (err) {
        console.log('The error is:', err.message);
        setPapers([]);
      }
    }
  };

  const handleSearch = async () => {
    console.log("dep",department)
    console.log("Type",type)

    if (sem && selectedSubject && type && department) {
      try {
        const response = await fetch(`http://localhost:5000/api/pastpapers/papers/${sem}/${department}/${selectedSubject}/${type}`);
        if (!response.ok) throw new Error('Failed to fetch past papers');
        const data = await response.json();
        setPapers(data);
      } catch (err) {
        console.log('The error is:', err.message);
      }
    } else {
      console.log('Please fill all fields');
    }
    console.log(data)
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!title || !file) {
      console.log('Title and file are required');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);
    formData.append('semester', sem);
    formData.append('department', department);
    formData.append('subject', selectedSubject);
    formData.append('type', type);

    try {
      const response = await fetch('http://localhost:5000/api/pastpapers/upload', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to upload file');
      console.log('File uploaded successfully');
      setShowForm(false);
    } catch (err) {
      console.log('The error is:', err.message);
    }
  };







  const handleRemove= async (paperId)=>{
    try {
      const response = await fetch(`http://localhost:5000/api/pastpapers/delete/${paperId}`,{
        method:'DELETE',
      })
      if(!response.ok)
      {
        throw new Error('Failed To Delete Doc.')
      }
      setPapers(papers.filter(paper => paper._id !== paperId))
      alert("Paper removed Successfully")

    } catch (error) {
      console.log("Sorry we have an error",error.message)
    }
  } 

  return (
    <>
      <h1 className="text-3xl font-semibold mb-5">Admin Past Papers</h1>
      <div className="space-y-4">
        <select className="p-2 border border-gray-300 rounded-md w-full" onChange={handleDep}>
          <option value=''>Select Department</option>
          {depnames.map((dep, index) => (
            <option key={index} value={dep}>{dep}</option>
          ))}
        </select>

        <select className="p-2 border border-gray-300 rounded-md w-full" onChange={handleSemester}>
          <option value=''>Select Semester</option>
          {semesters.map((se, index) => (
            <option key={index} value={se}>{se}</option>
          ))}
        </select>

        <select className="p-2 border border-gray-300 rounded-md w-full" onChange={handleType}>
          <option value=''>Select Type</option>
          {types.map((ty, index) => (
            <option key={index} value={ty}>{ty}</option>
          ))}
        </select>

        {sem && subject.length > 0 && (
          <select className="p-2 border border-gray-300 rounded-md w-full" onChange={(e) => setSelectedSubject(e.target.value)}>
            <option value=''>Select Subject</option>
            {subject.map((subj, index) => (
              <option key={index} value={subj}>{subj}</option>
            ))}
          </select>
        )}

        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600 transition duration-300"
        >
          Search
        </button>

        {papers.length === 0 && (
          <p className="text-red-500">No documents available</p>
        )}

        {papers.length > 0 && (
          <>
            <div>
              {papers.map((paper, index) => (
           <div key={index} className="border-b border-gray-300 p-4 flex justify-between items-center">
           <div>
             <h3 className="font-medium">{paper.subject} - {paper.type}</h3>
             <a
               href={paper.file_url}
               target="_blank"
               rel="noopener noreferrer"
               className="text-blue-500 hover:text-blue-700"
             >
               View Paper
             </a>
           </div>
           <button 
             onClick={() => handleRemove(paper._id)} 
             className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300">
             Remove
           </button>
         </div>
              ))}
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="bg-green-500 text-white p-2 rounded-md mt-4 hover:bg-green-600 transition duration-300 w-full"
            >
              Add Document
            </button>
          </>
        )}

        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
            <div className="bg-white p-6 rounded-md w-96">
              <form onSubmit={handleFileUpload} className="space-y-4">
                <input
                  type='text'
                  placeholder='Enter Title'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md w-full"
                />
                <input
                  type='file'
                  onChange={(e) => setFile(e.target.files[0])}
                  className="p-2 border border-gray-300 rounded-md w-full"
                />
                <div className="flex space-x-4">
                  <button
                    type='submit'
                    className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600 transition duration-300"
                  >
                    Upload
                  </button>
                  <button
                    type='button'
                    onClick={() => setShowForm(false)}
                    className="bg-gray-500 text-white p-2 rounded-md w-full hover:bg-gray-600 transition duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminPastpapers;
