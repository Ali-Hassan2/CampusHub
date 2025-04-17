import {useLocation} from 'react-router-dom'
import { useState,React,useEffect} from 'react';

const BusRoute = () => {

  const location = useLocation();
  // const queryParms = new URLSearchParams(location)
  // const department = queryParms.get('department');
  const department = location.state?.department || "Unkown Area"

  const [route,setroute] = useState([]);

  const fetchingbusroute = async()=>{
    const url = 'http://localhost:5000/api/busroute/getbusroute'
    try {
      const response = await fetch(url)
      if(!response.ok){
        console.log('Sorry')
      }
      const data = await response.json();
      if(!Array.isArray(data) || data.length === 0){
        console.log("No data is available")
        setroute([]);
      }
      else{
        setroute([...data]);
        console.log("The response is,",data)
        
      }
    } catch (error) {
      console.log("Sorry cannot make a get request.")
      setroute([]);
    }
  }

  const download = async (url,filename) =>{
    try{
    const response = await fetch(url)
    if(!response.ok){
      console.log("Sorry cannot download")
    }

    const blob = await response.blob();
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = filename;
    document.body.appendChild(link)
    link.click();
    document.body.removeChild(link)
    URL.revokeObjectURL(link.href)
  }
  catch(error){
    console.log("Sorry cannot download file.")
    alert("Cannot download file.")
  }
}


  useEffect(()=>{
    fetchingbusroute();
  },[])

  return (
    <div> 
      <h1>Welcome to {department}</h1>

      <div className="h-[100vh] w-[100vw] border-4 border-red-600 flex justify-center items-center">
        <div className="h-[500px] w-[700px] border-3 border-amber-500">

          {route.length === 0 && (
            <div>
              <p>Sorry no route is available</p>
            </div>
          )}

          {route.length > 0 &&((
           <div>
            {route.map((rot,index)=>(
              <div key={index}>
                <h2>{rot.title}</h2>
                <a href={rot.file_url} rel="noopenerrer norefferrer" target='_blank'>View Bus Route</a>
                <button onClick={()=>download(rot.file_url)}>Download</button>
              </div>
            ))}
           </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default BusRoute
