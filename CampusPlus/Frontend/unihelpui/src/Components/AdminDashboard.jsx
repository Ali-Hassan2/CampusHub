import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const location = useLocation();  // Correct hook usage
  const queryParms = new URLSearchParams(location.search);  // Correct query parameter extraction
  const username = queryParms.get('usern');  // Get the username from the query parameters

  const menus = [
    { name: 'Past Papers', path: '/AdminPastpapers' },
    { name: 'Time Table', path: '/AdminTimetable' },
    { name: 'Bus Route', path: '/AdminBus' },
    { name: 'Contact Info', path: '/Adminfac' },
    { name: 'Outlines', path: '/AdminOutline' },
  ];

  const navigate = useNavigate();

  const navigation = (path,heading) =>{
    navigate(`${path}?head=${heading}`)
  }

  return (
    <>
      <h1>Welcome {username} to Admin Dashboard</h1> {/* Display the username */}

      <div className="w-[100vw] h-[100vh] border-4 border-amber-900 flex justify-center">
        <div className="w-full border-4 border-red-500 flex justify-center items-center gap-5">
          {menus.map((menu, index) => (
            <div
              key={index}
              className="w-[120px] h-[120px] border-4 border-blue-600 flex justify-center items-center border-none bg-blue-600 rounded-2xl text-white hover:bg-blue-500 cursor-pointer"
              onClick={()=>navigation(menu.path,menu.name)}
            >
              <h2>{menu.name}</h2>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};




export default AdminDashboard;
