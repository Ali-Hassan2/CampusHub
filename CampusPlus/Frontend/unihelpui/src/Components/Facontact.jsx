import React, { useEffect,useState } from 'react'
import Navbar from './Navbar'
import { useLocation } from 'react-router-dom'
import {ThemeContext} from '../Context/ThemeContext'
import { useContext } from 'react'
import './Facontact.css'


const Facontact = () => {

    const {theme} = useContext(ThemeContext)
    const [contact,setcontact] = useState([]);
    const [loading,setloading] = useState(true);
    const [error,seterror] = useState(null);

    const location = useLocation();
    const department = location.state?.department || "Unknown Department"
    const heading = location.state?.heading || "Unknown Section"



    useEffect(()=>{
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchfunction = async()=>{

            const url = `http://localhost:5000/api/contact/getcontact/${department}`;
            setloading(true)
            seterror(null)

            try {
                const response = await fetch(url,{signal});
                if(!response.ok){
                    const error_Data = await response.json();
                    throw new Error(error_Data.message || "Sorry cannot get contacts")
                }
                const data = await response.json();
                if(!Array.isArray(data) || data.length === 0){
                    console.warn("There are no Contacts",department);
                    setcontact([]);
                }
                else{
                    console.info("Successfully got the contacts")
                    setcontact([...data]);
                    console.log("Data is ",data)
                }
            } catch (error) {

                if(error.name !== 'AbortError'){
                    console.log("Cannot fetch data",error.message);
                    seterror(error.message)
                }
                
            }
            finally{
                setloading(false);
            }
        }

        fetchfunction();
            return () => {
                controller.abort();
            };

        
    },[department])

    return (
    <div>
        <Navbar/>

        <div className='w-full h-[88vh] flex justify-center items-center flex-col'>

        <h1 className=" relative text-center w-full -top-[200px] text-6xl font-extrabold"
        >Welcome to <br /><span className='bg-gradient-to-r from-[#9382e0] to-[#5d4d8a] bg-clip-text text-transparent font-Saira'>{department}</span> <span className="bg-gradient-to-r from-[#9382e0] to-[#5d4d8a] bg-clip-text text-transparent font-Saira">/</span> <span className="bg-gradient-to-r from-[#9382e0] to-[#5d4d8a] bg-clip-text text-transparent font-Saira">{heading}</span></h1>


        {loading && (
            <p>Loading Contacts...</p>
        )}

        {error && (
            <p>Error:{error}</p>
        )}

        {!loading && contact.length === 0 && (
            <p>There is no contacts available</p>
        )}
{contact.length > 0 && (
  <div
    className={`w-[80vw] mx-auto mt-[50px] mb-[80px] rounded-t-[30px] overflow-hidden shadow-lg ${
      theme === 'light' ? 'bg-[#E3E3F3]' : 'bg-[#111111]'
    }`}
  >
    <h2 className="w-full text-center text-3xl font-Saira bg-gradient-to-r from-[#9783EE] to-[#725DAC] text-white py-4">
      Contact Information
    </h2>

    <div className="container flex flex-col gap-4 p-6 items-center ">
      {contact.map((ma, index) => (
        <div
          key={index}
          className={` cont flex flex-col w-[1200px] sm:flex-row justify-between items-start sm:items-center p-4 rounded-xl shadow-md ${
            theme === 'light' ? 'bg-white text-black' : 'bg-[#1a1a1a] text-white'
          }`}
        >
          <p className="text-[18px]">
            <span className="font-semibold">Name:</span> {ma.name || 'No Name'}
          </p>
          <p className="text-[18px]">
            <span className="font-semibold">Email:</span> {ma.email || 'No Email'}
          </p>
          <p className="text-[18px]">
            <span className="font-semibold">Phone:</span> {ma.phone || 'No Phone Number'}
          </p>
        </div>
      ))}
    </div>
  </div>
)}


        </div>
    </div>
  )
}

export default Facontact
