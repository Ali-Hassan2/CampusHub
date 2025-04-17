import React from 'react'
import {useLocation } from 'react-router-dom'
import {useState} from 'react'



const facontact = () => {

    const location = useLocation();
    
    const department = location.state?.department || "Unknown Department"
    const heading = location.state?.heading || "Unknown Section"

    const [contact, setcontact] = useState([]);

    const getingcontact = async(req,res)=>{
      const url = `http://localhost:8000/api/contact/${department}`

      try {
        const response = await fetch(url);
        if(!response.ok) {
          throw new Error ("There is an error while making the getcall")
        }
        else{
          const data = await response.json();
          if(!Array.isArray(data) || data.length === 0){
            console.log("No data found");
            setcontact([]);
          }
          else{
            setcontact(data);
            console.log("The data is ",data);
          }
        }

      } catch (error) {
        console.log("There is an error is: ",error);
        setcontact([]);
      }
    }



  return (
    <div>

        <h2>Welcome to {department}/ {heading}</h2>

        
        <button onClick={getingcontact}>
          Search Faculty Contact
        </button>



        {contact && (
          <div>
            <h2>The Contact information is:</h2>

            <div>
              {contact.map((ct,index)=>(
               <div key={index}>
                <h4>Name: {ct.name}</h4>
                <h4>Mail: {ct.mail}</h4>
                <h4>Phone: {ct.phone}</h4>
               </div>
              ))}
            </div>
          </div>
        )}
    </div>
  )
}

export default facontact
