import React from 'react'
import Title from './components/Title'
import "./App.css"
import { GlobalStyles, lightTheme, darkTheme } from "./components/globalStyles";
import {ThemeProvider} from "styled-components";
import  {DarkMode} from "./components/DarkMode";
import Toggle from "./components/Toggle"
import Button from '@material-ui/core/Button';
import ModalDialog from './ModalDialog';
const App = () => {
    // declare a new state variable for modal open
    const [open, setOpen] = useState(false);

    // function to handle modal open
    const handleOpen = () => {
      setOpen(true);}
        // function to handle modal close
  const handleClose = () => {
    setOpen(false);
  };
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
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Signup
      </Button>
      <ModalDialog open={open} handleClose={handleClose} />

    </div>
    </ThemeProvider> 
  )
}

export default App

