import { createContext } from "react";
import {React,useState,useEffect} from 'react'

export const ThemeContext = createContext();



export const ThemeProvider = ({children})=>{
    const [theme,settheme] = useState('light');

    useEffect(()=>{
        document.body.style.backgroundColor = theme === 'light' ? "" : "black"
        document.body.style.color = theme === 'light' ? "black" : "white"
    },[theme])

    return(
        <ThemeContext.Provider value={{theme,settheme}}>
            {children}
        </ThemeContext.Provider>
    )
}
