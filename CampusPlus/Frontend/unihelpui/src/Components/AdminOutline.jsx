import {useLocation} from 'react-router-dom'
import {useState,React, useEffect} from 'react'
const AdminOutline = () => {


  const location = useLocation();
  const queryParms = new URLSearchParams(location.search)
  const heading = queryParms.get('head')

  const departments = [
    'Computer Science',
    'Software Engineering',
    'Information Technology'
  ]

  const [dep,setdep] = useState("");
  const [semester,setsemester] = useState(null);
  const [subject,setSubject] = useState([]);
  const [form,setform] = useState(false);
  const [title,settitle] = useState("")
  const [file,setfile] = useState("")
  const [outline,setoutline] = useState([])
  const [selectedSubject,setselectedsubject] = useState("");



  const handlesubject = (e)=>{
    const selectedsubject = e.target.value;
    setselectedsubject(selectedsubject)
  }

  const handledep = (e) =>{
    setdep(e.target.value)
  }

  
  const handlesem = async (e) => {
    const newSemester = e.target.value;
    setsemester(newSemester);

    // if(!dep){
    //   console.log("please select the department first.")
    // }

        console.log("The semester is: ", newSemester, "department is: ",dep)
    const url = `http://localhost:5000/api/pastpapers/subjects/${newSemester}/${dep}`

    try {
      const response = await fetch(url);
      if(!response.ok){
        throw new Error("nothing found")
      }
      const data = await response.json();
      console.log(data)
      console.log("The length of array is: ",data.length)
      if(!Array.isArray(data) || data.length === 0){
        console.log("Sorry nothing is there to get.")
        setSubject([])
      }
      else{
        setSubject(data);
        console.log("The data we got is: ",data)
      }
    } catch (error) {
      console.log("There is an error while making a get request",error)
      setSubject([]);
    }
  };


  const handleform = ()=>{
    setform(true);
  }

  const fetchoutline = async ()=>{
    const url = `http://localhost:5000/api/outline/getoutline/${dep}/${semester}/${selectedSubject}`;

    try {

      const response = await fetch(url)
      if(!response.ok){
        throw new Error ("Nothing found")
      }
      const data = await response.json();
      if(!Array.isArray(data) || data.length === 0){
        console.log("There is nothing in data")
        setoutline([])
      }
      else{
        console.log("The data is: ",data)
        setoutline(data);
      }
      
    } catch (error) {
      console.log("There is an error while making get request",error)
      setoutline([]);
    }
  }

  const uploadoutline = async (e)=>{

    e.preventDefault();

    if(!title || !file){
      console.log("Both feilds are required")
      return;
    }

    const formdata = new FormData();
    formdata.append('department',dep)
    formdata.append('semester',semester)
    formdata.append('subject',selectedSubject)
    formdata.append('title',title)
    formdata.append('file',file)

    const url = `http://localhost:5000/api/outline/uploadoutline`

    try{
      const response = await fetch(url,{
        method:'POST',
        body:formdata,
      });
      if(!response.ok){
        console.log("Failed to upload");
      }
      alert("File uploaded successfully.")
      setform(false);
    }
    catch(error){
      console.log("The error is: ",err.message)
    }
  };


  const handledel = async(outid)=>{

    const url = `http://localhost:5000/api/outline/removeoutline/${outid}`

    try {
      const response = await fetch(url,{
        method:'DELETE'
      })
      if(!response.ok){
        throw new Error("There is an error while deleting outline")
      }
      setoutline(outline.filter(out => out._id != outid))
      alert("Succssefully deleted")
    } catch (error) {
      console.log("Error while deleting",error)
    }
  }



  return (
    <div>
      <h2>Welcome to {heading}</h2>

      <div>
        <select name="" id="" onChange={handledep}>
          <option value="">Select Department</option>

          {departments.map((d,index)=>(
            <option key={index} value={d}>
              {d}
            </option>
          ))} 
           
        </select>

        <select name="" id="" onChange={handlesem}>
          <option value="">Select Semester</option>

          {[...Array(8)].map((_,i)=>(
            <option key={i+1} value={i+1}>
              {i+1}
            </option>
          ))}
        </select>

        {semester && subject &&  subject.length > 0 && (
          <div>
            <select name="" id="" onChange={handlesubject}>
              <option value="">Select Subject</option>
              {subject.map((sub,index)=>(
                <option key={index} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        )}
        <button onClick={handleform}>Add Document</button>
        <button onClick={fetchoutline}>Search</button>



        {form && (
          <div className="h-[500px] w-[500px] border-4 border-red-600">
            <form action="" onSubmit={uploadoutline} >
              <input type="text" placeholder="Enter title" required onChange={(e)=>(settitle(e.target.value))}/>
              <input type="file" accept="application/pdf" required onChange={(e)=>(setfile(e.target.files[0]))}/>
              <button type="submit">upload</button>
              <button onClick={()=> setform(false)}>Cancel</button>
            </form>
          </div>
        )}

        {outline.length === 0 && (
          <div>
            <h1>There is available outline</h1>
          </div>
        )}  

        {outline.length > 0 &&(
          <div className="h-[500px] w-[500px] border-4 border-amber-900">
            {outline.map((out,index)=>(
              <div key={index}>
                <div>
                  <h3>{out.title}</h3>
                <a href={out.file_url} target="_blank">View outline</a>
                <button onClick={()=> handledel(out._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default AdminOutline
