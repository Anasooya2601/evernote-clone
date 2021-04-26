import React from 'react'
import Title from './components/Title'
import "./App.css"
import { GlobalStyles, lightTheme, darkTheme } from "./components/globalStyles";
import {ThemeProvider} from "styled-components";
import  {DarkMode} from "./components/DarkMode";
import Toggle from "./components/Toggle"
const App = () => {
  const [theme, toggleTheme] = DarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  return (
    <ThemeProvider theme={themeMode}>
    <GlobalStyles/>
    <div className="header">
      <center>
      <Title/>
      </center>
     <h4>Them<Toggle theme={theme} toggleTheme={toggleTheme}/></h4>
     
    </div>
    </ThemeProvider> 
  )
}

export default App

