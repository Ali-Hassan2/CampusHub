import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
const AdminBus = () => {
  const location = useLocation();
  // const department = location.state?.department || "Unkown Area"
  const querParms = new URLSearchParams(location.search)
  const heading = querParms.get('head')


  const [title, settitle] = useState("")
  const [file, setfile] = useState("")
  const [route, setroute] = useState([])
  const [form, setform] = useState(false)



  const handleform = () => {
    setform(true)
  }

  const handletitle = (e) => {
    settitle(e.target.value)
  }

  const handlefile = (e) => {
    setfile(e.target.files[0])
  }


  const fetchingRoute = async()=>{

    const url = 'http://localhost:5000/api/busroute/getbusroute';
    try {
      const response = await fetch(url)
      if(!response.ok){
        throw new Error ("cannot fetch Routes")
      }
      const data = await response.json();
      console.log("The data is: ",data)
      if(!Array.isArray(data) || data.length === 0)
      {
        console.log("No timetable is being there.")
        setroute([]);
      }
      else{
        setroute([...data])
        console.log(route)
        console.log("The title is: ",route.title)
      }
    } catch (error) {
      console.log("Error in fetching: ",error.message);
      setroute([]);
    }
  }

  const uploadroute = async (e) => {
    // e.preventDefault();
    const formdata = new FormData();
    formdata.append('title', title);
    formdata.append('file', file);
    const url = 'http://localhost:5000/api/busroute/uploadbus';
    try {

      const response = await fetch(url,{
        method:'POST',
        body:formdata,
      });

      if(!response.ok){
        throw new Error ("Sorry not able to make a post request.")
      }
      console.log("File uploaded.")
      setform(false);
    } catch (error) {
      alert("Failed to upload file",error)
    }
  };

  useEffect(()=>{
    fetchingRoute()
  },[])





  return (
    <>
      <div>
        <h1>Welcome to {heading}</h1>
      </div>

      {route.length === 0 && (
        <p>There is no route paper available.</p>
      )}

      {route.length > 0 && (
        <div>
          {route.map((rot,index)=>(
            <div key={index}>
              <h4>{rot.title}</h4>
              <a href={rot.file_url} rel="noopenerrer norefferrer" target='_blank'>View Route</a>
            </div>
          ))}
        </div>
      )}


      <button className="bg-blue-600" onClick={handleform}>Add Route</button>

      {form === true && (
        <div className='h-[500px] w-[600px] border-3 border-amber-950'>
          <form action={uploadroute} >
            <input type="text" placeholder='Enter Title' required onChange={handletitle} />
            <br />
            <br />
            <input type="file" accept='application/pdf' required onChange={handlefile} />
            <br />
            <br />

            <button type='submit'>Upload</button>
          </form>
        </div>
      )}

    </>





  )
}

export default AdminBus
