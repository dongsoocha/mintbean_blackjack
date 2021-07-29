import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import Test from "./pages/Test";

import { UserProvider } from "./contextProvider/user";

import { SocketContext, socket } from './contextProvider/socket';

import "./App.css";

// TODO: Extract the background css out of individual pages to the app-wide styling

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <UserProvider>
        <SocketContext.Provider value={socket}>
          <BrowserRouter>
            <Route path="/" exact component={LandingPage} />
            <Route path="/test" component={Test} />
          </BrowserRouter>
        </SocketContext.Provider>
      </UserProvider>
    </MuiThemeProvider >
  );
}

export default App;
