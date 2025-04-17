import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'

const Timetable = () => {

  // const semesters = [
  //   1,2,3,4,5,6,7,8
  // ]

  let location = useLocation();
  const department = location.state?.department || "Unknown Department"
  const heading = location.state?.heading || "Unknown Section"

  const [timetable,settimetable] = useState([]);

  const gettingtimetable = async()=>{
    const url = `http://localhost:5000/api/timetable/gettimetable/${department}`;

    try {
      const response = await fetch(url)
      if(!response.ok)
      {
        throw new Error ("Failed to get response");
      }

      const data = await response.json();
      console.log("The Data is: ",data);

      if(!Array.isArray(data)  || data.length === 0)
      {
        console.log("No timetable is available")
        settimetable([])
      }
      else{
        settimetable([...data]);
        console.log(data)
      }
    } catch (error) {
      console.log("Sorry cannot fetch timetable",error.message)
      settimetable([]);
    }
  }

  useEffect(()=>{
    if(department){
      gettingtimetable()
    }
  },[department])




  // const [semester,setsemester] = useState(0)

  const handlesemester = async(e)=>{

    setsemester(e.target.value)
  }

  const searchHandling = async(e)=>{
    e.PreventDefault()


  }
  
  return (
    <div>
      <h2>Welcome to / {department} / {heading}</h2>
      <div className="h-[95vh] w-[100vw] border-4 border-amber-600 flex justify-center items-center">
        <div className="h-[500px] w-[700px] border-4 border-black">

          {/* <select name="" id="" onChange={handlesemester}>
            <option value="">Select Semester</option>
            {semesters.map((sem,index)=>(
              <option key={index} value={sem}>
                {sem}
              </option>
            ))}
          </select> */}

          {/* <button className="bg-blue-600 h-[30px] cursor-pointer" >Search</button> */}\

          {timetable.length === 0 && department && <p>No Timetable available here.</p>}
          {timetable.length > 0 && (
            <div>
              <h1>Time Table</h1>
              {timetable.map((tim,index)=>(
                <div key={index} >
                  <h3>{tim.title}</h3>
                  <a href={tim.file_url} rel="noopener noreferrer" target='_blank'>View Timetable</a>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default Timetable
