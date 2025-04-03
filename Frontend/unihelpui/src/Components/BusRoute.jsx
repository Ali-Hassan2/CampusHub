import React from 'react'
import {useLocation} from 'react-router-dom'





const fetchingbusroute = async()=>{


  const [route,setroute] = useState([]);
  const url = 'http://localhost:5000/api/busroute/getbusroute'
  try {
    const response = await fetch(url)
    if(!response.ok){
      console.log('Sorry')
    }
  } catch (error) {
    
  }
}



const BusRoute = () => {

  const location = useLocation();
  // const queryParms = new URLSearchParams(location)
  // const department = queryParms.get('department');
  const department = location.state?.department || "Unkown Area"
  return (
    <div>
      <h1>Welcome to {department}</h1>

      <div className="h-[100vh] w-[100vw] border-4 border-red-600 flex justify-center items-center">
        <div className="h-[500px] w-[700px] border-3 border-amber-500">
        </div>

      </div>
    </div>
  )
}

export default BusRoute
