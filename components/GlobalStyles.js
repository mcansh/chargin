// @flow
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://mcan.sh/assets/fonts/Gotham/gotham.css');

  html {
    box-sizing: border-box;
    font-size: 10px;
  }

  *,
  *::before,
  *::after {
    margin: 0;
    box-sizing: inherit;
    font-weight: 300;
  }

  body {
    min-height: 100vh;
    font-family: 'Gotham Pro';
    background: #222;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 1.35;
    text-align: center;
    margin: 0;
  }
`;

export default GlobalStyles;
