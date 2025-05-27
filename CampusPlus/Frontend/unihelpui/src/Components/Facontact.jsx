import React, { useEffect,useState } from 'react'
import Navbar from './Navbar'
import { useLocation } from 'react-router-dom'


const Facontact = () => {


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

        <div className='w-full h-[88vh] border-4 border-red-500'>

        <h1 className=" relative text-center w-full top-[100px] text-6xl font-extrabold"
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
            <ul>
                {contact.map((ma,index)=> (
                    <li key={index}>
                        <strong>{ma.email || "No Email"}</strong>
                        <br />
                        <strong>{ma.phone || "No Phone Number"}</strong>
                    </li>
                ))}
            </ul>
        )}

        </div>
    </div>
  )
}

export default Facontact
