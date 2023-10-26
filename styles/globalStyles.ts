import { createGlobalStyle } from "styled-components";

// Add this to the root section to draw borders around all elements
// * {border: 1px solid red};

const GlobalStyle = createGlobalStyle`
.slick-slide{
  transition: transform 0.5s ease-in-out;
  opacity: 0.5;
}
.slick-center{
  transform: scale(1.2);
  transition: transform 0.5s ease-in-out;
  z-index: 1;
  opacity: 1;
}



  /* Using this inherit reset method means you can use content-box or padding-box without a universal selector overriding your CSS */
  html {
    box-sizing: border-box;
  }

  /* Only using * omits pseudo elements so specifically include these  */
  * , *:before, *:after {
    box-sizing: inherit;
  }

  html, body {
    font-family: 'Raleway'
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Raleway'
  }

`;

export default GlobalStyle;
