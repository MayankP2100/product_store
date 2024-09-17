import React, {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {ChakraProvider, extendTheme} from "@chakra-ui/react";
import App from "./App.jsx";
import {BrowserRouter} from "react-router-dom";

createRoot(document.getElementById('root')).render(<StrictMode>
  <ChakraProvider theme={extendTheme({
    fonts: {
      body: 'Montserrat',
      heading: 'Montserrat',
    },
    fontStyle: 'normal',
    fontWeight: 900,
  })}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </ChakraProvider>
</StrictMode>,)
