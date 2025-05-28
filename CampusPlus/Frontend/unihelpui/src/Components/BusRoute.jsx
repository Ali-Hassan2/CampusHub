import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar'
import { ThemeContext } from '../Context/ThemeContext';
import { useContext } from 'react';
import Outline from './Outline';

const BusRoute = () => {
  const {theme} = useContext(ThemeContext)
  const location = useLocation();
  const department = location.state?.department || "Unknown Area";
  const heading = location.state?.heading || "Unknown Heading "

  const [routes, setRoutes] = useState([]);

  const fetchBusRoutes = async () => {
    const url = 'http://localhost:5000/api/busroute/getbusroute';

    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error("Failed to fetch bus routes");
        return;
      }

      const data = await response.json();

      if (!Array.isArray(data) || data.length === 0) {
        console.warn("No routes available");
        setRoutes([]);
      } else {
        setRoutes(data);
        console.log("Fetched routes:", data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setRoutes([]);
    }
  };

  const downloadFile = async (url, filename = "BusRoute.pdf") => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        alert("Failed to download file");
        return;
      }

      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Download error:", error);
      alert("Failed to download file");
    }
  };

  useEffect(() => {
    fetchBusRoutes();
  }, []);

  return (
    <>
      <Navbar />
      <div className="w-[99vw] h-[88vh] flex flex-col items-center p-6 overflow-hidden justify-around">
      <h1 className=" relative text-center w-full -top-[50px] text-6xl font-extrabold"
        >Welcome to <br /><span className='bg-gradient-to-r from-[#9382e0] to-[#5d4d8a] bg-clip-text text-transparent font-Saira'>{department}</span> <span className="bg-gradient-to-r from-[#9382e0] to-[#5d4d8a] bg-clip-text text-transparent font-Saira">/</span> <span className="bg-gradient-to-r from-[#9382e0] to-[#5d4d8a] bg-clip-text text-transparent font-Saira">{heading}</span></h1>

<div className="w-[70vw] space-y-4">
  {routes.length === 0 ? (
    <p className="text-center text-gray-600">Sorry, no bus route is available.</p>
  ) : (
    routes.map((route, index) => (
      <div
        key={index}
        className={`relative flex justify-between items-center h-[70px] py-4 px-6 -top-[150px] rounded-xl shadow-md shadow-black/30 ${
          theme === 'light' ? 'bg-[#E3E3F3] text-black' : 'bg-[#111] text-white'
        }`}
      >
        <h2 className="relative left-6 text-[19px] font-semibold">{route.title}</h2>

        <a
          href={route.file_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white bg-gradient-to-r from-[#9783EE] to-[#725DAC] w-[130px] h-[40px] rounded-[50px] flex items-center justify-center font-semibold shadow-sm shadow-black/30 cursor-pointer relative left-[400px]"
        >
          View
        </a>

        <button
          onClick={() => downloadFile(route.file_url, `${route.title}.pdf`)}
          className="text-white bg-gradient-to-r from-[#9783EE] to-[#725DAC] w-[200px] h-[40px] rounded-[50px] flex items-center justify-center font-semibold shadow-sm shadow-black/30 cursor-pointer"
        >
          Download
        </button>
      </div>
    ))
  )}
</div>


      </div>
    </>
  );
};

export default BusRoute;
