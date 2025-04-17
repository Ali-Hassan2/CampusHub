import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AdminTimetable = () => {
  const departments = ["Computer Science", "Software Engineering", "Information Technology"];

  const [department, setdepartment] = useState("");
  const [form, setform] = useState(false);
  const [title, settitle] = useState("");
  const [file, setfile] = useState("");
  const [timetable, setTimetable] = useState([]);

  const adding = () => {
    setform(true);
  };

  const uploadtimetable = async (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append('department', department);
    formdata.append('file', file);
    formdata.append('title', title);

    try {
      const url = 'http://localhost:5000/api/timetable/upload';

      if (department && file && title) {
        const response = await fetch(url, {
          method: 'POST',
          body: formdata,
        });

        if (!response.ok) {
          throw new Error("Cannot make a post request.");
        }
        console.log("File uploaded");
        setform(false);
      }
    } catch (error) {
      console.log("Failed to upload sorry.", error.message);
    }
  };
  const fetchingTimetable = async () => {
    if (department) {  
      try {
        const url = `http://localhost:5000/api/timetable/gettimetable/${department}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("No timetable available");
        }
        const data = await response.json();
        console.log("Timetable Data:", data);
  
        if (!Array.isArray(data) || data.length === 0) {
          console.log("No timetable is being there.");
          setTimetable([]);
        } else {
          setTimetable([...data]); 
          console.log(timetable)
        }
      } catch (err) {
        console.log("Error fetching timetable:", err.message);
        setTimetable([]);
      }
    } else {
      console.log("Please select a department first.");
    }
  };
  
  // Check if timetable is updating
  useEffect(() => {
    console.log("Updated Timetable:", timetable);
  }, [timetable]);


  useEffect(() => {
    if (department) {
      fetchingTimetable();
    }
  }, [department]);

  const handledepartment = (e) => {
    setdepartment(e.target.value);
  };

  const location = useLocation();
  const queryParms = new URLSearchParams(location.search);
  const heading = queryParms.get("head");

  return (
    <div>
      <h2>Welcome to {heading} Panel</h2>

      <select name="" id="" onChange={handledepartment}>
        <option value="">Select Department</option>
        {departments.map((dep, index) => (
          <option key={index} value={dep}>
            {dep}
          </option>
        ))}
      </select>

      {timetable.length === 0 && department && <p>No timetable available.</p>}

      {timetable.length > 0 && (
        <div>
          {timetable.map((timu,index)=>(
            <div key={index}>
            <h2>{timu.title}</h2>
            <a href={timu.file_url} rel="noopener norefferrer" target='_blank'>View Timetable</a>
            </div>
          ))}
        </div>
      )}

      {department.length > 0 && (
        <div>
          <button onClick={adding}>Add TimeTable</button>
        </div>
      )}

      {form && (
        <div className="h-[200px] w-[500px] border-4 border-red-600">
          <form action="" onSubmit={uploadtimetable}>
            <input type="text" placeholder='Enter Title' required onChange={(e) => settitle(e.target.value)} />
            <input type="file" required accept='application/pdf' onChange={(e) => setfile(e.target.files[0])} />
            <button>Upload</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminTimetable;
