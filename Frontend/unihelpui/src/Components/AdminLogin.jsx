import React from 'react'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

import './AdminLogin.css'
const AdminLogin = () => {
  const [username,setusername] = useState("");
  const [password,setpassword] = useState("");
  const navigate = useNavigate();

  const handlelogin = async () =>{
    try{
      const response = await axios.post('http://localhost:5000/admin/login',{username,password})

      if(response.data.token)
      {
        localStorage.setItem("adminToken",response.data.token)
        console.log("Username is: ",username)
        navigate(`/AdminDashboard?usern=${username}`)
      }

    }
    catch(err)
    {
      console.log("error is: ",err)
      alert("Invalid Input")
    }
  }



  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div className="h-[400px] w-[400px]">
        <div className="heading">
          <h2>Admin Login</h2>
        </div>

        <div className="content">
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <a href="#" id="fp">Forget Password?</a>
          <button
            type="submit"
            className="w-full bg-green-500 text-white text-md p-2 hover:bg-green-600 cursor-pointer"
            onClick={handlelogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;