import React, { useRef, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import TradeMark from './TradeMark';
import { ThemeContext } from '../Context/ThemeContext';
import './Menu.css'

const Menu = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParms = new URLSearchParams(location.search);
  const department = queryParms.get('department');
  const cardRefs = useRef([]);

  const items = [
    { name: 'Past papers', path: '/Pastpapers', des: 'Go There' },
    { name: 'Timetable', path: '/Timetable', des: 'Go There' },
    { name: 'Contact Info', path: '/ContactF', des: 'Go There' },
    { name: 'Outline', path: '/Outline', des: 'Go There' },
    { name: 'BusRoute', path: '/BusRoute', des: 'Go There' }
  ];

  const navigation = (path, heading) => {
    navigate(path, { state: { department, heading } });
  };

  const handleMouseMove = (e, index) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
  };

  const handleMouseLeave = (index) => {
    const card = cardRefs.current[index];
    if (!card) return;

    card.style.setProperty('--x', `50%`);
    card.style.setProperty('--y', `50%`);
  };

  return (
    <>
      <Navbar />
      <div>
        <div className="w-full h-40px pt-[200px] indent-2 relative top-20 flex justify-center">
          <h1 className="text-6xl font-extrabold text-center">
            Welcome to <br />
            <span className="bg-gradient-to-r from-[#9382e0] to-[#5d4d8a] bg-clip-text text-transparent mt-3 relative top-3">
              {department} !
            </span>
          </h1>
        </div>

        <div className="h-[500px] w-full flex gap-5 justify-center items-center relative top-10 flex-wrap">
          {items.map((item, index) => (
            <div
              key={item.name}
              ref={(el) => (cardRefs.current[index] = el)}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
              onClick={() => navigation(item.path, item.name)}
              className={`
                card relative overflow-hidden
                w-[300px] h-[200px]
                flex justify-around items-center flex-col
                rounded-[20px] cursor-pointer
                transition-transform duration-300 ease-out
                hover:-translate-x-2 hover:-translate-y-1
                ${theme === 'light'
                  ? 'bg-[#E3E3F3] shadow-md shadow-black/30 text-black'
                  : 'bg-black text-white'}
              `}
              style={{ '--x': '50%', '--y': '50%' }}
              tabIndex={0}
            >
              <span
                className="radial-light absolute inset-0 pointer-events-none rounded-[20px]"
                style={{ zIndex: 0 }}
              />
              <h1 className="text-3xl font-medium relative top-3 z-10">{item.name}</h1>
              <button className="bg-gradient-to-r from-[#9783EE] to-[#725DAC] w-[90%] h-[40px] outline-0 rounded-[20px] text-white text-[18px] relative top-2 cursor-pointer z-10">
                {item.des}
              </button>
            </div>
          ))}
        </div>

        <div className="relative top-30">
          <TradeMark />
        </div>
      </div>

      <style>{`
    
      `}</style>
    </>
  );
};

export default Menu;
