import { createGlobalStyle} from "styled-components"

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 1.0s linear;
  }
  `
  
export const lightTheme = {
    body: '#FFF',
    text: '#000',
}

export const darkTheme = {
    body: '#000',
    text: '#FFF',
}