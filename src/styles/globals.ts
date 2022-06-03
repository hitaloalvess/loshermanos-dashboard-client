import { createGlobalStyle } from 'styled-components';

// --Devices
// 1440px;
// 1268px;
// 960px;
// 620px;
// 340px

export default createGlobalStyle`
  
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  :root{
    --background: #09090a;
    --dark-surface-primary: #18181B;
    --dark-surface-secondary: #27272A;
    --dark-secondary-hover: #3f3f46;
    --dark-stoke: #52525b;
    --text-primary: #f4f4f5;
    --text-secondary: #a1a1aa;
    --green: #2fb182;
    --green-transparent: #d2f3e7;
    --yellow:#F4A701;
    --yellow-transparent: #F5B835;
    --red: #f12222;
    --red-transparent: #ed8888;
    --orange: #f25d27;
    --orange-transparent: #fa7e51;
    --white: #fff;
  }

  html{
    font-size: 62.5%; 
  }
  
  body{
    background-color: var(--background);
    color: var(--white);
  }

  body, input, button, select{
    font: 1.4rem Roboto Slab, sans-serif;
  }

  button {
    cursor: pointer;
  }
  
  a{
    text-decoration: none;
  }

  ul li{
    list-style: none;
  }

`;
