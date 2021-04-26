import React from 'react'
import Title from './components/Title'
import "./App.css"
import { GlobalStyles, lightTheme, darkTheme } from "./comps/globalStyles";
import {ThemeProvider} from "styled-components";
import  {DarkMode} from "./components/DarkMode";
import Toggle from "./components/Toggle"
const App = () => {
  const [theme, toggleTheme, mountedComponent] = DarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  return (
    <ThemeProvider theme={themeMode}>
    <GlobalStyles/>
    <div className="header">
    <Toggle theme={theme} toggleTheme={toggleTheme}/>
      <Title/>
    </div>
    </ThemeProvider> 
  )
}

export default App

