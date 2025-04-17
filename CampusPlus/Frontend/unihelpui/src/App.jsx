import { useState } from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Home from '../src/Components/Home'
import Menu from '../src/Components/Menu'
import Pastpapers from '../src/Components/Pastpapers'
import Timetable from '../src/Components/Timetable'
import Outline from '../src/Components/Outline'
import BusRoute from '../src/Components/BusRoute'
import ContactF from '../src/Components/facontact'
import './App.css'
import AdminLogin from './Components/AdminLogin'
import AdminDashboard from './Components/AdminDashboard'
import AdminPastpaers from './Components/AdminPastpaers'
import AdminTimetable from './Components/AdminTimetable'
import AdminBus from './Components/AdminBus'
import AdminOutline from './Components/AdminOutline'
import Adminfac from './Components/Adminfac'
const router = createBrowserRouter(
  [
    {
      path:"/",
      element:<Home/>
    },
    {
      path:"/menu",
      element:<Menu/>
    },
    {
      path:"/pastpapers",
      element:<Pastpapers/>
    },
    {
      path:"/timetable",
      element:<Timetable/>
    },
    {
      path:"/outline",
      element:<Outline/>
    },
    {
      path:"/contact",
      element:<ContactF/>
    },
    {
      path:"/busroute",
      element:<BusRoute/>
    },
    {
      path:"/admin",
      element:<AdminLogin/>

    },
    {
      path:"/AdminDashboard",
      element:<AdminDashboard/> 
    }
    ,
    {
      path:"/AdminPastpapers",
      element:<AdminPastpaers/>
    },
    {
      path:"/AdminTimetable",
      element:<AdminTimetable/>
    },
    {
      path:'/AdminBus',
      element:<AdminBus/>
    },
    {
      path:'/AdminOutline',
      element:<AdminOutline/>
    },
    {
      path:'/Adminfac',
      element:<Adminfac/>
    }
  ]
)

function App() {


  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
