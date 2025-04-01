import React from 'react'
import {useState} from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';
import TradeMark from './TradeMark';
const Home = () => {

    const [dep, setdep] = useState('');
    const navigate = useNavigate();

    const dephandling = (e)=>{
        const selectedep = e.target.value;
        setdep(selectedep)

        if(selectedep)
        {
            navigate(`/menu?department=${selectedep}`)
        }
    }


  return (
    <div>
      <Navbar/>
      <div className="flex justify-center items-center flex-col border border-amber-600 h-[300px] mb-[200px]">
      <h1 className="bg-blue-800 py-[200px] w-[300px] text-center text-md relative -top-4 text-white rounded-md">Select Department</h1>
      <select
  onChange={dephandling}
  value={dep}
  className=" bg-gray-400 w-[300px] text-[14px] rounded-md appearance-none indent-1 max-h-[100px] " style={{overflowY:scroll}}
>
  <option value="" className="m-2 appearance-none">
    Select Department
  </option>
  <option value="Computer Science">Computer Science</option>
  <option value="Software Engineering">Software Engineering</option>
  <option value="Information Technology">Information Technology</option>

</select>
      </div>
      <div class="footer  mt-12 relative -bottom-13">
      <TradeMark style={{ marginTop: '200px' }} />
      </div>

    </div>
  )
}

export default Home
