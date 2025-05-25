import {React,useState} from 'react'
import {useLocation} from 'react-router-dom'
import Navbar from '../Components/Navbar'
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
    <>
    <Navbar/>
    <div className='border-8 border-red-700 w-full h-[88vh] flex flex-col justify-around items-center'>
    <h1 className=" relative text-center w-full -top-[100px] text-6xl font-extrabold"
      >Welcome to <br /><span className='bg-gradient-to-r from-[#9382e0] to-[#5d4d8a] bg-clip-text text-transparent font-Saira'>{department}</span> <span className="bg-gradient-to-r from-[#9382e0] to-[#5d4d8a] bg-clip-text text-transparent font-Saira">/</span> <span className="bg-gradient-to-r from-[#9382e0] to-[#5d4d8a] bg-clip-text text-transparent font-Saira">{heading}</span></h1>

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
</>
  )
}

export default Outline
