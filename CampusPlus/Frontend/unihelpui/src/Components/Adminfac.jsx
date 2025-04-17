import { useState, React } from 'react'

const Adminfac = () => {


    const deps = ["Computer Science", "Software Engineer", "Information Technology"]
    const [dep, setdep] = useState("");
    const [contact,setcontact] = useState([]);
    const [form,showform] = useState(false);
    const [mail,setmail] = useState("");
    const [phone,setphone] = useState("");

    const handledep = (e) => {
        const selectedep = e.target.value;
        setdep(selectedep);
    }

    const searchcontact = async()=>{

        const url = `http://localhost:8000/api/contact/getcontce`;
        try {
            
            const response = await fetch(url);

            if(!response.ok){
                throw new Error("There is an error");
            }
            else{
                const data = await response.json();
                if(!Array.isArray || data.length===0){
                    console.log("There is nothing to get");
                    setcontact([]);
                }
                else{
                    console.log("The data is found and the data is : ",data);
                    setcontact(data);
                }
            }

        } catch (error) {
            console.log("There is an error while making a fetch call",error);
            setcontact([]);
        }
    }

    const addcontact = async()=>{

        showform(true)

        const formdata = new FormData();

        formdata.append('department',dep);
        formdata.append('mail',mail);
        formdata.append('phone',phone);


        const url = `http://localhost:8000/api/contact/addcontact/${mail}/${phone}`;

        try{
            const response = await fetch(url,{
                method:'POST',
                body:formdata
            })
        }
        catch(error){

        }
    }



    return (
        <div>



            <select name="" id="" onChange={handledep}>
                <option value="">
                    Select Department
                </option>

                    {deps.map((depp, index) => (
                        <option
                            key={index}
                            value={depp}
                        >
                            {depp}
                        </option>
                    ))}
                
            </select>


            {dep && (
                <>




                <button onClick={addcontact} >
                    Add Contact
                </button>
                <button onClick={searchcontact}>
                    Search
                </button>
                <div>
                    {contact.map((con,index)=>{
                        <div>

                        </div>
                    })}
                </div>
                </>
            )}

            {form &&(
                <div>
                    <input type="text" placeholder="Enter the mail" onChange={(e)=>{e.target.value}} required/>
                    <input type="text" placeholder="Enter the phone"
                    onChange={(e)=>{e.target.value}} required/>

                    <button onClick={addcontact}>Upload Information</button>
                </div>

            )}













        </div>
    )
}

export default Adminfac
