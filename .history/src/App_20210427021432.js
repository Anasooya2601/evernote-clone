import React from 'react'
import Title from './components/Title'
import "./App.css"
import { GlobalStyles, lightTheme, darkTheme } from "./components/globalStyles";
import {ThemeProvider} from "styled-components";
import  {DarkMode} from "./components/DarkMode";
import Toggle from "./components/Toggle"
import Sign from './components/sign/Sign';
const App = () => {
  const [theme, toggleTheme] = DarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  return (
    <ThemeProvider theme={themeMode}>
    <GlobalStyles/>
    <div className="App">
    <Toggle theme={theme} toggleTheme={toggleTheme}/>
      <center>
      <Title/>
      </center>
    
     <Sign/>
    </div>
    </ThemeProvider> 
  )
}

export default App

