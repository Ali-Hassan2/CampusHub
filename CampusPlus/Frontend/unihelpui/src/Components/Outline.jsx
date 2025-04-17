import {React,useState} from 'react'
import {useLocation} from 'react-router-dom'
const Outline = () => {


  const location = useLocation();
  const department = location.state?.department || "Unkown Department"
  const heading = location.state?.heading || "Unknown Section"

  const [semester,setsemester] = useState("");
  const [outline,setoutline] = useState([]);
  const [subject,setsubject] = useState([]);
  const [selectedsubject,setselectedsubject] = ("");


  const handlesubjects = async()=>{


    const url = `http://localhost:5000/api/pastpapers/subjects/${departmen}/${semester}`

    try {
      const response = await fetch(url);
      if(!response.ok){
        throw new Error ("there is an error while getting subjects")
      }
      const data = await response.json();
      if(!Array.isArray(data) || data.length === 0){
        console.log("There are no subjects received from backend.")
        setsubject([])
      }
      console.log("the data is:",data);
      setsubject(data);
    } catch (error) {
      console.log("Sorry there is an error",error)
      setsubject([]);
    }
  }

  const handleselectedsubject = (e)=>{
    let currentsubject = e.target.value
    setselectedsubject(currentsubject)
  }


  return (
    <div>
      <h2>Welcome to /{ department} / {heading}</h2>

      <select name="" id="">
        <option value="">Select Semester</option>
        {[...Array(8)].map((_,i)=>(
          <option value={i+1} key={i+1}>
            {i+1}
          </option>
        ))}
      </select>

      {semester.length > 0 && (
        <select onChange={handleselectedsubject}>
          <option value="">Select semester</option>
          {subject.map((sub,index)=>(
            <option key={index} value={sub}>
              {sub}
            </option>
          ))}
        </select>
      )}






    </div>
  )
}

export default Outline
