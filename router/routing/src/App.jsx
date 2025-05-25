import { useState } from 'react'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Blogs  from './Pages/Blogs'
import './App.css'


const route = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/about',
    element:<About/>
  },
  {
    path:'/blogs',
    element:<Blogs/>
  }
])

function App() {
  return (
    <>
      <RouterProvider router={route}/>
    </>
  )
}

export default App
