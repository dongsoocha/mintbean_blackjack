import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";

import { SocketContext, socket } from './ContextProvider/socket';

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <SocketContext.Provider value={socket}>
        <BrowserRouter>
          <Route path="/" component={LandingPage} />
        </BrowserRouter>
      </SocketContext.Provider>
    </MuiThemeProvider>
  );
}

export default App;
