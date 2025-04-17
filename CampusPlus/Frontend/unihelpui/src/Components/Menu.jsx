import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import TradeMark from './TradeMark';

const Menu = () => {

    const items = [
        { name: 'Past papers', path: '/Pastpapers' },
        {
            name: 'Timetable', path: '/Timetable'
        },
        {
            name: 'Contact Info', path: '/ContactF'
        },
        {
            name: 'Outline', path: '/Outline'
        },
        {
            name: 'BusRoute', path: '/BusRoute'
        }

    ]

    const location = useLocation();
    const queryParms = new URLSearchParams(location.search);
    const department = queryParms.get('department')

    const navigate = useNavigate();

    const navigation = (path,heading) => {
        navigate(path,{state:{department,heading}})
    }

    return (
        <div>
            <div className='w-full h-40px  pt-[200px] indent-2 relative top-10 left-27'>

                <h1 className='text-3xl'>Welcome to <span className='text-blue-800'>{department} !</span></h1>
            </div>


            <div class="h-[500px] w-full  flex gap-2.5 justify-center items-center">
                {items.map((item,index)=>(
                    <div
                     key={index}
                     className='border-4 border-black w-[200px] h-[100px] flex justify-center items-center flex-col hover:bg-blue-700 hover:text-white cursor-pointer'
                     onClick={()=>navigation(item.path,item.name)}>
                        <h1>{item.name}</h1>

                    </div>
                ))}

            </div>
           

            <div className="relative top-4">
                <TradeMark />
            </div>
        </div>
    )
}

export default Menu 
