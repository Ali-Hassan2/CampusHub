import { useContext } from 'react'
import { ThemeContext } from './Context/ThemeContext'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Components/Home'
import Menu from './Components/Menu'
import Pastpapers from './Components/Pastpapers'
import Timetable from './Components/Timetable'
import Outline from './Components/Outline'
import BusRoute from './Components/BusRoute'
import ContactF from './Components/facontact'
import AdminLogin from './Components/AdminLogin'
import AdminDashboard from './Components/AdminDashboard'
import AdminPastpaers from './Components/AdminPastpaers'
import AdminTimetable from './Components/AdminTimetable'
import AdminBus from './Components/AdminBus'
import AdminOutline from './Components/AdminOutline'
import Adminfac from './Components/Adminfac'
import './App.css'
import Notfound from './Components/Notfound'

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/menu', element: <Menu /> },
  { path: '/pastpapers', element: <Pastpapers /> },
  { path: '/timetable', element: <Timetable /> },
  { path: '/outline', element: <Outline /> },
  { path: '/contact', element: <ContactF /> },
  { path: '/busroute', element: <BusRoute /> },
  { path: '/admin', element: <AdminLogin /> },
  { path: '/AdminDashboard', element: <AdminDashboard /> },
  { path: '/AdminPastpapers', element: <AdminPastpaers /> },
  { path: '/AdminTimetable', element: <AdminTimetable /> },
  { path: '/AdminBus', element: <AdminBus /> },
  { path: '/AdminOutline', element: <AdminOutline /> },
  { path: '/Adminfac', element: <Adminfac /> },
  {path:'*',element: <Notfound/>}
]);

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`
        min-h-screen w-full 
        ${theme === 'light' ? 'bg-white' : 'bg-black'} 
        ${theme === 'light'
          ? 'bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]'
          : 'bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.1),rgba(0,0,0,0))]'}
        transition-colors duration-500
      `}
    >
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
