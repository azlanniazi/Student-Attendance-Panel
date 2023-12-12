import "../assets/fonts/Roboto-Regular.ttf";

import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  


:root{

    /* primary color */
    --color-green-1:#6ee7b7;
    --color-green-2:#34d399;
    --color-green-3:#059669;
    --color-green-4:#047857;
    --color-primary: #10b981;
    --color-green-7: #053727;

    
    &, &.light-mode{

        
        
        
        
        /* gray color */
        
        --color-gray-0: #fafafb; 
        --color-gray-1:#ebedef; 
        --color-gray:#e1e3e8; 
        --color-gray-2: #d7dae0;
        --color-gray-3:#cdd1d8;
        --color-gray-4: #a4a7ad;
        --color-gray-5: #7b7d82;
        --color-gray-6: #525456;
        --color-gray-7: #292a2b;


        --backdrop-color: rgba(0, 0, 0, 0.05);
    }
    &.dark-mode{
         

        --color-gray-0: #18212f;
        --color-gray: #111827;
        --color-gray-1: #1f2937;
        --color-gray-2: #374151;
        --color-gray-3: #4b5563;
        --color-gray-4: #6f7782;
        --color-gray-5: #9399a1;
        --color-gray-6: #b7bbc1;
        --color-gray-7: #dbdde0;

        --color-red-800: #991b1b;
        --backdrop-color: rgba(0, 0, 0, 0.3);

        --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
        --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
        --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);

        --image-grayscale: 10%;
        --image-opacity: 90%;
        
    }
    
    
    /* secondary color */
    --color-blue-0: #80d8ff;
    --color-blue-1: #33c0ff;
    --color-secondary: #00B0FF;
    --color-blue-3: #008dcc;
    --color-blue-4: #006a99;
    --color-blue-7: #00354c;

    
    
    /* color danger */
    --color-danger-1: #f0839b;
    --color-danger-2: #eb5a79;
    --color-danger: #E63158;
    --color-danger-3: #D20733;
    --color-danger-4: #A80024;
    --color-danger-7: #b91c1c;
    
    /* border-radius */
    --border-radius-sm: 4px;
    --border-radius-md: 8px;
    --border-radius-lg: 12px;

    /* box shadow */

    --shadow-sm: 0px 1px 2px rgba(0,0,0,.04);
    --shadow-md: 0rem .5rem 1.5rem rgba(0,0,0,.06);
    --shadow-lg: 0rem 1.5rem 2rem rgba(0,0,0,.12)
}

*:not([class*='fa-']){

    font-family: 'Roboto', sans-serif !important ;
}

*,
*::before,
*::after{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
a{
    text-decoration: none;
    color: inherit;
}
li{
    list-style: none;
}

body{
    font-family: 'Roboto', sans-serif !important ;
    color: var(--color-gray-7);
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

select:disabled,
input:disabled {
  background-color: var(--color-gray-2);
  color: var(--color-gray-5);
}

button{
    cursor: pointer;
}


`;

export default GlobalStyles;
